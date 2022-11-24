import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PRIMARY_OUTLET, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { UserTypeNames } from '../../../../../../../../commons/src/models/user';

@Component({
  selector: 'app-dashboard-menuselector',
  template: `
  <div class="ds-menuselector noselect" (click)="toggleExpanded()" #dsMenuSelector>
    <div class="ds-ms-orb"><img src="{{menuIcon}}"></div>
    <div class="ds-ms-title">{{menuName | titlecase }}</div>
    <div class="ds-ms-drop"><img src="assets/common/dropdownblue.png"></div>
  </div>

  <div *ngIf="expanded" class="ds-selector-menu" #dsMenuSelectorMenu>
    <div class="ds-ms-mitem" (click)="overviewClicked()">Overview</div>
    <div *ngIf="canEditGames" class="ds-ms-mitem" (click)="gamesClicked()">Games</div>
    <div *ngIf="canEditGames" class="ds-ms-mitem" (click)="templatesClicked()">Templates</div>
    <div class="ds-ms-mitem" (click)="groupsClicked()">Groups</div>
  </div>
  `,
  styleUrls: ['./menuselector.component.css']
})
export class MenuselectorComponent implements OnInit {

  expanded = false;

  menuName: string = "";
  menuIcon: string = "";
  private userType: String = "";
  canEditGames = false;

  @ViewChild('dsMenuSelector')
  menuSelector: ElementRef | undefined;

  @ViewChild('dsMenuSelectorMenu')
  menuSelectorMenu: ElementRef | undefined;

  constructor(
    private utilsService: UtilsService,
    private userService: UserService,
    private router: Router
  ) {
    this.utilsService.documentClickedTarget.subscribe((target) => {
      this.handleTap(target);
    });

    const userTypeName = this.userService.getUserAndToken().user.userTypeName;
    this.canEditGames = userTypeName == UserTypeNames.creator || userTypeName == UserTypeNames.admin;
  }

  ngOnInit(): void {
    this.findDetails();
  }

  handleTap(target: Element | Document | Window){
    if (!this.expanded)
        return;

      const insideSelector = this.menuSelector?.nativeElement.contains(target);
      const insideMenu = this.menuSelector?.nativeElement.contains(target)

      if (insideSelector || insideMenu){
        return;
      }

      this.expanded = false;
  }

  findDetails(){
    const result = this.router.parseUrl(this.router.url);
    const segments =  result.root.children[PRIMARY_OUTLET].segments;
    this.menuName = segments[segments.length - 1].path;
    this.userType = segments[1].path;

    switch(this.menuName){
      case "games":
      case "templates": 
        this.menuIcon = "assets/dashboard/menu_games.png";
      break;

      case "overview": 
        this.menuIcon = "assets/dashboard/menu_overview.png";
      break;

      case "groups": 
        this.menuIcon = "assets/dashboard/menu_group.png";
      break;
    }
  }

  toggleExpanded(){
    this.expanded = !this.expanded;
  }

  private getNavPath(destination: String): String{
    return `dashboard/${this.userType}/${destination}`;
  }
  
  overviewClicked(){
    this.router.navigate([this.getNavPath('overview')]).finally(() => {
      this.findDetails();
    });
  }

  gamesClicked(){
    this.router.navigate([this.getNavPath('games')]).finally(() => {
      this.findDetails();
    });
  }

  groupsClicked(){
    this.router.navigate([this.getNavPath('groups')]).finally(() => {
      this.findDetails();
    });
  }

  templatesClicked(){
    this.router.navigate([this.getNavPath('templates')]).finally(() => {
      this.findDetails();
    });
  }


}
