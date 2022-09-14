import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";

@Component({
  templateUrl: './users.component.html',
  styleUrls: [
    './users.component.css',
    './../common/group.commonstyles.css'
  ],
  providers: [
    {provide: DatePipe, useClass: DatePipe}
  ]
})
export class GroupUsersComponent implements OnInit{

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }
  
}
 