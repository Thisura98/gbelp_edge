import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DynamicSidebarItem } from "src/app/components/ui/dynamicsidebar/dynamicsidebar.component";
import { ApiService } from "src/app/services/api.service";
import { DialogService } from "src/app/services/dialog.service";
import { UserService } from "src/app/services/user.service";
import { UtilsService } from "src/app/services/utils.service";
import { GameListing } from "../../../../../../../../commons/src/models/game/game";
import { UserGroup } from "../../../../../../../../commons/src/models/groups";
import { GameSession } from "../../../../../../../../commons/src/models/session";
import { forkJoin } from "rxjs";
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ApexMarkers } from "ng-apexcharts";
import { GameSessionUserUsageBreakdown } from "../../../../../../../../commons/src/models/reports/user.usage";
import { DynBasicTableConfig } from "src/app/components/ui/dyn-basic-table/dyn-basic-table.component";
import { TimeConstants } from "src/app/constants/constants";

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

@Component({
  templateUrl: './usage.component.html',
  styleUrls: [
    './usage.component.css',
    './../common/report.common.css',
    './../../common/group.commonstyles.css'
  ]
})
export class GroupReportsUsageComponent implements OnInit {

  get sidebarItems(): DynamicSidebarItem[] { return []; }

  private groupId: string | undefined;
  private sessionId: string | undefined;
  group: UserGroup | undefined;
  session: GameSession | undefined;
  gameListing: GameListing | undefined;

  usageDataLoaded = false;
  breakdownStartTimetstamp: string | undefined;
  breakdownEndTimestamp: string | undefined;
  breakdownDataLoaded = false;

  public breakdownData: GameSessionUserUsageBreakdown[] = [];
  public breakdownTableConfig: DynBasicTableConfig = {
   showDelete: false,
   columns: [
     { name: 'Student Name', property: 'user_name', type: 'static' },
     { name: 'Average Usage', property: 'avg_usage', type: 'static', staticFormatter: this.timeFormat },
     { name: '# of Play Sessions', property: 'session_count', type: 'static' },
     { name: 'Longest Session', property: 'max_usage', type: 'static', staticFormatter: this.timeFormat }
   ],
   textAlign: 'center'
  }

  public apexChartOptions: ApexChartOptions = {

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
          this.handleChartZoomed(opts);
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private apiService: ApiService,
    private dialogService: DialogService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.userService.routeOutIfLoggedOut();
    this.activatedRoute.queryParamMap.subscribe(map => {
      this.groupId = map.get('groupId') ?? undefined;
      this.sessionId = map.get('sessionId') ?? undefined;
      this.loadData();
    });
  }

  handleBack(){
    this.router.navigate([
      'groups/reports/available'
    ], {
      queryParams: {
        groupId: this.groupId!,
        sessionId: this.sessionId!
      }
    })
  }

  private loadData() {
    forkJoin([
      this.apiService.session.getSession(this.sessionId!),
      this.apiService.group.getGroup(this.groupId!),
    ]).subscribe(values => {

      const sessionResponse = values[0];
      const groupResponse = values[1];

      // Check Membership errors.
      if (!groupResponse.success) {
        const msg = groupResponse.description;
        this.dialogService.showDismissable("Data Load Error", msg);
        if (groupResponse.code == 201)
          this.router.navigate(['/dashboard/f/groups']);
        return;
      }

      // Check session errors.
      if (!sessionResponse.success) {
        const msg = sessionResponse.description;
        this.dialogService.showDismissable("Session Load Error", msg);
        return;
      }

      this.group = groupResponse.data;
      this.session = sessionResponse.data;

      this.apiService.game.getGame(this.session.game_entry_id).subscribe(res => {
        if (res.success){
          this.gameListing = res.data;
          this.loadReportData();
        }
        else{
          this.showGameLoadError(res.description);
        }
      }, err => this.showGameLoadError(String(err)))
    })
  }

  private showGameLoadError(err: string){
    this.dialogService.showDismissable('Failed to load Game', err);
  }

  private loadReportData(){
    this.apiService.reports.usageReportGraph(this.sessionId!).subscribe(res => {
      if (res.success){
        this.usageDataLoaded = true;

        // Apex Charts
        this.apexChartOptions.xaxis.categories = res.data.labels;
        this.apexChartOptions.series[0].data = res.data.data;
        this.apexChartOptions.series[0].name = res.data.yAxesLabel;
      }
      else{
        this.handleReportLoadError(res.description);
      }
    }, err => this.handleReportLoadError(err));

    this.loadBreakdownData();
  }

  private loadBreakdownData(){
    this.breakdownDataLoaded = false;
    this.apiService.reports.usageReportBreakdown(
      this.sessionId!, 
      this.breakdownStartTimetstamp, 
      this.breakdownEndTimestamp
    ).subscribe(res => {
      if (res.success){
        this.breakdownDataLoaded = true;
        this.breakdownData = res.data;
      }
      else{
        this.handleReportLoadError(res.description)
      }
    }, (err) => this.handleReportLoadError(err));
  }

  private handleReportLoadError(err: any){
    const msg = typeof err == 'string' ? (err as string) : JSON.stringify(err);
    this.dialogService.showDismissable('Error loading Data', msg);
  }

  private timeFormat(seconds: string): string{
    const sec = Number.parseInt(seconds);

    if (isNaN(sec))
      return seconds;

    if (sec > TimeConstants.oneHourInSeconds){
      const val = Math.floor(sec / TimeConstants.oneHourInSeconds)
      return val == 1 ? '1 hour' : (val + ' hours')
    }

    if (sec > TimeConstants.oneMinuteInSeconds){
      const val = Math.round((sec / TimeConstants.oneMinuteInSeconds) * 100) / 100;
      return val == 1 ? '1 minute' : (val + ' minutes')
    }

    return sec + ' seconds';
  }

  private handleChartZoomed(opts: any){
    try{
      const min = opts.xaxis.min;
      const max = opts.xaxis.max;
      this.breakdownStartTimetstamp = min == undefined ? undefined : (opts.xaxis.min / 1000).toString();
      this.breakdownEndTimestamp = max == undefined ? undefined : (opts.xaxis.max / 1000).toString();
      this.loadBreakdownData();
    }
    catch(err){
      this.dialogService.showSnackbar(String(err));
    }
  }

}