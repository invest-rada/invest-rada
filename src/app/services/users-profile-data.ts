import { Injectable } from '@angular/core';
import { IMetric, IUser, IUserMetrics, MetricEnum } from '../models/user-data.model';
import { mockedUserList } from './user-data.constants';


@Injectable({
  providedIn: 'any'
})
export class UsersMetricsData {
  public usersMetrics: IUserMetrics[] = [];

  constructor() {
    this.initUsers(mockedUserList);
  }

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  initUsers(userList: IUser[] = mockedUserList): void {
    this.usersMetrics = userList.map((user: IUser): IUserMetrics => {
      const metricPriorityList: IMetric[] = [];
      for (let metric in MetricEnum) {
        metricPriorityList.push({
          key: metric as keyof typeof MetricEnum,
          priority: this.random(0, 5),
        })
      }

      return {
        userId: user.userId,
        metricPriorityList
      } as IUserMetrics;
    })
  }

}
