import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

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
  s: string,
  /**
   * Path to linked component
   */
  path: string | undefined
  /**
   * Sub Items
   */
  subItems: DynamicSidebarItem[] | undefined
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
        (click)="onItemClicked(item)"
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

  /**
   * Keys (and values) filtered out from the query parameters
   * when clicking on sidebar items. 
   */
  private readonly strippedParameters: string[] = ['levelId'];

  @Input()
  items: DynamicSidebarItem[] = []

  @Input()
  /**
   * If true, will use paths from items array to navigate on click.
   */
  followPath: boolean = true

  @Input()
  /**
   * If true, forwards current query params to new path
   */
  inheritParams: boolean = true

  @Output()
  onClick = new EventEmitter<DynamicSidebarItem>();

  @Output()
  /**
   * Event that handles back event. If provided,
   * default back action will not occur.
   */
  onBack = new EventEmitter();

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
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width:800px)']).subscribe((state) => {
      if (state.matches){
        // console.log('(max-width:800px) matches');
        this.isScreenSmall = true;
        this.isItemsExpanded = false
      }
      else{
        // console.log('(max-width:800px) not matching');
        this.isScreenSmall = false;
        this.isItemsExpanded = true;
      }
    })
  }

  onItemClicked(item: DynamicSidebarItem){
    console.log(JSON.stringify(item));

    if (item.sel)
      return;

    if (this.onClick.observers.length == 0 && this.followPath && item.path != undefined){
      if (this.inheritParams){
        this.navigateInheritingParams(item)
      }
      else{
        this.router.navigate([item.path]);
      }
    }
    else{
      this.onClick?.emit(item);
    }
  }

  toggleExpand(){
    this.isItemsExpanded = !this.isItemsExpanded
  }

  onBackClicked(){
    if (this.onBack.observers.length > 0)
      this.onBack.emit();
    else
      this.location.back();
  }

  private navigateInheritingParams(item: DynamicSidebarItem){
    this.activatedRoute.queryParams.subscribe((params) => {
      let finalParams: { [key: string]: any } = {};

      for (let key in params){
        if (!this.strippedParameters.includes(key))
          finalParams[key] = params[key];
      }

      this.router.navigate([item.path], {
        queryParams: finalParams
      })
    });
  }

}
