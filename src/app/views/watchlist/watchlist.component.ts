import { Component, OnDestroy, OnInit } from '@angular/core';
import { flatten, get, some } from 'lodash-es';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { MetricEnum } from '../../models/user-data.model';
import { BrandDataService } from '../../services/brand-data.service';
import { FundamentalDataService } from '../../services/fundamental-data.service';

const mockedDatasets = {
  borderWidth: 2,
  fill: true
};
const mockedColors = {
  backgroundColor: 'rgba(255,255,255,.1)',
  borderColor: 'rgba(255,255,255,.55)',
  pointHoverBackgroundColor: '#fff'
};

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit, OnDestroy {
  dataStore$ = this.stocksData.dataStore$;
  brandData: any[] = [];
  filteredBrandData: any[] = [];
  labels: string[];
  #destroy$: Subject<void> = new Subject<void>();
  #filterText: BehaviorSubject<string> = new BehaviorSubject<string>('');
  filterText$: Observable<string> = this.#filterText.asObservable();

  constructor(
    private stocksData: FundamentalDataService,
    private brand: BrandDataService,
  ) {
    const labels = [];
    for (let metric in MetricEnum) {
      labels.push(get(MetricEnum, metric));
    }
    this.labels = labels;
  }

  get filterText(): string {
    return this.#filterText.getValue();
  }

  set filterText(value: string) {
    this.#filterText.next(value);
  }

  ngOnInit(): void {
    this.initBrands()
    this.filterText$.pipe(takeUntil(this.#destroy$)).subscribe({
      next: (filterText) => this.updateFilteredData(filterText),
    });
  }

  updateFilteredData(filterText: string) {
    this.filteredBrandData = this.brandData.filter((data: { values: object[] }) => {
      const phraseList = flatten(data.values.map(obj => Object.values(obj)));
      return some(phraseList, phrase => phrase.toLowerCase().includes(filterText.toLowerCase()));
    });
  }


  updateFilterText(event: Event) {
    this.filterText = (event.target as HTMLInputElement).value;
  }

  isLoaded(store: any): boolean {
    return Object.keys(store).length > 0;
  }

  initBrands() {
    this.dataStore$.pipe(takeUntil(this.#destroy$)).subscribe(store => {
      const itemList = Object.keys(store).map(key => store[key]);
      this.brandData = itemList.map(item => {
        return {
          icon: this.brand.getIconBySymbol(item.Symbol),
          symbol: item.Symbol,
          values: [{ title: item.Symbol, value: item.Name }, { title: item.Industry }],
          capBg: { '--cui-card-cap-bg': this.brand.getColorBySymbol(item.Symbol) },
          labels: [...this.labels],
          style: [{}],
          data: {
            labels: [...this.labels],
            datasets: [{
              ...mockedDatasets,
              data: [
                item.PERatio,
                item.ReturnOnEquityTTM,
                item.ReturnOnAssetsTTM,
                item.PriceToSalesRatioTTM,
                item.PriceToBookRatio,
                item.EPS,
                item.DividendPerShare,
              ],
              ...mockedColors
            }]
          }
        };

      });
      this.updateFilteredData(this.filterText)
    });
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }
}
