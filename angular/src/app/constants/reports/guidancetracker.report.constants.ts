import { DynBasicTableConfig } from "src/app/components/ui/dyn-basic-table/dyn-basic-table.component";
import { ApexChartOptions, reportTimeFormat } from "./report.constants";

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
        text: 'Value'
      },
      min: 0,
      labels: {
        formatter: (value, opts) => {
          return Math.floor(value).toString();
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
        formatter: (ts, opts) => reportTimeFormat(ts)
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
      min: 0.0,
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

export function getGuidanceTrackerBreakdownTableConfig(
  progressFormatter: (input: string) => string,
  timeFormatter: (input: string) => string
): DynBasicTableConfig{
  return {
    showDelete: false,
    showRightChevron: true,
    columns: [
      { name: 'Student Name', property: 'user_name', type: 'static' },
      { name: 'Trackers Triggered', property: 'tracker_hit_count', type: 'static' },
      { name: 'Progress', property: 'total_progress', type: 'static', 
        staticFormatter: progressFormatter },
      { name: 'Play Duration', property: 'total_play_duration', type: 'static', 
        staticFormatter: timeFormatter },
      { name: 'Velocity', property: 'velocity', type: 'static' },
    ],
    textAlign: 'center'
   }
}