export enum MetricEnum {
  PERatio = 'P/E',
  ReturnOnEquityTTM = 'ROE',
  ReturnOnAssetsTTM = 'ROA',
  PriceToSalesRatioTTM = 'P/S',
  PriceToBookRatio = 'P/B',
  EPS = 'EPS',
  DividendYield = 'Dividend Yield',
}

export enum ComparisonEnum {
  Positive,
  Negative,
  Zero,
}

export const comparisonMetricSet: { [key in MetricEnum]: ComparisonEnum } = {
  [MetricEnum.EPS]: ComparisonEnum.Positive,
  [MetricEnum.DividendYield]: ComparisonEnum.Positive,
  [MetricEnum.PERatio]: ComparisonEnum.Negative,
  [MetricEnum.PriceToSalesRatioTTM]: ComparisonEnum.Negative,
  [MetricEnum.PriceToBookRatio]: ComparisonEnum.Negative,
  [MetricEnum.ReturnOnAssetsTTM]: ComparisonEnum.Positive,
  [MetricEnum.ReturnOnEquityTTM]: ComparisonEnum.Positive,
}

export enum PriorityEnum {
  NONE,
  LOWEST,
  LOW,
  AVERAGE,
  HIGH,
  HIGHEST,
}

export const prioritiesOfPercent = {
  [PriorityEnum.NONE]: 0,
  [PriorityEnum.LOWEST]: 0.25,
  [PriorityEnum.LOW]: 0.5,
  [PriorityEnum.AVERAGE]: 1,
  [PriorityEnum.HIGH]: 1.5,
  [PriorityEnum.HIGHEST]: 2,
}

export interface IMetric {
  key: keyof typeof MetricEnum;
  priority: PriorityEnum;
}

export interface IUserMetrics {
  userId: number;
  metricPriorityList: IMetric[];
}

export enum CountryEnum {
  UA = 'Ua',
  US = 'Us',
  GB = 'Gb',
  DE = 'De',
  FR = 'Fr',
  IT = 'It',
  ES = 'Es',
  PL = 'Pl',
}

export interface IUser {
  userId: number;
  name: string;
  country: CountryEnum;

  state: string;
  registered: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}
