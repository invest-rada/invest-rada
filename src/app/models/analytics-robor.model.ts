export type ColorType = 'success' | 'info' | 'warning' | 'danger' | '';

export interface IEstimate {
  color: ColorType;
  name: string;
  value: number;
}

export interface IChartProps {
  data?: any;
  labels?: any;
  options?: any;
  colors?: any;
  type?: any;
  legend?: any;

  [propName: string]: any;
}
