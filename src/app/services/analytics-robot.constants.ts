import { getStyle, hexToRgba } from '@coreui/utils/src';

const brandSuccess = getStyle('--cui-success') ?? '#4dbd74';
const brandInfo = getStyle('--cui-info') ?? '#20a8d8';
const brandInfoBg = hexToRgba(getStyle('--cui-info'), 10) ?? '#20a8d8';
const brandDanger = getStyle('--cui-danger') || '#f86c6b';

export const SINGLE_FRONTIER = 30;
export const OVERALL_FRONTIER = 50;

export const chartColors = [
  {
    // sector
    backgroundColor: 'transparent',
    borderColor: brandInfo,
    pointHoverBackgroundColor: brandInfo,
    borderWidth: 2,
  },
  {
    // company
    backgroundColor: 'transparent',
    borderColor: brandSuccess || '#4dbd74',
    pointHoverBackgroundColor: '#fff'
  },
  {
    // analysis
    borderColor: brandDanger || '#f86c6b',
    pointHoverBackgroundColor: brandDanger,
    borderWidth: 2,
    borderDash: [8, 5],
    backgroundColor: brandInfoBg,
    fill: true
  }
];

const plugins = {
  legend: {
    display: false
  },
  tooltip: {
    callbacks: {
      labelColor: function (context: any) {
        return {
          backgroundColor: context.dataset.borderColor
        };
      }
    }
  }
};

export const chartOptions = {
  maintainAspectRatio: false,
  plugins,
  scales: {
    x: {
      grid: {
        drawOnChartArea: false
      }
    },
    y: {
      beginAtZero: true,
      ticks: {
        maxTicksLimit: 5,
        stepSize: Math.ceil(250 / 5)
      }
    }
  },
  elements: {
    line: {
      tension: 0.4
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3
    }
  }
};

