import { CountryEnum, IMetric, IUser, IUserMetrics, PriorityEnum } from '../models/user-data.model';


export const mockedUserList: IUser[] = [
  {
    userId: 1,
    name: 'John Farrier',
    country: CountryEnum.GB,

    state: 'New',
    registered: 'Jan 1, 2021',
    usage: 50,
    period: 'Jun 11, 2021 - Jul 10, 2021',
    payment: 'Mastercard',
    activity: '10 sec ago',
    avatar: './assets/img/avatars/1.jpg',
    status: 'success',
    color: 'success'
  },
  {
    userId: 2,
    name: 'John Smith',
    country: CountryEnum.US,

    state: 'Recurring ',
    registered: 'Jan 1, 2021',
    usage: 10,
    period: 'Jun 11, 2021 - Jul 10, 2021',
    payment: 'Visa',
    activity: '5 minutes ago',
    avatar: './assets/img/avatars/2.jpg',
    status: 'danger',
    color: 'info'
  },
  {
    userId: 3,
    name: 'Ivan Koval',
    country: CountryEnum.UA,

    state: 'New',
    registered: 'Jan 1, 2021',
    usage: 74,
    period: 'Jun 11, 2021 - Jul 10, 2021',
    payment: 'Stripe',
    activity: '1 hour ago',
    avatar: './assets/img/avatars/3.jpg',
    status: 'warning',
    color: 'warning'
  },
  {
    userId: 4,
    name: 'Giovanni Fabbro',
    country: CountryEnum.IT,

    state: 'Sleep',
    registered: 'Jan 1, 2021',
    usage: 98,
    period: 'Jun 11, 2021 - Jul 10, 2021',
    payment: 'Paypal',
    activity: 'Last month',
    avatar: './assets/img/avatars/4.jpg',
    status: 'secondary',
    color: 'danger'
  },
  {
    userId: 5,
    name: 'Jean Forgeron',
    country: CountryEnum.FR,

    state: 'New',
    registered: 'Jan 1, 2021',
    usage: 22,
    period: 'Jun 11, 2021 - Jul 10, 2021',
    payment: 'ApplePay',
    activity: 'Last week',
    avatar: './assets/img/avatars/5.jpg',
    status: 'success',
    color: 'primary'
  },
  {
    userId: 6,
    name: 'Hans Schmied',
    country: CountryEnum.DE,

    state: 'New',
    registered: 'Jan 1, 2021',
    usage: 43,
    period: 'Jun 11, 2021 - Jul 10, 2021',
    payment: 'Amex',
    activity: 'Yesterday',
    avatar: './assets/img/avatars/6.jpg',
    status: 'info',
    color: 'dark'
  },
  {
    userId: 7,
    name: 'Juan Herrero',
    country: CountryEnum.ES,

    state: 'New',
    registered: 'Jan 1, 2021',
    usage: 14,
    period: 'Jun 11, 2021 - Jul 10, 2021',
    payment: 'Amex',
    activity: 'Yesterday',
    avatar: './assets/img/avatars/7.jpg',
    status: 'info',
    color: 'primary'
  },
  {
    userId: 8,
    name: 'Janusz Kowalski',
    country: CountryEnum.PL,

    state: 'New',
    registered: 'Jan 1, 2021',
    usage: 67,
    period: 'Jun 11, 2021 - Jul 10, 2021',
    payment: 'Amex',
    activity: 'Yesterday',
    avatar: './assets/img/avatars/8.jpg',
    status: 'success',
    color: 'success'
  },
];

export const mockedRecommendedMetrics: IMetric[] = [
  {
    key: 'PERatio',
    priority: PriorityEnum.HIGH
  },
  {
    key: 'ReturnOnEquityTTM',
    priority: PriorityEnum.HIGH,
  },
  {
    key: 'ReturnOnAssetsTTM',
    priority: PriorityEnum.HIGHEST,
  },
  {
    key: 'PriceToSalesRatioTTM',
    priority: PriorityEnum.AVERAGE,
  },
  {
    key: 'PriceToBookRatio',
    priority: PriorityEnum.LOWEST,
  },
  {
    key: 'EPS',
    priority: PriorityEnum.AVERAGE,
  },
  {
    key: 'DividendYield',
    priority: PriorityEnum.LOW,
  },
]


export const mockedUsersMetrics: IUserMetrics[] = [
  // PE
  {
    userId: 1,
    metricPriorityList: [
      {
        key: 'PERatio',
        priority: PriorityEnum.HIGH
      },
      {
        key: 'EPS',
        priority: PriorityEnum.HIGHEST,
      },
    ],
  },
  // Dividend
  {
    userId: 2,
    metricPriorityList: [
      {
        key: 'EPS',
        priority: PriorityEnum.HIGH
      },
      {
        key: 'DividendYield',
        priority: PriorityEnum.HIGHEST,
      },
    ],
  },
  // Rentable
  {
    userId: 3,
    metricPriorityList: [
      {
        key: 'ReturnOnEquityTTM',
        priority: PriorityEnum.HIGH
      },
      {
        key: 'ReturnOnAssetsTTM',
        priority: PriorityEnum.HIGHEST,
      },
    ],
  },
]
