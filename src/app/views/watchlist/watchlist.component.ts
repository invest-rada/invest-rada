import { Component, OnInit } from '@angular/core';
import { get } from 'lodash-es';
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
export class WatchlistComponent implements OnInit {
  dataStore$ = this.stocksData.dataStore$;
  brandData: any;
  labels: string[];

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

  ngOnInit(): void {
    this.initBrands()
  }

  isLoaded(store: any): boolean {
    return Object.keys(store).length > 0;
  }

  initBrands() {
    this.dataStore$.subscribe(store => {
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
    });
  }
}
