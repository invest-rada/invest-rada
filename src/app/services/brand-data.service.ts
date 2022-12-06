import { Injectable } from '@angular/core';
import { IBrand } from '../models/brand-data.model';


@Injectable({
  providedIn: 'root'
})
export class BrandDataService {

  constructor() {
  }

  getIconBySymbol(symbol: string): string {
    switch (symbol) {
      case 'AAPL':
        return 'cibApple';
      case 'AMD':
        return 'cibAmd';
      case 'AMZN':
        return 'cibAmazon';
      case 'EBAY':
        return 'cibEbay';
      case 'IBM':
        return 'cibIbm';
      case 'GOOG':
        return 'cibGoogle';
      case 'META':
        return 'cibFacebook';
      case 'MSFT':
        return 'cibMicrosoft';
      case 'NVDA':
        return 'cibNvidia';
      case 'TSLA':
        return 'cibTesla';
      default:
        return 'cibDevTo';
    }
  }

  getRandomRgb() {
    const num = Math.round(0xffffff * Math.random());
    const r = num >> 16;
    const g = num >> 8 & 255;
    const b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }

  getColorBySymbol(symbol: string): string {
    switch (symbol) {
      case 'AAPL':
        return '#555555';
      case 'AMD':
        return '#000';
      case 'AMZN':
        return '#FF9900';
      case 'EBAY':
        return '#0064D2';
      case 'IBM':
        return '#0530ad';
      case 'GOOG':
        return '#4285F4';
      case 'META':
        return '#3b5998';
      case 'MSFT':
        return '#F25022';
      case 'NVDA':
        return '#76b900';
      case 'TSLA':
        return '#c00';
      case 'SNPS':
        return '#5a2982';
      default:
        return this.getRandomRgb();
    }
  }

  getBrandBySymbol(symbol: string): IBrand {
    return {
      color: this.getColorBySymbol(symbol),
      icon: this.getIconBySymbol(symbol),
    }
  }
}
