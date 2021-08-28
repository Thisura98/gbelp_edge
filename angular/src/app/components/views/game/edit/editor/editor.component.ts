import { Component, OnInit } from '@angular/core';
import { getGameSidebarItems } from 'src/app/constants/constants';
import { DynamicSidebarItem } from 'src/app/components/ui/dynamicsidebar/dynamicsidebar.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: [
    './editor.component.css',
    '../../common/game.commonstyles.css'
  ]
})
export class GameEditorComponents implements OnInit {

  /**
   * Left sidebar
   */
   get sidebarItems(): DynamicSidebarItem[]{
    return getGameSidebarItems('Editor');
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
