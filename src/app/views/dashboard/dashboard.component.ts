import { Component, OnInit } from '@angular/core';

interface IFeature {
  icon: string;
  bgColor: string;
  title: string;
  description: string;
  routerLink: string;
  routerTitle: string;
}

export const mockedFeatureList: IFeature[] = [
  {
    icon: 'cil-star',
    bgColor: '#ffcc02',
    title: 'Watchlist',
    description: 'This is page contains all instruments, that already predefined or previously searched by users.',
    routerLink: '/watchlist',
    routerTitle: 'Go to the watchlist',
  },
  {
    icon: 'cil-graph',
    bgColor: '#0f3391',
    title: 'Discovery',
    description: 'This is main page about analysis, which contains visualisation of advising based on user priorities for main metrics.',
    routerLink: '/discover',
    routerTitle: 'Go to discover',
  },
  {
    icon: 'cil-cog',
    bgColor: '#333',
    title: 'Settings',
    description: 'This is page show which user currently selected and which priorities they has. Also it could be adjusted.',
    routerLink: '/settings',
    routerTitle: 'Go to setting',
  },
  {
    icon: 'cil-people',
    bgColor: '#ab1c00',
    title: 'Users',
    description: 'This is page provide ability to switch between different users for testing the main feature about analysis, after each session all setting clear and randomize.',
    routerLink: '/users',
    routerTitle: 'Go to users',
  },
];

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  featureList = mockedFeatureList;

  constructor() {
  }

  ngOnInit(): void {
  }
}
