import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router'
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="center">
      <div class="stacked">
          <mat-progress-spinner mode="indeterminate" [diameter]="40"></mat-progress-spinner>
          <label>Loading Dashboard...</label>
      </div>
    </div>`,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {

    // fixme use navigation events for this
    this.userService.routeOutIfLoggedOut();

    // stay for now
    setTimeout(() => {
      const userId = this.userService.getUserAndToken().user.userId!;
      this.apiService.getUserType(userId).subscribe(r => {
        console.log("DashboardComponent", r);
        const name = r.data.name == 'admin' ? 'teacher' : r.data.name;
        this.router.navigate([`/dashboard/${name}/overview`], {replaceUrl: true});
      })
    }, 1000);

  }

}
