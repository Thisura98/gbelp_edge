import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { ProgressfulGameGuidanceTracker } from "../../../../../../../../commons/src/models/game/trackers";

@Component({
  selector: 'app-player-panel-guidance',
  templateUrl: './guidance.panel.component.html',
  styleUrls: [
    './guidance.panel.component.css'
  ]
})
export class PlayerGuidancePanelComponent implements OnInit{

  @Input()
  guidance: ProgressfulGameGuidanceTracker | undefined;

  @Output()
  dismissGuidance = new EventEmitter();

  get username(): string | null{
    return this.userService.getUserAndToken().user.userName;
  }

  constructor(
    private userService: UserService
  ){}
  
  ngOnInit(){
  }
}