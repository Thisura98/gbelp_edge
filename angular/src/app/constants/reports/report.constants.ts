import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ApexMarkers, ApexStroke } from "ng-apexcharts";

export type ApexChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  markers?: ApexMarkers,
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  grid: ApexGrid,
  fill: ApexFill,
  stroke?: ApexStroke,
}

export function reportTimeFormat(ts: number | string): string{
  const date = new Date(ts);
  const day = date.toDateString();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // console.log("reportTimeFormat", hours, minutes, seconds);

  if (hours == 0 && minutes == 0){
    return day;
  }
  else{
    const strHours = hours.toString().padStart(2, '0');
    const strMinutes = minutes.toString().padStart(2, '0');
    const strSeconds = seconds.toString().padStart(2, '0');
    return `${day} - ${strHours}:${strMinutes}:${strSeconds}`;
  }
}