import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { DynamicSidebarItem } from "src/app/components/ui/dynamicsidebar/dynamicsidebar.component";
import { TimeConstants } from "src/app/constants/constants";
import { getObjectiveBreakdownTableConfig, getObjectiveProgressByCompletionChartOptions, getObjectiveProgressByTimeChartOptions } from "src/app/constants/reports/objective.report.constants";
import { ApiService } from "src/app/services/api.service";
import { DialogService } from "src/app/services/dialog.service";
import { UserService } from "src/app/services/user.service";
import { UtilsService } from "src/app/services/utils.service";
import { GameListing } from "../../../../../../../../commons/src/models/game/game";
import { UserGroup } from "../../../../../../../../commons/src/models/groups";
import { GameSessionUserObjectiveBreakdown } from "../../../../../../../../commons/src/models/reports/user.objective";
import { GameSession } from "../../../../../../../../commons/src/models/session";

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
  breakdownDataLoaded = false;

  public readonly timeChart = getObjectiveProgressByTimeChartOptions();
  public readonly completionChart = getObjectiveProgressByCompletionChartOptions();
  public readonly breakdownTableConfig = getObjectiveBreakdownTableConfig(
    (i) => this.progressFormat(i),
    (i) => this.timeFormat(i)
  );

  public breakdownData: GameSessionUserObjectiveBreakdown[] = [];

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

  printReport(){
    print();
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

    // Breakdown
    this.breakdownDataLoaded = false;
    this.apiService.reports.usageObjectivesBreakdown(this.sessionId!).subscribe(res => {
      if (res.success){
        this.breakdownDataLoaded = true;
        this.breakdownData = res.data;
        
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

  private progressFormat(progress: string): string{
    const nProgress = Number.parseFloat(progress);

    if (isNaN(nProgress))
      return progress;

    return (nProgress * 100).toString() + '%';
  }

}