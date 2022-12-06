import { Component, Input, OnInit } from '@angular/core';
import { ColorType, IEstimate } from '../../../models/analytics-robor.model';
import { AnalyticsRobotService } from '../../../services/analytics-robot.service';

@Component({
  selector: 'app-estimate-table',
  templateUrl: './estimate-table.component.html',
  styleUrls: ['./estimate-table.component.scss']
})
export class EstimateTableComponent implements OnInit {
  @Input() list: IEstimate[] | null = [];
  @Input() title = '';

  constructor(
    private analyticsRobot: AnalyticsRobotService,
  ) { }

  ngOnInit(): void {
  }

  isLengthPositive(arr: any[] | null) {
    return arr && arr.length > 0;
  }

  getColorBasedOnDeltaPercent(value: number): ColorType {
    return this.analyticsRobot.getColorBasedOnDeltaPercent(value);
  }

}
