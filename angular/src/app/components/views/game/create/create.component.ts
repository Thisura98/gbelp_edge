import { Component, OnInit } from '@angular/core';
import { DynamicSidebarItem } from 'src/app/components/ui/dynamicsidebar/dynamicsidebar.component';
import { getGameSidebarItems } from 'src/app/constants/constants';


@Component({
  selector: 'app-game-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class GameCreateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
