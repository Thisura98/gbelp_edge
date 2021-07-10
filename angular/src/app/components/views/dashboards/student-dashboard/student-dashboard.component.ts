import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: [
    './student-dashboard.component.css',
    '../dashboard.component.css'
  ]
})
export class StudentDashboardComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.routeOutIfLoggedOut();
  }

}
