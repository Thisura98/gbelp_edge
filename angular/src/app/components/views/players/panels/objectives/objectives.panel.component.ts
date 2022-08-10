import { Component, Input, OnInit } from "@angular/core";
import { ProgressfulGameObjective } from "../../../../../../../../commons/src/models/game/objectives";

@Component({
  selector: 'app-player-panel-objectives',
  templateUrl: './objectives.panel.component.html',
  styleUrls: [
    './objectives.panel.component.css'
  ]
})
export class PlayerObjectivesPanelComponent implements OnInit{

  @Input()
  objectives: ProgressfulGameObjective[] = []

  constructor(){}
  
  ngOnInit(){
  }
}