import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Observable } from "rxjs";
import { GameSessionState, GameSessionWithExtensions } from "../../../../../../../commons/src/models/session";
import { GroupsSessionDataAdapter } from "./groups.sessiontable.adapter";

export enum Actions{
  duplicate = 'duplicate',
  stop = 'stop',
  // eye icon
  join = 'join',
  edit = 'edit',
  delete = 'delete',
  reports = 'reports'
}

export interface GroupsSessionTableRow{
  start_time: string
  end_time: string | undefined
  state: number
  game_name: string
  type: string
  actions: Actions[]
}

export interface GroupsSessionTableSection{
  title: string
  rows: GroupsSessionTableRow[]
}

@Component({
  selector: 'app-groups-sessiontable',
  templateUrl: './groups.sessiontable.html',
  styleUrls: [
    './groups.sessiontable.css'
  ]
})
export class GroupsSessionTable{

  data: GroupsSessionTableSection[] = [];
  hideActions: boolean = false;

  @Input()
  allowSelection: boolean = false;

  @Output()
  select = new EventEmitter<GroupsSessionTableRow>();

  setRawData(rawData: GameSessionWithExtensions[], hideActions: boolean){
    this.processData(rawData, hideActions).subscribe(data => {
      this.data = data;
      this.hideActions = hideActions;
    })
  }

  getImageForAction(action: Actions): string{
    const prefix = 'assets/groups/sessiontable/';
    return prefix + action + '.png';
  }

  getStateClass(state: number): string{
    switch(state){
      case GameSessionState.canceled: return 'sts-black';
      case GameSessionState.complete: return 'sts-blue';
      case GameSessionState.multiplayerReady: return 'sts-green';
      case GameSessionState.multiplayerStaging: return 'sts-yellow';
      case GameSessionState.live: return 'sts-red';
      case GameSessionState.scheduled: return 'sts-gray';
      default: return 'sts-gray';
    }
  }

  getStateName(state: number): string{
    switch(state){
      case GameSessionState.canceled: return 'CANCELED';
      case GameSessionState.complete: return 'COMPLETE';
      case GameSessionState.multiplayerReady: return 'READY';
      case GameSessionState.multiplayerStaging: return 'STAGING';
      case GameSessionState.live: return 'LIVE';
      case GameSessionState.scheduled: return 'SCHEDULED';
      default: return 'UNKNOWN';
    }
  }

  private processData(
    rawData: GameSessionWithExtensions[], hideActions: boolean
  ): Observable<GroupsSessionTableSection[]>{
    return new Observable<GroupsSessionTableSection[]>((subscriber) => {
      const adapter = new GroupsSessionDataAdapter();
      const processed = adapter.adapt(rawData, hideActions);
      subscriber.next(processed);
    });
  }

}