import { DynBasicTableConfig } from "src/app/components/ui/dyn-basic-table/dyn-basic-table.component";
import { ApexChartOptions } from "./report.constants";

export function getUsageOverviewChartOptions(onChartZoomed: (params: any) => void): ApexChartOptions{
  return {
    title: {
      text: ''
    },
    series: [{ name:' test', data: [] }],
    chart: {
      type: 'area',
      height: '200px',
      events: {
        zoomed: (chart, opts) => {
          console.log('Overview zoomed:', opts);
          onChartZoomed(opts);
        }
      }
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
        text: 'Cumulative Sessions'
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

export function getUsageBreakdownTableConfig(timeFormatter: (input: string) => string): DynBasicTableConfig{
  return {
    showDelete: false,
    showRightChevron: true,
    columns: [
      { name: 'Student Name', property: 'user_name', type: 'static' },
      { name: 'Average Usage', property: 'avg_usage', type: 'static', 
        staticFormatter: timeFormatter },
      { name: '# of Play Sessions', property: 'session_count', type: 'static' },
      { name: 'Longest Session', property: 'max_usage', type: 'static', 
        staticFormatter: timeFormatter }
    ],
    textAlign: 'center'
   }
}