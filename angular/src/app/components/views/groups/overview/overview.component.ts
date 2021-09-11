import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DynamicSidebarItem } from "src/app/components/ui/dynamicsidebar/dynamicsidebar.component";
import { getGroupSidebarItems } from "src/app/constants/constants";
import { ApiService } from "src/app/services/api.service";
import { DialogService } from "src/app/services/dialog.service";
import { UserService } from "src/app/services/user.service";
import { UserGroup, UserGroupComposition } from "../../../../../../../commons/src/models/groups";

@Component({
  templateUrl: './overview.component.html',
  styleUrls: [
    './overview.component.css',
    '../common/group.commonstyles.css'
  ]
})
export class GroupOverviewComponent implements OnInit{

  get sidebarItems(): DynamicSidebarItem[]{
    return getGroupSidebarItems('Overview');
  }

  userName: string | undefined;
  groupId: string | undefined;
  group: UserGroup | undefined;
  composition: UserGroupComposition[] = [];

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private apiService: ApiService,
    private dialogService: DialogService
  ){

  }

  ngOnInit(){
    this.userService.routeOutIfLoggedOut();
    this.activatedRoute.queryParamMap.subscribe(map => {
      this.groupId = map.get('groupId') ?? undefined;
      this.loadData();
    });
  }

  handleBack(){
    this.location.back();
  }

  /* Private Methods */
  
  private loadData(){
    this.userName = this.userService.getUserAndToken().user.userName ?? undefined;

    // Get the group object,
    // then the group's composition stats
    this.apiService.getGroup(this.groupId!).subscribe(response => {
      if (!response.success){
        const msg = response.description;
        this.dialogService.showDismissable("Data Load Error", msg);

        // Membership error in API.
        if (response.code == 201)
          this.router.navigate(['/dashboard']);
        return;
      }
      
      this.apiService.getGroupComposition(this.groupId!).subscribe(composition => {

        // Membership error in API.
        if (response.code == 201)
          this.router.navigate(['/dashboard']);

        this.setData(response.data, composition.data);
      });
    });
  }

  private setData(group: UserGroup, composition: UserGroupComposition[]){
    this.group = group;
    this.composition = composition;
  }
}