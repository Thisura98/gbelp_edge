import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { DynamicSidebarItem } from "src/app/components/ui/dynamicsidebar/dynamicsidebar.component";
import { ApiService } from "src/app/services/api.service";
import { DialogService } from "src/app/services/dialog.service";
import { UserService } from "src/app/services/user.service";
import { UtilsService } from "src/app/services/utils.service";
import { GameEntry } from "../../../../../../../../commons/src/models/game/game";
import { UserGroup } from "../../../../../../../../commons/src/models/groups";
import { GameSession } from "../../../../../../../../commons/src/models/session";

@Component({
  templateUrl: './available.component.html',
  styleUrls: [
    './available.component.css',
    './../common/report.common.css',
    './../../common/group.commonstyles.css'
  ]
})
export class GroupReportsAvailableComponent implements OnInit{

  get sidebarItems(): DynamicSidebarItem[]{
    return [];
  }

  private groupId: string | undefined;
  private sessionId: string | undefined;
  group: UserGroup | undefined;
  session: GameSession | undefined;
  game: GameEntry | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private apiService: ApiService,
    private dialogService: DialogService,
    private utilsService: UtilsService
  ){}

  ngOnInit(){
    this.userService.routeOutIfLoggedOut();
    this.activatedRoute.queryParamMap.subscribe(map => {
      this.groupId = map.get('groupId') ?? undefined;
      this.sessionId = map.get('sessionId') ?? undefined;
      this.loadData();
    });
  }

  private loadData(){
    forkJoin([
      this.apiService.getSession(this.sessionId!),
      this.apiService.getGroup(this.groupId!)
    ]).subscribe(values => {
      
      const sessionResponse = values[0];
      const groupResponse = values[1];

      // Check Membership errors.
      if (!groupResponse.success){
        const msg = groupResponse.description;
        this.dialogService.showDismissable("Data Load Error", msg);
        if (groupResponse.code == 201)
          this.router.navigate(['/dashboard/f/groups']);
        return;
      }

      // Check session errors.
      if (!sessionResponse.success){
        const msg = sessionResponse.description;
        this.dialogService.showDismissable("Session Load Error", msg);
        return;
      }

      this.group = groupResponse.data;
      this.session = sessionResponse.data;
      this.loadGameEntry();
    })
  }

  private loadGameEntry(){
    const gameId = this.session!.game_entry_id;
    this.apiService.getGame(gameId).subscribe(response => {
      if (!response.success){
        const msg = response.description;
        this.dialogService.showDismissable("Game Load Error", msg);
        return;
      }

      this.game = response.data.entry;
    });
  }

}