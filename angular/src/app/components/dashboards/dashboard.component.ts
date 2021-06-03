import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router'
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.userService.routeOutIfLoggedOut();

    // stay for now
    setTimeout(() => {
      const userId = this.userService.getUserAndToken().userId!;
      this.apiService.getUserType(userId).subscribe(r => {
        const name = r.data.name;
        this.router.navigate([`/dashboard/${name}`]);
      })
    }, 3000);

  }

}
