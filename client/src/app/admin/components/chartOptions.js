const chartOptions = {
  responsive: true,
  animation: {
    duration: 2000,
    easing: 'easeInOutCubic',
  },
  plugins: {
    legend: {
      labels: {
        color: '#000000',
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#000000',
      },
      grid: {
        color: 'rgba(0,0,0,0.1)',
      },
    },
    y: {
      ticks: {
        color: '#000000',
      },
      grid: {
        color: 'rgba(0,0,0,0.1)',
      },
    },
  },
};

export default chartOptions;
