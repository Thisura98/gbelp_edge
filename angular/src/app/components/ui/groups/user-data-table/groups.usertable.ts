import { Component, Input } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { UserGroupMemberData } from "../../../../../../../commons/src/models/groups/member";

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

  constructor(
    private userService: UserService
  ){}

}