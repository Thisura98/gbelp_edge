import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { DynBasicTableConfig } from "src/app/components/ui/dyn-basic-table/dyn-basic-table.component";
import { DynamicSidebarItem } from "src/app/components/ui/dynamicsidebar/dynamicsidebar.component";
import { ApiService } from "src/app/services/api.service";
import { DialogService } from "src/app/services/dialog.service";
import { UserService } from "src/app/services/user.service";
import { UtilsService } from "src/app/services/utils.service";
import { GameListing } from "../../../../../../../../commons/src/models/game/game";
import { UserGroup } from "../../../../../../../../commons/src/models/groups";
import { GameSessionUserObjectiveBreakdown } from "../../../../../../../../commons/src/models/reports/user.objective";
import { GameSession } from "../../../../../../../../commons/src/models/session";
import { ApexChartOptions } from "../usage/usage.component";

@Component({
  templateUrl: "./objective.component.html",
  styleUrls: [
    "./objective.component.css",
    './../common/report.common.css',
    './../../common/group.commonstyles.css'
  ]
})
export class GroupReportsObjectiveComponent{

  get sidebarItems(): DynamicSidebarItem[] { return []; }

  private groupId: string | undefined;
  private sessionId: string | undefined;
  group: UserGroup | undefined;
  session: GameSession | undefined;
  gameListing: GameListing | undefined;

  progressByTimeLoaded = false;
  progressByCompletionLoaded = false;
  breakdownDataLoaded = true;

  public timeChart: ApexChartOptions = {
    title: {
      text: ''
    },
    series: [{ name:' test', data: [] }],
    chart: {
      type: 'area',
      height: '200px',
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
          return val.toString() + ' sessions';
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

  public completionChart: ApexChartOptions = {
    title: {
      text: ''
    },
    series: [{ name:' test', data: [] }],
    chart: {
      type: 'bar',
      height: '200px',
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

  public breakdownData: GameSessionUserObjectiveBreakdown[] = [];
  public breakdownTableConfig: DynBasicTableConfig = {
   showDelete: false,
   columns: [
     { name: 'Student Name', property: 'user_name', type: 'static' },
     { name: 'Objectives Completed', property: 'count_completed_objectives', type: 'static' },
     { name: 'Progress', property: 'progress', type: 'static' },
     { name: 'Play Sessions', property: 'count_sessions', type: 'static' },
     { name: 'Velocity', property: 'velocity', type: 'static' },
   ],
   textAlign: 'center'
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

  private loadReportData(){
    // Time chart
    this.progressByTimeLoaded = false;
    this.apiService.reports.usageObjectivesByTimeGraph(this.sessionId!).subscribe(res => {
      if (res.success){
        this.progressByTimeLoaded = true;
        this.timeChart.xaxis.categories = res.data.labels;
        this.timeChart.series[0].data = res.data.data;
        this.timeChart.series[0].name = res.data.yAxesLabel;
      }
      else{
        this.handleReportLoadError(res.description);
      }
    }, (err) => this.handleReportLoadError(err))

    // Completion % chart
    this.progressByCompletionLoaded = false;
    this.apiService.reports.usageObjectivesByProgressGraph(this.sessionId!).subscribe(res => {
      if (res.success){
        this.progressByCompletionLoaded = true;
        this.completionChart.xaxis.categories = res.data.labels;
        this.completionChart.series[0].data = res.data.data;
        this.completionChart.series[0].name = res.data.xAxesLabel;
      }
      else{
        this.handleReportLoadError(res.description);
      }
    }, (err) => this.handleReportLoadError(err));
  }

  private showGameLoadError(err: string){
    this.dialogService.showDismissable('Failed to load Game', err);
  }

  private handleReportLoadError(err: any){
    const msg = typeof err == 'string' ? (err as string) : JSON.stringify(err);
    this.dialogService.showDismissable('Error loading Data', msg);
  }

}