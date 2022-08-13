import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DynamicSidebarItem } from "src/app/components/ui/dynamicsidebar/dynamicsidebar.component";
import { ApiService } from "src/app/services/api.service";
import { DialogService } from "src/app/services/dialog.service";
import { UserService } from "src/app/services/user.service";
import { UtilsService } from "src/app/services/utils.service";
import { GameEntry } from "../../../../../../../../commons/src/models/game/game";
import { UserGroup } from "../../../../../../../../commons/src/models/groups";
import { GameSession } from "../../../../../../../../commons/src/models/session";
import { forkJoin } from "rxjs";
import { ChartConfiguration, ChartArea, ScriptableContext } from 'chart.js';

@Component({
  templateUrl: './usage.component.html',
  styleUrls: [
    './usage.component.css',
    './../common/report.common.css',
    './../../common/group.commonstyles.css'
  ]
})
export class GroupReportsUsageComponent implements OnInit {

  get sidebarItems(): DynamicSidebarItem[] {
    return [];
  }

  private groupId: string | undefined;
  private sessionId: string | undefined;
  group: UserGroup | undefined;
  session: GameSession | undefined;
  game: GameEntry | undefined;

  usageDataLoaded = false;

  chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    }
  };

  usageData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [{
      // categoryPercentage: 1.0,
      // barPercentage: 1.0,
      data: [],
      label: '',
      fill: true,
      pointBackgroundColor: '#00713B',
      borderColor: '#00713B',
      backgroundColor: (context) => this.getGradient(context)
    }]
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private apiService: ApiService,
    private dialogService: DialogService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.userService.routeOutIfLoggedOut();
    this.activatedRoute.queryParamMap.subscribe(map => {
      this.groupId = map.get('groupId') ?? undefined;
      this.sessionId = map.get('sessionId') ?? undefined;
      this.loadData();
    });
  }

  private getGradient(context: ScriptableContext<'line'>): any {
    let { ctx, chartArea } = context.chart;
    if (!chartArea)
      return null;
    const stopColor = '#9EFF63';
    const startColor = '#57E400';
    let gradient = ctx!.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, stopColor);
    gradient.addColorStop(1, startColor);
    return gradient;
  }

  private loadData() {
    forkJoin([
      this.apiService.session.getSession(this.sessionId!),
      this.apiService.group.getGroup(this.groupId!)
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
      this.loadReportData();
    })
  }

  private loadReportData(){
    this.apiService.reports.usageReports(this.sessionId!).subscribe(res => {
      if (res.success){
        this.usageDataLoaded = true;
        this.usageData.labels = res.data.labels;
        this.usageData.datasets[0].data = res.data.data;
        this.usageData.datasets[0].label = res.data.xAxesLabel;
      }
      else{
        this.handleReportLoadError(res.description);
      }
    }, err => this.handleReportLoadError(err));
  }

  private handleReportLoadError(err: any){
    const msg = typeof err == 'string' ? (err as string) : JSON.stringify(err);
    this.dialogService.showDismissable('Error loading Data', msg);
  }

}