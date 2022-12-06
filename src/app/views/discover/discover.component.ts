import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { floor } from 'lodash-es';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ColorType, IChartProps, IEstimate } from 'src/app/models/analytics-robor.model';
import { IBrand } from 'src/app/models/brand-data.model';
import { IFundamentalData } from '../../models/fundamental-data.model';
import { IMetric, MetricEnum } from '../../models/user-data.model';
import { AnalyticsRobotService } from '../../services/analytics-robot.service';
import { FundamentalDataService } from '../../services/fundamental-data.service';
import { UserDataService } from '../../services/user-data.service';

export interface IStock {
  brand: IBrand;
  fundamental: IFundamentalData;
  sector: Partial<IFundamentalData>;
}

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit, OnDestroy {
  public mainChart: IChartProps = {};
  public isLoading = true;
  public visibleFeedback = false;


  items = [1, 2, 3, 4];

  destroyed$: Subject<boolean> = new Subject<boolean>();
  #symbol: Subject<string> = new Subject<string>();
  symbol$: Observable<string> = this.#symbol.asObservable();

  constructor(
    private analyticsRobot: AnalyticsRobotService,
    private fundamentalData: FundamentalDataService,
    private userData: UserDataService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  get fundamentalKeys(): string[] {
    return this.analyticsRobot.fundamentalKeys;
  }

  get userMetrics(): IMetric[] {
    return this.userData.currentUserMetrics;
  }

  get sector(): string {
    return this.analyticsRobot.currentSector;
  }

  get symbol(): string {
    return this.analyticsRobot.currentSymbol;
  }

  get name(): string {
    return this.fundamentalData.dataStore[this.symbol].Name;
  }

  get resultToBuy() {
    return this.analyticsRobot.resultToBuy;
  }

  get posList$(): Observable<IEstimate[]> {
    return this.analyticsRobot.posList$;
  }

  get consList$(): Observable<IEstimate[]> {
    return this.analyticsRobot.consList$;
  }

  get verbalRecommendation() {
    return this.analyticsRobot.verbalRecommendation;
  }

  ngOnInit() {
    this.symbol$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((symbol: string) => {
        if (!Boolean(symbol)) {
          this.analyticsRobot.resetRobot();
          return;
        }
        this.analyticsRobot.changeCurrentCompanyBySymbol(symbol).subscribe(() => {
          this.analyticsRobot.initMainChart()
            .pipe(
              takeUntil(this.destroyed$),
            ).subscribe((mainChart: IChartProps) => {
            this.mainChart = mainChart;
            this.isLoading = false;
          });
        });
      });

    this.route.queryParams.subscribe(params => {
      this.#symbol.next(params['symbol']);
    });
  }

  ngOnDestroy() {
    this.#symbol.next('')
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  searchSymbol(symbol: string) {
    this.router.navigateByUrl(`discover?symbol=${symbol.toUpperCase()}`);
  }

  getCompanyValueByKey(key: string): number {
    return this.analyticsRobot.getCompanyValueByKey(key);
  }

  getSectorValueByKey(key: string): number {
    return this.analyticsRobot.getSectorValueByKey(key);
  }

  getDeltaValueByKey(key: string): number {
    return this.analyticsRobot.getDeltaValueByKey(key);
  }

  getUserOrientedDeltaValueByKey(key: string): number {
    return this.analyticsRobot.getUserOrientedDeltaValueByKey(key);
  }

  getDirectionByKey(key: string): number {
    return this.analyticsRobot.getDirectionByKey(key);
  }

  calculateProgressBarByKey(key: string): number {
    const delta = this.getUserOrientedDeltaValueByKey(key);

    if (delta > 100) {
      return 100;
    }

    if (delta < -99) {
      return 1;
    }

    return delta / 2 + 50;
  }

  isLengthPositive(arr: any[] | null) {
    return arr && arr.length > 0;
  }

  getAbsoluteDeltaByKey(key: string): number {
    return floor(this.getCompanyValueByKey(key) - this.getSectorValueByKey(key), 3) * this.getDirectionByKey(key);
  }

  getResultColorBasedOnDeltaPercent(value: number): ColorType {
    return this.analyticsRobot.getResultColorBasedOnDeltaPercent(value);
  }

  toggleFeedbackCollapse(): void {
    this.visibleFeedback = !this.visibleFeedback;
  }

  getColorBasedOnDeltaPercent(value: number): ColorType {
    return this.analyticsRobot.getColorBasedOnDeltaPercent(value);
  }

  getMetricByKey(key: keyof typeof MetricEnum | MetricEnum) {
    return this.analyticsRobot.getMetricByKey(key);
  }
}
