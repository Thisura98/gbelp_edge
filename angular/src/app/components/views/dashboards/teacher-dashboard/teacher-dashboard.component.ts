import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: [
    './teacher-dashboard.component.css',
    '../dashboard.component.css'
  ]
})
export class TeacherDashboardComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.routeOutIfLoggedOut();
  }

}
