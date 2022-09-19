import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DynamicSidebarItem } from "src/app/components/ui/dynamicsidebar/dynamicsidebar.component";
import { getGroupSidebarItems } from "src/app/constants/constants";
import { ApiService } from "src/app/services/api.service";
import { DialogService } from "src/app/services/dialog.service";
import { UserService } from "src/app/services/user.service";
import { StatusCodes } from "../../../../../../../commons/src/constants";
import { UserGroup, UserGroupComposition } from "../../../../../../../commons/src/models/groups";
import { UserGroupMemberData } from "../../../../../../../commons/src/models/groups/member";

@Component({
  templateUrl: './users.component.html',
  styleUrls: [
    './users.component.css',
    './../common/group.commonstyles.css'
  ],
  providers: [
    {provide: DatePipe, useClass: DatePipe}
  ]
})
export class GroupUsersComponent implements OnInit{

  get sidebarItems(): DynamicSidebarItem[]{
    return getGroupSidebarItems('Users');
  }

  selection: { [key: string] : boolean } = {};

  get selectionCount(): number{
    let count = 0;
    for (let key in this.selection){
      count = this.selection[key] ? (count + 1) : count;
    }
    return count;
  }
  
  private groupId: string | undefined;
  group: UserGroup | undefined;
  loadingUserData: boolean = false;
  searchTerm: string | undefined = undefined;
  data: UserGroupMemberData | undefined;
  composition: UserGroupComposition[] | undefined;

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
      this.loadUsers();
      this.loadComposition();
    });
  }

  private loadUsers(){
    this.loadingUserData = true;
    this.apiService.group.getGroupMembers(this.groupId!, this.searchTerm).subscribe(response => {
      this.loadingUserData = false;

      if (response.success){
        this.data = response.data;
      }
      else{
        this.handleLoadError(response.description);
      }
    }, (err) => this.handleLoadError(err))
  }
  
  private loadComposition(){
    this.apiService.group.getGroupComposition(this.groupId!).subscribe(response => {

      // Membership error in API.
      if (response.code == StatusCodes.membershipError)
        this.router.navigate(['/dashboard/f/groups']);

      this.composition = response.data;
    });
  }

  private handleLoadError(msg: any){
    let cMsg = (typeof msg == 'string') ? msg : JSON.stringify(msg);
    this.dialogService.showDismissable('Data Load Error', cMsg);
  }
  
}
 