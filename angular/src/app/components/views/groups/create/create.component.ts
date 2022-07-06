import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicSidebarItem } from 'src/app/components/ui/dynamicsidebar/dynamicsidebar.component';
import { getGroupSidebarItems } from 'src/app/constants/constants';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create.component.html',
  styleUrls: [
    './create.component.css',
    '../common/group.commonstyles.css'
  ]
})
export class GroupCreateComponent implements OnInit {
  
  get sidebarItems(): DynamicSidebarItem[]{
    // return getGroupSidebarItems('Overview');
    return [];
  }

  groupName: string = '';
  groupDescription: string = '';
  isSaving: boolean = false;

  constructor(
    private location: Location,
    private router: Router,
    private dialogService: DialogService,
    private userService: UserService,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
  }

  handleBack(){
    this.router.navigate(['/dashboard/teacher/groups']);
  }

  createBtnClicked(){
    this.isSaving = true;

    if (!this.doesValidate())
      return;

    this.doesValidate().then(validated => {
      if (!validated)
        return;

      this.createGroup();
    });

    
  }

  /**
   * Sends Create group API call, and 
   * redirects to that group on success.
   */
  private createGroup(){
    const userId = this.userService.getUserAndToken().user.userId;

    if (userId == null){
      this.dialogService.showSnackbar("User ID to take membership of group empty");
      return;
    }

    const loggedUserId = [userId];
    this.apiService.group.createGroup(
      this.groupName, this.groupDescription, '', null, loggedUserId
    ).subscribe(response => {

      if (!response.success){
        const msg = response.description ?? "Unknown Error";
        this.dialogService.showDismissable("Error Creating Group", msg);
        return;
      }

      const route = '/groups/overview';
      this.dialogService.showSnackbar("Group Created Successfully!");

      this.router.navigate([route], {
        queryParams: {
          groupId: response.data.group_id!
        },
        replaceUrl: true
      });
      
    });
  }

  private doesValidate(): Promise<boolean>{
    if (this.groupName.trim().length == 0){
      this.dialogService.showDismissable("Validation Error", "Please enter valid group name");
      return Promise.reject();
    }

    if (this.groupDescription.trim().length == 0){
      return new Promise<boolean>((resolve, reject) => {
        this.dialogService.showYesNo(
          "Confirmation", 
          "Group Description is Empty. Do you want to continue? It can be changed later.", 
          () => {
            resolve(true);
          }, 
          () => {
            reject();
          })
      });
    }

    return Promise.resolve(true);
  }

}
