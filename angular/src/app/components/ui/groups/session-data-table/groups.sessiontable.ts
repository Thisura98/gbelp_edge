import { Component, EventEmitter, Input, Output } from "@angular/core";

export enum Actions{
  duplicate = 'duplicate',
  stop = 'stop',
  // eye icon
  join = 'join',
  edit = 'edit',
  delete = 'delete',
  reports = 'reports'
}

export interface GroupsSessionRow{
  start_time: string
  end_time: string | undefined
  state: number
  game_name: string
  type: string
  actions: Actions[]
}

@Component({
  selector: 'app-groups-sessiontable',
  templateUrl: './groups.sessiontable.html',
  styleUrls: [
    './groups.sessiontable.css'
  ]
})
export class GroupsSessionTable{

  @Input()
  data: GroupsSessionRow[] = [];

  @Input()
  title: string | undefined;

  @Input()
  allowSelection: boolean = false;

  @Output()
  select = new EventEmitter<GroupsSessionRow>();

}