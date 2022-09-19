import { Component, Input } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { UserGroupMember, UserGroupMemberData } from "../../../../../../../commons/src/models/groups/member";

@Component({
  selector: 'app-groups-usertable',
  templateUrl: './groups.usertable.html',
  styleUrls: [
    './groups.usertable.css'
  ]
})
export class GroupsUserTable{

  @Input()
  memberData: UserGroupMemberData | undefined;

  @Input()
  selection: { [key: string] : boolean } = {};

  constructor(
    private userService: UserService
  ){}

  public selectUser(user: UserGroupMember){
    const id = user.user_id;
    this.selection[id] = this.selection[id] == null || !this.selection[id];
  }

}