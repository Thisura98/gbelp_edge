import { Component, OnInit } from '@angular/core';
import { DynamicSidebarItem } from 'src/app/components/ui/dynamicsidebar/dynamicsidebar.component';
import { getGameSidebarItems } from 'src/app/constants/constants';

@Component({
  selector: 'app-game-edit-resources',
  templateUrl: './resources.component.html',
  styleUrls: [
    './resources.component.css',
    '../../common/game.commonstyles.css'
  ],
})
export class GameEditResourcesComponent implements OnInit {
  
  get sidebarItems(): DynamicSidebarItem[]{
    return getGameSidebarItems('Resources');
  }

  constructor() { }

  ngOnInit(): void {
  }

}
