import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DynamicSidebarItem } from "src/app/components/ui/dynamicsidebar/dynamicsidebar.component";
import { getGroupSidebarItems } from "src/app/constants/constants";
import { ApiService } from "src/app/services/api.service";
import { DialogService } from "src/app/services/dialog.service";
import { UserService } from "src/app/services/user.service";
import { UtilsService } from "src/app/services/utils.service";
import { UserGroup } from "../../../../../../../commons/src/models/groups";
import { GameSession } from "../../../../../../../commons/src/models/session";

@Component({
  templateUrl: './report.component.html',
  styleUrls: [
    './report.component.css',
    './common/report.common.css'
  ]
})
export class GroupReportsComponent implements OnInit{
  
  get sidebarItems(): DynamicSidebarItem[]{
    return getGroupSidebarItems('Reports');
  }

  get selectedSession(): GameSession | undefined{
    if (this.selectedSessionIndex == undefined)
      return undefined;
    return this.sessions[this.selectedSessionIndex!];
  }

  groupId: string | undefined;
  group: UserGroup | undefined;
  sessions: GameSession[] = [];
  selectedSessionIndex: number | undefined;

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
      this.loadData();
    });
  }

  private loadData(){
    this.apiService.getGroup(this.groupId!).subscribe(response => {
      if (!response.success){
        const msg = response.description;
        this.dialogService.showDismissable("Data Load Error", msg);

        // Membership error in API.
        if (response.code == 201)
          this.router.navigate(['/dashboard/f/groups']);
        return;
      }
      
      this.group = response.data;
    });
  }
  
}