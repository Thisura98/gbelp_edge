import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-userstatus',
  template: `
    <div class="dashboard-userstatus noselect" (click)="toggleExpanded()" #dashboardUserStatus>
      <div>
        <div class="dashboard-us-name">{{userName}}</div>
        <div class="dashboard-us-role">{{userRole | titlecase}}</div>
      </div>
      <img class="dashboard-us-uimg" src="{{userImg}}"/>
    </div>

    <div *ngIf="expanded" class="dashboard-userstatus-menu" #dashboardUserStatusMenu>
      <div class="dashboard-us-mitem" (click)="logoutPressed()">Logout</div>
      <div class="dashboard-us-mitem" (click)="goToDashboardPressed()">Go to Dashboard</div>
      <div class="dashboard-us-mitemsep"></div>
      <div class="dashboard-us-mitem">Chats <img src="assets/dashboard/ico_chat.png"></div>
      <div class="dashboard-us-mitem">Audio Streaming <img src="assets/dashboard/ico_mic.png"></div>
    </div>
  `,
  styleUrls: ['./userstatus.component.css']
})
export class UserstatusComponent implements OnInit {

  expanded = false

  get userName(): string | null{
    return this.getUser().user.userName ?? "not set";
  }

  get userRole() : string | null{
    return this.getUser().user.userTypeName ?? "not set";
  }

  get userImg() : string | null{
    return "assets/dashboard/userplaceholder.png"
  }

  @ViewChild('dashboardUserStatus', {static: true})
  private userStatusElement: ElementRef | undefined;

  @ViewChild('dashboardUserStatusMenu', {static: true})
  private userStatusDropdown: ElementRef | undefined;

  constructor(
    private router: Router,
    private userService: UserService,
    private utilsService: UtilsService,
    private dialogService: DialogService
  ) {

    this.utilsService.documentClickedTarget.subscribe((target) => {
      this.handleTap(target);
    });

  }

  ngOnInit(): void {
  }

  private getUser(){
    let obj = this.userService.getUserAndToken();
    return obj;
  }

  toggleExpanded(){
    this.expanded = !this.expanded;
  }

  handleTap(target: Element | Document | Window){
    if (!this.expanded)
        return;

      const insideUserStatus = this.userStatusElement?.nativeElement.contains(target);
      const insideMenu = this.userStatusDropdown?.nativeElement.contains(target)

      if (insideUserStatus || insideMenu){
        return;
      }

      this.expanded = false;
  }

  goToDashboardPressed(){
    this.router.navigate(['dashboard']);
  }

  logoutPressed(){
    this.dialogService.showYesNo('Confirm Logout', 'Are you sure you want to logout?', () => {
      this.userService.clearCredentials();
      window.location.reload();
    });
  }

}
