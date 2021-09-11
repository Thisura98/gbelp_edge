import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DynamicSidebarItem } from "src/app/components/ui/dynamicsidebar/dynamicsidebar.component";
import { getGroupSidebarItems } from "src/app/constants/constants";
import { UserService } from "src/app/services/user.service";

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

  groupId: string | undefined;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
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
    // todo
    // check if user belongs to group.
    console.log("Group ID for Group Overview!", this.groupId);
  }
}