import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Watchlist',
    url: '/watchlist',
    iconComponent: { name: 'cil-star' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Discover',
    url: '/discover',
    iconComponent: { name: 'cil-graph' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Settings'
  },
  {
    name: 'Settings',
    url: '/settings',
    iconComponent: { name: 'cil-settings' }
  },
  {
    title: true,
    name: 'God mode'
  },
  {
    name: 'Users',
    url: '/users',
    iconComponent: { name: 'cil-people' }
  },
  {
    name: 'Service pages',
    url: '/404',
    iconComponent: { name: 'cil-browser' },
    children: [
      {
        name: 'Error 404',
        url: '/404'
      },
      {
        name: 'Error 500',
        url: '/500'
      }
    ]
  },
];
