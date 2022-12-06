import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, floor, isNumber, map, mergeWith, pick } from 'lodash-es';
import { BehaviorSubject, Observable, of, retry, tap } from 'rxjs';
import { IDataStore, IFundamentalData } from '../models/fundamental-data.model';
import { comparableFundamentalKeys, mockedTickers } from './fundamental-data.constants';

@Injectable({
  providedIn: 'root'
})
export class FundamentalDataService {

  constructor(private http: HttpClient) {
    this.initStore();
  }

  _dataStore: BehaviorSubject<IDataStore<IFundamentalData>> = new BehaviorSubject<IDataStore<IFundamentalData>>({});
  dataStore$: Observable<IDataStore<IFundamentalData>> = this._dataStore.asObservable();

  get dataStore(): IDataStore<IFundamentalData> {
    return this._dataStore.getValue();
  }

  set dataStore(value: IDataStore<IFundamentalData>) {
    this._dataStore.next(value);
  }

  fetchStock(symbol: string): Observable<IFundamentalData> {
    if (!Boolean(symbol) || symbol === 'undefined') {
      return of(null as unknown as IFundamentalData);
    }
    const localStorageDataStore = JSON.parse(localStorage.getItem('dataStore') || '{}');
    delete localStorageDataStore['S'];
    localStorage.setItem('dataStore', JSON.stringify(localStorageDataStore));
    const hasSymbolInStore = Boolean(localStorageDataStore[symbol]);

    if (!hasSymbolInStore) {
      return this.http.get<IFundamentalData>(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=PI91I8F2L326WBJ3`)
        .pipe(
          retry(3),
          tap({
            next: (res) => {
              const isCorrectData = !Boolean(res['Note']) && Object.keys(res).length > 0;
              if (isCorrectData) {
                (Object.keys(res) as (keyof IFundamentalData)[]).forEach((key: keyof IFundamentalData) => {
                  if (res[key] === '-' || res[key] === 'None') {
                    res[key] = '0';
                  }
                });
                this.dataStore = {
                  ...this.dataStore,
                  [symbol]: res,
                };
                const localStorageDataStore = JSON.parse(localStorage.getItem('dataStore') || '{}');

                localStorage.setItem('dataStore', JSON.stringify({ ...localStorageDataStore, [symbol]: res }));
              }

            }
          }),
        );
    } else {
      this.dataStore = {
        ...this.dataStore,
        [symbol]: localStorageDataStore[symbol],
      };
      return of(localStorageDataStore[symbol]);
    }
  }

  initStore() {
    mockedTickers.forEach(symbol => {
      this.fetchStock(symbol).subscribe();
    });
  }

  getFundamentalBySymbol(symbol: string): Observable<IFundamentalData> {
    if (this.dataStore[symbol]) {
      return of(this.dataStore[symbol]);
    }

    return this.fetchStock(symbol);
  }

  getSectorFundamentalBySector(Sector: string): Partial<IFundamentalData> {
    const getAvg = (data: Partial<IFundamentalData>[]): Partial<IFundamentalData> => mergeWith({}, ...data, (a: string, b: string) => {
      if (isNumber(+b)) {
        return floor(((+b || 0) / data.length) + (isNumber(+a) ? (+a || 0) : 0), 4);
      }
      return 0;
    });

    const sectoredData = filter(this.dataStore, { Sector });
    const comparableSectoredData = map(sectoredData, (stock: IFundamentalData): Partial<IFundamentalData> => pick(stock, comparableFundamentalKeys));
    return getAvg(comparableSectoredData);
  }

}
