import { DynBasicTableConfig } from "src/app/components/ui/dyn-basic-table/dyn-basic-table.component";
import { ApexChartOptions } from "./report.constants";

export function getObjectiveProgressByTimeChartOptions(): ApexChartOptions{
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

export function getObjectiveProgressByCompletionChartOptions(): ApexChartOptions{
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
        text: 'Completion %'
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

export function getObjectiveBreakdownTableConfig(
  progressFormatter: (input: string) => string,
  timeFormatter: (input: string) => string
): DynBasicTableConfig{
  return {
    showDelete: false,
    showRightChevron: true,
    columns: [
      { name: 'Student Name', property: 'user_name', type: 'static' },
      { name: 'Objectives Completed', property: 'completed_objective_count', type: 'static' },
      { name: 'Progress', property: 'total_progress', type: 'static', 
        staticFormatter: progressFormatter },
      { name: 'Play Duration', property: 'total_play_duration', type: 'static', 
        staticFormatter: timeFormatter },
      { name: 'Velocity', property: 'velocity', type: 'static' },
    ],
    textAlign: 'center'
   }
}