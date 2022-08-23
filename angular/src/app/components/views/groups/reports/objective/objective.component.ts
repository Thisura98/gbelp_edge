import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { DynamicSidebarItem } from "src/app/components/ui/dynamicsidebar/dynamicsidebar.component";
import { ApiService } from "src/app/services/api.service";
import { DialogService } from "src/app/services/dialog.service";
import { UserService } from "src/app/services/user.service";
import { UtilsService } from "src/app/services/utils.service";
import { GameListing } from "../../../../../../../../commons/src/models/game/game";
import { UserGroup } from "../../../../../../../../commons/src/models/groups";
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
  progressByObjectiveLoaded = false;
  breakdownDataLoaded = false;

  public timeChart: ApexChartOptions = {
    title: {
      text: ''
    },
    series: [{ name:' test', data: [] }],
    chart: {
      type: 'area',
      height: '200px',
      events: {
        // zoomed: (chart, opts) => {
        //   console.log('Overview zoomed:', opts);
        //   this.handleChartZoomed(opts);
        // }
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

  private loadReportData(){
    // Time chart
    this.progressByTimeLoaded = false;
    this.apiService.reports.usageObjectivesByTimeGraph(this.sessionId!).subscribe(res => {
      if (res.success){
        this.progressByTimeLoaded = true;
        this.timeChart.xaxis.categories = res.data.labels;
        this.timeChart.series[0].data = res.data.data;
        this.timeChart.series[0].name = res.data.xAxesLabel;
      }
      else{
        this.handleReportLoadError(res.description);
      }
    }, (err) => this.handleReportLoadError(err))

    // Todo: Progress chart
  }

  private showGameLoadError(err: string){
    this.dialogService.showDismissable('Failed to load Game', err);
  }

  private handleReportLoadError(err: any){
    const msg = typeof err == 'string' ? (err as string) : JSON.stringify(err);
    this.dialogService.showDismissable('Error loading Data', msg);
  }

}