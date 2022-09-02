import { ApexChartOptions } from "./report.constants";

export function getGuidanceTrackerTimeChartOptions(): ApexChartOptions{
  return {
    title: {
      text: ''
    },
    series: [{ name:' test', data: [] }],
    chart: {
      type: 'area',
      height: '200px',
      redrawOnWindowResize: true
    },
    markers: {
      size: 5,
      colors: ["#FFFFFF"],
      strokeColors: ["#098FFA"],
      strokeWidth: 3,
      hover:{
        size: 5
      }
    },
    xaxis: {
      type: 'datetime',
      categories: [],
      crosshairs: {
        show: true
      },
      labels: {
        datetimeUTC: false,
        format: 'MMM dd HH:mm',
        datetimeFormatter: {
          day: 'MMM dd',
          hour: 'dd HH:mm',
          minute: 'HH:mm:ss'
        }
      },
      tooltip: {
        enabled: false
      },
      axisBorder: {
        show: true,
        color: '#8f8f8f'
      }
    },
    yaxis: {
      title: {
        text: 'Objective Points'
      },
      min: 0,
      labels: {
        formatter: (value, opts) => {
          return value.toPrecision(2);
        }
      },
      axisBorder: {
        show: true,
        color: '#8f8f8f'
      }
    },
    dataLabels: { enabled: false },
    tooltip: {
      x: {
        formatter: (ts, opts) => {
          const date = new Date(ts);
          const day = date.toDateString();
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const seconds = date.getSeconds().toString().padStart(2, '0');
          return `${day} - ${hours}:${minutes}:${seconds}`
        }
      },
      y: {
        formatter: (val, opts) => {
          return val.toString() + ' points';
        }
      },
      marker: {
        show: false
      }
    },
    grid: {
      borderColor: '#AEAEAE',
      strokeDashArray: 3
    },
    fill: {
    }
  }
}

export function getGuidanceTrackerHitCountChartOptions(): ApexChartOptions{
  return {
    title: {
      text: ''
    },
    series: [{ name:' test', data: [] }],
    chart: {
      type: 'bar',
      height: '200px',
      redrawOnWindowResize: true
    },
    xaxis: {
      type: 'category',
      categories: [],
      crosshairs: {
        show: true
      },
      tooltip: {
        enabled: false
      },
      axisBorder: {
        show: true,
        color: '#8f8f8f'
      }
    },
    yaxis: {
      title: {
        text: 'Hit Count'
      },
      max: 1.0,
      min: 0.0,
      tickAmount: 4,
      labels: {
        formatter: (value, opts) => {
          return value.toPrecision(2);
        }
      },
      axisBorder: {
        show: true,
        color: '#8f8f8f'
      }
    },
    dataLabels: { enabled: false },
    tooltip: {
      y: {
        formatter: (progress, opts) => {
          return Math.round(progress * 100).toString() + '%';
        }
      },
      marker: {
        show: false
      }
    },
    grid: {
      borderColor: '#AEAEAE',
      strokeDashArray: 3
    },
    fill: {
    }
  }
}