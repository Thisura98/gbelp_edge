import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DynamicSidebarItem } from "src/app/components/ui/dynamicsidebar/dynamicsidebar.component";
import { NextSignInAction, QueryKey } from "src/app/constants/constants";
import { ApiService } from "src/app/services/api.service";
import { DialogService } from "src/app/services/dialog.service";
import { UserService } from "src/app/services/user.service";
import { UserGroup } from "../../../../../../../commons/src/models/groups";

@Component({
  templateUrl: './join.component.html',
  styleUrls: [
    './join.component.css',
    './../common/group.commonstyles.css'
  ]
})
export class GroupJoinComponent implements OnInit{

  private encryptedGroupId: string | undefined;
  group: UserGroup | undefined;
  isLoggedIn: boolean = false;
  isLoading: boolean = true;

  /// Will be true if 'autoAdd=true' is present in the query string.
  isInAutoAddMode: boolean = false;

  get sidebarItems(): DynamicSidebarItem[]{
    // return getGroupSidebarItems('Overview');
    return [];
  }

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private apiService: ApiService,
    private dialogService: DialogService,
    private userService: UserService,
  ){

  }

  ngOnInit(){
    this.isLoggedIn = this.userService.getIsLoggedIn();
    this.activateRoute.params.subscribe(data => {
      this.encryptedGroupId = data.groupId;

      // Check is in Auto Add mode?
      this.activateRoute.queryParamMap.subscribe(map => {
        if (map.has('autoAdd'))
          this.isInAutoAddMode = map.get('autoAdd')?.toLowerCase() == 'true';

        this.loadData()
      })
    })
  }
  
  handleBack(){
    // todo
  }

  cancelTapped(){
    this.router.navigate(['/']);
  }

  acceptTapped(){
    if (this.userService.getIsLoggedIn()){
      this.addUserToGroupAndNavigate();
    }
    else{
      // todo
      this.dialogService.showYesNo(
        "Confirmation",
        "It looks like you have not logged in yet. Do you have an existing with EDGE?",
        () => {
          // YES -> Login
          this.goToLogin();
        },
        () => {
          // NO -> Register
          this.goToRegister();
        }
      )
    }
  }

  private loadData(){
    this.isLoading = true;
    this.apiService.getGroupAnonymously(this.encryptedGroupId!).subscribe(response => {
      if (!response.success){
        const msg = response.description ?? "Could not fetch details";
        this.dialogService.showDismissable("Invitation Corrupted", msg);
        return;
      }

      this.group = response.data;
      this.isLoading = false;
      this.handleAutoAddIfNeeded();
    });
  }

  private handleAutoAddIfNeeded(){
    if (!this.isInAutoAddMode)
      return;

    this.addUserToGroupAndNavigate();
  }

  private addUserToGroupAndNavigate(){
    this.apiService.joinGroupWith(this.encryptedGroupId!).subscribe(result => {
      if (!result.success){
        const msg = result.description ?? "Unknown Error";
        this.dialogService.showDismissable("Join Error", msg);
        return;
      }

      const groupId = result.data.groupId;
      const path = `/groups/overview`;

      this.dialogService.showSnackbar("Welcome to the new group!");
      this.router.navigate([path], {
        queryParams: {
          groupId: groupId
        }
      });
    });
  }

  private goToLogin(){
    let q: any = {};
    q[QueryKey.nextAction] = NextSignInAction.joinGroupK;
    q[QueryKey.nextActionKey] = this.encryptedGroupId!;
    this.router.navigate(['/login'], {
      queryParams: q
    });
  }

  private goToRegister(){
    let q: any = {};
    q[QueryKey.nextAction] = NextSignInAction.joinGroupK;
    q[QueryKey.nextActionKey] = this.encryptedGroupId!;
    this.router.navigate(['/register'], {
      queryParams: q
    });
  }
}