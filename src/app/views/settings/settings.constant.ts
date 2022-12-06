import { ChartOptions } from 'chart.js';

export const radarChartOptions: ChartOptions = {
  animation: {
    duration: 0,
  },
  animations: {
    initial: false,
    transitions: {
      duration: 3000,
    },
    tension: {
      duration: 3000,
      easing: 'linear',
      from: 0.3,
      to: 0.2,
      loop: true
    }
  },
  scales: {
    r: {
      animate: false,
      max: 5,
      min: 0,
      ticks: {
        stepSize: 1
      }
    }
  }
};
