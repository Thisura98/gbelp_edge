import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PRIMARY_OUTLET, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-dashboard-menuselector',
  template: `
  <div class="ds-menuselector" (click)="toggleExpanded()" #dsMenuSelector>
    <div class="ds-ms-orb"><img src="assets/dashboard/menu_overview.png"></div>
    <div class="ds-ms-title">{{menuName | titlecase }}</div>
    <div class="ds-ms-drop"><img src="assets/common/dropdownblue.png"></div>
  </div>

  <div *ngIf="expanded" class="ds-selector-menu" #dsMenuSelectorMenu>
    <div class="ds-ms-mitem" (click)="overviewClicked()">Overview</div>
    <div class="ds-ms-mitem" (click)="gamesClicked()">Games</div>
    <div class="ds-ms-mitem" (click)="groupsClicked()">Groups</div>
  </div>
  `,
  styleUrls: ['./menuselector.component.css']
})
export class MenuselectorComponent implements OnInit {

  expanded = false

  menuName: string = "";
  private userType: String = ""

  @ViewChild('dsMenuSelector')
  menuSelector: ElementRef | undefined;

  @ViewChild('dsMenuSelectorMenu')
  menuSelectorMenu: ElementRef | undefined;

  constructor(
    private utilsService: UtilsService,
    private router: Router
  ) {
    this.utilsService.documentClickedTarget.subscribe((target) => {
      this.handleTap(target);
    });
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



}
