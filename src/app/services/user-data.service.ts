import { Injectable } from '@angular/core';
import { defaults, find } from 'lodash-es';
import { BehaviorSubject, Observable } from 'rxjs';

import { IMetric, IUser } from '../models/user-data.model';
import { mockedRecommendedMetrics, mockedUserList } from './user-data.constants';
import { UsersMetricsData } from './users-profile-data';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  users: IUser[] = mockedUserList;
  recommendedMetrics: IMetric[];
  currentUser$: Observable<IUser>;
  #currentUserMetrics: BehaviorSubject<IMetric[]> = new BehaviorSubject<IMetric[]>([]);
  currentUserMetrics$: Observable<IMetric[]> = this.#currentUserMetrics.asObservable();
  #currentUser: BehaviorSubject<IUser>;

  constructor(
    public usersMetricsData: UsersMetricsData
  ) {
    this.#currentUser = new BehaviorSubject<IUser>(mockedUserList[0]);
    this.currentUserMetrics = defaults(
      find(this.usersMetricsData.usersMetrics, { userId: mockedUserList[0].userId })?.metricPriorityList,
      this.usersMetricsData.usersMetrics[0].metricPriorityList
    );
    this.recommendedMetrics = mockedRecommendedMetrics;
    this.currentUser$ = this.#currentUser.asObservable();
  }

  get currentUserMetrics(): IMetric[] {
    return this.#currentUserMetrics.getValue();
  }

  set currentUserMetrics(value: IMetric[]) {
    this.#currentUserMetrics.next(value);
  }

  get currentUser(): IUser {
    return this.#currentUser.getValue();
  }

  set currentUser(user: IUser) {
    this.#currentUser.next(user);
  }

  switchUser(userId: number) {
    this.currentUser = defaults(find(this.users, { userId }), this.users[0]);
    this.currentUserMetrics = defaults(
      find(this.usersMetricsData.usersMetrics, { userId })?.metricPriorityList,
      this.usersMetricsData.usersMetrics[0].metricPriorityList
    );
  }
}
