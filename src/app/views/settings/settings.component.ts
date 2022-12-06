import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { findIndex } from 'lodash-es';
import { Subject, takeUntil } from 'rxjs';
import { MetricEnum, PriorityEnum } from '../../models/user-data.model';
import { AnalyticsRobotService } from '../../services/analytics-robot.service';
import { UserDataService } from '../../services/user-data.service';
import { radarChartOptions } from './settings.constant';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  destroyed$: Subject<boolean> = new Subject<boolean>();

  currentUser$ = this.userData.currentUser$;
  radarChartData: ChartData = { datasets: [] };
  radarChartOptions: ChartOptions = radarChartOptions;
  userMetricList = this.userData.currentUserMetrics;

  constructor(
    private analyticsRobot: AnalyticsRobotService,
    private userData: UserDataService,
  ) { }

  ngOnInit(): void {
    this.userData.currentUserMetrics$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.initRadar();
    })
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  initRadar() {
    const labels = this.analyticsRobot.getRadarLabels();
    const userData = this.analyticsRobot.getRadarUserData();
    const recommendedData = this.analyticsRobot.getRadarRecommendedData();

    this.radarChartData = {
      labels,
      datasets: [
        {
          label: `User's Metrics`,
          data: userData,
          backgroundColor: '#FF638433',
          borderColor: '#FF6384CC',
        },
        {
          label: 'Recommended',
          data: recommendedData,
          backgroundColor: 'rgba(61,24,32,0.1)',
          borderColor: 'rgba(61,24,32,0.1)',
        },
      ],
    };
  }

  getPriorityName(priority: number): string {
    return PriorityEnum[priority];
  }

  getMetricName(key: keyof typeof MetricEnum): string {
    return MetricEnum[key];
  }

  changeMetricPriority(key: keyof typeof MetricEnum, target: EventTarget | null) {
    const currentUserMetrics = this.userData.currentUserMetrics;
    const priority: number = parseInt((target as HTMLTextAreaElement).value);

    const index = findIndex(currentUserMetrics, { key });
    currentUserMetrics.splice(index, 1, { key, priority });
    this.userData.currentUserMetrics = [...currentUserMetrics];
  }
}
