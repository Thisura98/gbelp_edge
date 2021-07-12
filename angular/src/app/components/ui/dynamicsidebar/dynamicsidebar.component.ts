import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

export interface DynamicSidebarItem{
  name: string
  sel: boolean
  /**
   * Normal image
   */
  n: string
  /**
   * Selected image
   */
  s: string
}

@Component({
  selector: 'app-dynamicsidebar',
  template: `
  <div class="dyn-sidebar-container" 
    [style.height]="containerHeightProp" 
    [style.padding]="containerPadding" 
    [style.borderRadius]="containerBorderRadius"
    [style.minWidth]="containerMinWidth"
  >
    <div class="dyn-sidebar-expand-btn" *ngIf="isScreenSmall" (click)="toggleExpand()">
      <img src="assets/common/hamburger.png">
    </div>
    <div class="dyn-sidebar-item-container" *ngIf="isItemsExpanded">
      <div class="dyn-sidebar-back-item clickable" (click)="onBackClicked()">
        <img src="assets/common/chevronleft.png"> Back
      </div>
      <div class="dyn-sidebar-item clickable" 
        *ngFor="let item of items" 
        [ngClass]="{dynSidebarItemSelected: item.sel}"
      >
        <img class="dyn-sidebar-item-img" src="{{item.sel ? item.s : item.n}}">
        <div>{{item.name}}</div>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./dynamicsidebar.component.css']
})
export class DynamicsidebarComponent implements OnInit {

  @Input()
  items: DynamicSidebarItem[] = []

  @Output()
  onClick = new EventEmitter<DynamicSidebarItem>();

  isScreenSmall = false;
  isItemsExpanded = true;

  get containerHeightProp(): String{
    if (this.isScreenSmall){
      if (this.isItemsExpanded)
        return "auto";
      else 
        return "70px";
    }
    else{
      return "100vh";
    }
  }

  get containerBorderRadius(): string{
    if (this.isScreenSmall && this.isItemsExpanded)
      return "10px";
    return "";
  }

  get containerPadding(): string{
    if (this.isScreenSmall && this.isItemsExpanded)
      return "0 0 20px 0";
    return "";
  }

  get containerMinWidth(): string{
    if ((this.isScreenSmall && this.isItemsExpanded) || !this.isScreenSmall)
      return "70px";
    return "";
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private location: Location
  ) {

  }

  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width:800px)']).subscribe((state) => {
      if (state.matches){
        console.log('(max-width:800px) matches');
        this.isScreenSmall = true;
        this.isItemsExpanded = false
      }
      else{
        console.log('(max-width:800px) not matching');
        this.isScreenSmall = false;
        this.isItemsExpanded = true;
      }
    })
  }

  onItemClicked(item: DynamicSidebarItem){
    this.onClick?.emit(item);
  }

  toggleExpand(){
    this.isItemsExpanded = !this.isItemsExpanded
  }

  onBackClicked(){
    this.location.back();
  }

}
