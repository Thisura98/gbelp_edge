import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DynamicSidebarItem } from "src/app/components/ui/dynamicsidebar/dynamicsidebar.component";
import { getGroupSidebarItems } from "src/app/constants/constants";
import { ApiService } from "src/app/services/api.service";
import { DialogService } from "src/app/services/dialog.service";
import { UserService } from "src/app/services/user.service";
import { UtilsService } from "src/app/services/utils.service";
import { StatusCodes } from "../../../../../../../commons/src/constants";
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

  get totalUserCount(): number{
    const c = this.composition.map(v => v.count).reduce((v1, v2) => {
      return v1 + v2
    });
    return c;
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
    private dialogService: DialogService,
    private utilsService: UtilsService
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
    this.router.navigate(['/dashboard/f/groups']);
  }

  leaveGroupPressed(event: Event){
    event.preventDefault();

    this.dialogService.showYesNo(
      "Confirm Leave", 
      "Are you sure you want to leave this group?",
      () => {
        this.leaveGroupConfirmed();
      }
    );
  }

  deleteGroupPressed(event: Event){
    event.preventDefault();

    this.dialogService.showYesNo(
      "Confirm Deletion", 
      "Are you sure you want to delete this group?",
      () => {
        this.deleteGroupConfirmed();
      }
    );
  }

  copyInvitationPressed(){
    const url = this.utilsService.urlFromPath(this.group!.invite_link!);
    this.utilsService.copyToClipboard(url);
    this.dialogService.showSnackbar("Invite Link Copied");
  }

  /* Private Methods */
  
  private loadData(){
    this.userName = this.userService.getUserAndToken().user.userName ?? undefined;

    // Get the group object,
    // then the group's composition stats
    this.apiService.group.getGroup(this.groupId!).subscribe(response => {
      if (!response.success){
        const msg = response.description;
        this.dialogService.showDismissable("Data Load Error", msg);

        // Membership error in API.
        if (response.code == StatusCodes.membershipError)
          this.router.navigate(['/dashboard']);
        return;
      }
      
      this.apiService.group.getGroupComposition(this.groupId!).subscribe(composition => {

        // Membership error in API.
        if (response.code == StatusCodes.membershipError)
          this.router.navigate(['/dashboard']);

        this.setData(response.data, composition.data);
      });
    });
  }

  private setData(group: UserGroup, composition: UserGroupComposition[]){
    this.group = group;
    this.composition = composition;
  }

  private leaveGroupConfirmed(){
    const userId = this.userService.getUserAndToken().user.userId;
    if (userId == null)
      this.dialogService.showDismissable("Error", "User ID is empty, cannot leave from group");

    this.apiService.group.removeFromGroup(this.groupId!, userId!).subscribe(response => {
      if (!response.success){
        const msg = response.description ?? "Unknown error occured while leaving.";
        this.dialogService.showDismissable("Processing Error", msg);
        return;
      }

      // Acknowledge action then,
      // navigate to dashboard and remove this group's link
      // from history.
      this.dialogService.showSnackbar("You have succesfully left this group!");
      this.router.navigate(['/dashboard'], {
        replaceUrl: true
      });
    });
  }

  private deleteGroupConfirmed(){
    this.apiService.group.deleteGroup(this.groupId!).subscribe(response => {
      if (!response.success){
        const msg = response.description ?? "Unknown error occured while deleting group";
        this.dialogService.showDismissable("Processing Error", msg);
        return;
      }

      // Acknowledge action then,
      // navigate to dashboard and remove this group's link
      // from history.
      this.dialogService.showSnackbar("You have succesfully deleted the group!");
      this.router.navigate(['/dashboard/f/groups'], {
        replaceUrl: true
      });
    });
  }
}