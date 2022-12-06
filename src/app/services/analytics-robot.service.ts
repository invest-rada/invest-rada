import { Injectable } from '@angular/core';
import { floor, get } from 'lodash-es';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { ColorType, IChartProps, IEstimate } from '../models/analytics-robor.model';
import { IFundamentalData } from '../models/fundamental-data.model';
import {
  ComparisonEnum,
  comparisonMetricSet,
  IMetric,
  MetricEnum,
  prioritiesOfPercent
} from '../models/user-data.model';
import { IStock } from '../views/discover/discover.component';
import { chartColors, chartOptions, OVERALL_FRONTIER, SINGLE_FRONTIER } from './analytics-robot.constants';
import { BrandDataService } from './brand-data.service';
import { comparableFundamentalKeys } from './fundamental-data.constants';
import { FundamentalDataService } from './fundamental-data.service';
import { mockedRecommendedMetrics } from './user-data.constants';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsRobotService {
  public estimateList: IEstimate[] = [];
  public mainChart: IChartProps = {};
  #consList: BehaviorSubject<IEstimate[]> = new BehaviorSubject<IEstimate[]>([]);
  consList$: Observable<IEstimate[]> = this.#consList.asObservable();
  #posList: BehaviorSubject<IEstimate[]> = new BehaviorSubject<IEstimate[]>([]);
  posList$: Observable<IEstimate[]> = this.#posList.asObservable();
  #chartData: {
    sector: number[],
    company: number[],
    analysis: number[],
  } = {
    sector: [],
    company: [],
    analysis: [],
  }
  #currentSymbol: string = '';
  #currentSector: string = '';
  #targetStock: BehaviorSubject<IStock | null> = new BehaviorSubject<IStock | null>(null);
  targetStock$: Observable<IStock | null> = this.#targetStock.asObservable();
  #metricDeltas: BehaviorSubject<{ [key: string]: number }> = new BehaviorSubject<{ [key: string]: number }>({});
  #userOrientedDeltas: BehaviorSubject<{ [key: string]: number }> = new BehaviorSubject<{ [key: string]: number }>({});
  userOrientedDeltas$: Observable<{ [key: string]: number }> = this.#userOrientedDeltas.asObservable();

  constructor(
    private brand: BrandDataService,
    private stocksData: FundamentalDataService,
    private userData: UserDataService,
  ) {
    this.userOrientedDeltas$.subscribe(() => {
      this.estimateList = this.userData.currentUserMetrics.map((metric: IMetric) => {
        const name = this.getMetricByKey(metric.key);
        const value = this.getUserOrientedDeltaValueByKey(metric.key);
        const color = this.getResultColorBasedOnDeltaPercent(value);
        return { color, name, value }
      });
      this.#consList.next(this.estimateList.filter((estimate: IEstimate) => estimate.value <= -SINGLE_FRONTIER));
      this.#posList.next(this.estimateList.filter((estimate: IEstimate) => estimate.value >= SINGLE_FRONTIER));
    })
  }

  get targetStock(): IStock | null {
    return this.#targetStock.getValue();
  }

  set targetStock(value: IStock | null) {
    this.#targetStock.next(value);
  }

  get metricDeltas(): { [key: string]: number } {
    return this.#metricDeltas.getValue();
  }

  set metricDeltas(value: { [key: string]: number }) {
    this.#metricDeltas.next(value);
  }

  get userOrientedDeltas(): { [key: string]: number } {
    return this.#userOrientedDeltas.getValue();
  }

  set userOrientedDeltas(value: { [key: string]: number }) {
    this.#userOrientedDeltas.next(value);
  }

  get fundamentalKeys(): string[] {
    return comparableFundamentalKeys
  }

  get currentSector(): string {
    return this.#currentSector;
  }

  get currentSymbol(): string {
    return this.#currentSymbol;
  }

  get resultToBuy() {
    const result = this.mainChart['companyUserBasedData'].reduce((acc: number, data: number): number => {
      return acc + data;
    }, 0);
    return floor(result, 2);
  }

  get verbalRecommendation() {
    const points = this.resultToBuy;

    if (points < -2 * OVERALL_FRONTIER) {
      return 'Not recommended!'
    }

    if (points < -OVERALL_FRONTIER) {
      return 'Below than expected'
    }

    if (points < OVERALL_FRONTIER) {
      return 'Same as sector'
    }

    if (points < 2 * OVERALL_FRONTIER) {
      return 'Above than expected'
    }

    return 'Recommended to buy!';
  }

  resetRobot() {
    this.#currentSymbol = '';
    this.#currentSector = '';
    this.metricDeltas = {};
    this.userOrientedDeltas = {};
  }

  getRadarLabels(): string[] {
    const labels: string[] = [];
    for (let metric in MetricEnum) {
      labels.push(get(MetricEnum, metric));
    }
    return labels;
  }

  getDirectionByKey(key: string): number {
    return comparisonMetricSet[MetricEnum[key as keyof typeof MetricEnum]] === ComparisonEnum.Positive ? 1 : -1;
  }

  getChartLabels(): string[] {
    const labels: string[] = [];
    for (let metric in MetricEnum) {
      labels.push(get(MetricEnum, metric));
    }
    return labels;
  }

  getMetricByKey(key: keyof typeof MetricEnum | MetricEnum) {
    return MetricEnum[key as keyof typeof MetricEnum];
  }

  getRadarUserData(): number[] {
    return this.userData.currentUserMetrics.map(metric => {
      return metric.priority
    });
  }

  getRadarRecommendedData(): number[] {
    return mockedRecommendedMetrics.map(metric => {
      return metric.priority
    });
  }

  getResultColorBasedOnDeltaPercent(value: number): ColorType {
    if (value < -OVERALL_FRONTIER) {
      return 'danger'
    }

    if (value < OVERALL_FRONTIER) {
      return 'warning'
    }

    return 'success'
  }

  changeCurrentCompanyBySymbol(symbol: string): Observable<IFundamentalData> {
    const brand = this.brand.getBrandBySymbol(symbol);
    return this.stocksData.getFundamentalBySymbol(symbol)
      .pipe(tap({
        next: (fundamental) => {
          this.#currentSymbol = get(fundamental, 'Symbol');
          this.#currentSector = get(fundamental, 'Sector');
          const sector = this.stocksData.getSectorFundamentalBySector(this.#currentSector);
          this.targetStock = {
            brand,
            fundamental,
            sector,
          };
          this.initDeltaBetweenSector();
          this.initChartData();
        }
      }));

  }

  calculateMetricDeltaByKey(key: string): number {
    const stock = +this.getCompanyValueByKey(key);
    const sector = +this.getSectorValueByKey(key);
    const value = floor((stock - sector) / sector * 100, 2);
    if (sector < 0) {
      return value * -1;
    }
    return value;
  }

  initDeltaBetweenSector() {
    this.fundamentalKeys.forEach((key: string) => {
      this.metricDeltas = { ...this.metricDeltas, [key]: this.calculateMetricDeltaByKey(key) };
    });
  }

  getColorBasedOnDeltaPercent(value: number): ColorType {
    if (value < -SINGLE_FRONTIER) {
      return 'danger'
    }

    if (value < SINGLE_FRONTIER) {
      return 'warning'
    }

    return 'success'
  }

  getCompanyValueByKey(key: string): number {
    return get(this.targetStock, ['fundamental', key], 0);
  }

  calculateAnalysisByMetric(metric: IMetric): number {
    const deltaPercent = this.getDeltaValueByKey(metric.key);
    const k = prioritiesOfPercent[metric.priority];
    const directionMultiplier = comparisonMetricSet[MetricEnum[metric.key]] === ComparisonEnum.Positive ? 1 : -1;

    const result = deltaPercent * k * directionMultiplier;

    this.userOrientedDeltas = { ...this.userOrientedDeltas, [metric.key]: floor(result, 3) };
    return result;
  }

  getSectorValueByKey(key: string): number {
    return get(this.targetStock, ['sector', key], 0);
  }

  getDeltaValueByKey(key: string): number {
    return this.metricDeltas[key];
  }

  getUserOrientedDeltaValueByKey(key: string): number {
    return this.userOrientedDeltas[key];
  }

  resetChartData(): void {
    this.#chartData = {
      sector: [],
      company: [],
      analysis: [],
    }
  }

  initChartData(): void {
    this.resetChartData()
    this.userData.currentUserMetrics.forEach((metric: IMetric, index) => {
      this.#chartData.sector.push(
        this.getSectorValueByKey(metric.key)
      );
      this.#chartData.company.push(
        this.getCompanyValueByKey(metric.key)
      );
      this.#chartData.analysis.push(
        this.calculateAnalysisByMetric(metric)
      );
    });
  }

  initMainChart(): Observable<IChartProps> {
    // mainChart
    this.mainChart['elements'] = this.userData.currentUserMetrics.length;
    this.mainChart['sectorData'] = this.#chartData.sector;
    this.mainChart['companyData'] = this.#chartData.company;
    this.mainChart['companyUserBasedData'] = this.#chartData.analysis;


    const colors = chartColors;

    const datasets = [
      {
        data: this.mainChart['sectorData'],
        label: 'Sector',
        ...colors[0]
      },
      {
        data: this.mainChart['companyData'],
        label: 'Company',
        ...colors[1]
      },
      {
        data: this.mainChart['companyUserBasedData'],
        label: 'User Oriented',
        ...colors[2]
      }
    ];

    const labels = this.getChartLabels();

    const options = chartOptions;

    this.mainChart.type = 'line';
    this.mainChart.options = options;
    this.mainChart.data = {
      datasets,
      labels
    };

    return of(this.mainChart);
  }
}
