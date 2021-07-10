import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-dashboard-menuselector',
  template: `
  <div class="ds-menuselector" (click)="toggleExpanded()" #dsMenuSelector>
    <div class="ds-ms-orb"><img src="assets/dashboard/menu_overview.png"></div>
    <div class="ds-ms-title">Overview</div>
    <div class="ds-ms-drop"><img src="assets/common/dropdownblue.png"></div>
  </div>

  <div *ngIf="expanded" class="ds-selector-menu" #dsMenuSelectorMenu>
    <div class="ds-ms-mitem">Overview</div>
    <div class="ds-ms-mitem">Games</div>
    <div class="ds-ms-mitem">Groups</div>
  </div>
  `,
  styleUrls: ['./menuselector.component.css']
})
export class MenuselectorComponent implements OnInit {

  expanded = false

  @ViewChild('dsMenuSelector')
  menuSelector: ElementRef | undefined;

  @ViewChild('dsMenuSelectorMenu')
  menuSelectorMenu: ElementRef | undefined;

  constructor(
    private utilsService: UtilsService
  ) {
    this.utilsService.documentClickedTarget.subscribe((target) => {
      this.handleTap(target);
    });
  }

  ngOnInit(): void {
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

  toggleExpanded(){
    this.expanded = !this.expanded;
  }

}
