import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UserGroupMember } from "../../../../../../../../commons/src/models/groups/member";

@Component({
  selector: 'app-groups-usertable-rows',
  templateUrl: './groups.usertable.rows.html',
  styleUrls: [
    './groups.usertable.rows.css'
  ]
})
export class GroupsUserTableRows{

  @Input()
  users: UserGroupMember[] | undefined;

  @Input()
  selections: { [key: string] : boolean } = {};

  @Output()
  onSelected: EventEmitter<UserGroupMember> = new EventEmitter();

  get usersEmpty(): boolean{
    return this.users == undefined || this.users.length == 0;
  }

}