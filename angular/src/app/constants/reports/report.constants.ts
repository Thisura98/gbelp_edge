import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ApexMarkers } from "ng-apexcharts";

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
}