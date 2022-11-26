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

  getPercentage(objective: ProgressfulGameObjective): string{
    const progress = Math.min(objective.progress / objective.max_value) * 100;
    return Math.round(progress).toFixed() + "%";
  }
}