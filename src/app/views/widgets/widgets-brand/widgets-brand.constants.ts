export const mockedChartOptions = {
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
  },
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      display: false
    },
    y: {
      display: false
    }
  }
};

export const mockedLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


export const mockedDatasets = {
  borderWidth: 2,
  fill: true
};

export const mockedColors = {
  backgroundColor: 'rgba(255,255,255,.1)',
  borderColor: 'rgba(255,255,255,.55)',
  pointHoverBackgroundColor: '#fff'
};

export const mockedBrandData = [
  {
    icon: 'cibFacebook',
    values: [{ title: 'friends', value: '89K' }, { title: 'feeds', value: '459' }],
    capBg: { '--cui-card-cap-bg': '#3b5998' },
    labels: [...mockedLabels],
    data: {
      labels: [...mockedLabels],
      datasets: [{ ...mockedDatasets, data: [65, 59, 84, 84, 51, 55, 40], label: 'Facebook', ...mockedColors }]
    }
  },
  {
    icon: 'cibTwitter',
    values: [{ title: 'followers', value: '973k' }, { title: 'tweets', value: '1.792' }],
    capBg: { '--cui-card-cap-bg': '#00aced' },
    data: {
      labels: [...mockedLabels],
      datasets: [{ ...mockedDatasets, data: [1, 13, 9, 17, 34, 41, 38], label: 'Twitter', ...mockedColors }]
    }
  },
  {
    icon: 'cib-linkedin',
    values: [{ title: 'contacts', value: '500' }, { title: 'feeds', value: '1.292' }],
    capBg: { '--cui-card-cap-bg': '#4875b4' },
    data: {
      labels: [...mockedLabels],
      datasets: [{ ...mockedDatasets, data: [78, 81, 80, 45, 34, 12, 40], label: 'LinkedIn', ...mockedColors }]
    }
  },
  {
    icon: 'cilCalendar',
    values: [{ title: 'events', value: '12+' }, { title: 'meetings', value: '4' }],
    color: 'warning',
    data: {
      labels: [...mockedLabels],
      datasets: [{ ...mockedDatasets, data: [35, 23, 56, 22, 97, 23, 64], label: 'Events', ...mockedColors }]
    }
  }
];
