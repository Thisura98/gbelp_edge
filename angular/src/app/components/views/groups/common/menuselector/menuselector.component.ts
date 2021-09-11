import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-groups-menuselector',
  template: `
  <div class="ds-menuselector noselect">
    <div class="ds-ms-orb"><img src="assets/groups/ico_groups.png"></div>
    <div class="ds-ms-title" [class.dark-mode]="darkMode">{{title}}</div>
  </div>
  `,
  styleUrls: ['./menuselector.component.css']
})
export class GroupsMenuselectorComponent {

  @Input()
  title: string = ''

  @Input()
  darkMode: boolean = false;

  constructor() {
  }


}
