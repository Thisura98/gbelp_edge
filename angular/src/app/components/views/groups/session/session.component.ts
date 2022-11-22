import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router";
import { DynamicSidebarItem } from "src/app/components/ui/dynamicsidebar/dynamicsidebar.component";
import { GroupsSessionTable } from "src/app/components/ui/groups/session-data-table/groups.sessiontable";
import { getGroupSidebarItems } from "src/app/constants/constants";
import { ApiService } from "src/app/services/api.service";
import { DialogService } from "src/app/services/dialog.service";
import { UserService } from "src/app/services/user.service";
import { StatusCodes } from "../../../../../../../commons/src/constants";
import { UserGroup } from "../../../../../../../commons/src/models/groups";
import { GameSessionWithExtensions } from "../../../../../../../commons/src/models/session";

@Component({
  templateUrl: './session.component.html',
  styleUrls: [
    './session.component.css',
    './../common/group.commonstyles.css'
  ],
  providers: [
    {provide: DatePipe, useClass: DatePipe}
  ]
})
export class GroupSessionComponent implements OnInit{
 
  get sidebarItems(): DynamicSidebarItem[]{
    return getGroupSidebarItems('Sessions');
  }

  get today(): string | null{
    const date = new Date();
    return this.datePipe.transform(date, 'dd MMMM yyyy');
  }
  
  private groupId: string | undefined;
  group: UserGroup | undefined;
  sessions: GameSessionWithExtensions[] = [];
  selectedSessionIndex: number | undefined;

  @ViewChild(GroupsSessionTable)
  sessionTable: GroupsSessionTable | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private apiService: ApiService,
    private dialogService: DialogService,
    private datePipe: DatePipe,
  ){}

  ngOnInit(){
    this.userService.routeOutIfLoggedOut();
    this.activatedRoute.queryParamMap.subscribe(map => {
      this.groupId = map.get('groupId') ?? undefined;
      this.loadData();
    });
  }

  navigateToSessionCreate(){
    this.router.navigate(['groups/sessions/create']);
  }

  private loadData(){
    this.apiService.group.getGroup(this.groupId!).subscribe(response => {
      if (!response.success){
        const msg = response.description;
        this.dialogService.showDismissable("Data Load Error", msg);

        // Membership error in API.
        if (response.code == StatusCodes.membershipError)
          this.router.navigate(['/dashboard/f/groups']);
        return;
      }
      
      this.group = response.data;

      this.loadSessions();
    });
  }

  private loadSessions(){
    this.apiService.session.getSessionsByGroup(this.groupId!, []).subscribe(response => {
      if (!response.success){
        this.dialogService.showDismissable("Session Data Error", response.description ?? "Unknown error");
        return
      }

      this.sessions = response.data;
      this.sessionTable!.setRawData(this.sessions, true);
    })
  }

}