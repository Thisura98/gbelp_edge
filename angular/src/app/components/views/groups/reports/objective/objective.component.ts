import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DynamicSidebarItem } from "src/app/components/ui/dynamicsidebar/dynamicsidebar.component";
import { ApiService } from "src/app/services/api.service";
import { DialogService } from "src/app/services/dialog.service";
import { UserService } from "src/app/services/user.service";
import { UtilsService } from "src/app/services/utils.service";
import { GameListing } from "../../../../../../../../commons/src/models/game/game";
import { UserGroup } from "../../../../../../../../commons/src/models/groups";
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
  progressByObjectiveLoaded = false;
  breakdownDataLoaded = false;

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
      // this.loadData();
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

}