import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  mockedBrandData,
  mockedChartOptions,
  mockedColors,
  mockedDatasets,
  mockedLabels
} from './widgets-brand.constants';


@Component({
  selector: 'app-widgets-brand',
  templateUrl: './widgets-brand.component.html',
  styleUrls: ['./widgets-brand.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WidgetsBrandComponent implements AfterContentInit {

  @Input() withCharts?: boolean;
  @Input() brandData?: any[] = mockedBrandData;
  @Input() chartOptions?: any = mockedChartOptions;
  @Input() labels?: any = mockedLabels;
  @Input() datasets?: any = mockedDatasets;
  @Input() colors?: any = mockedColors;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) { }

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  goToDiscovery(data: any): void {
    this.router.navigateByUrl(`discover?symbol=${data.symbol}`);
  }
}
