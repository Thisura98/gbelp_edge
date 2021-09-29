import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router'
import { ApiService } from 'src/app/services/api.service';
import { combineLatest, forkJoin } from 'rxjs';

/**
 * you can use,
 * ```
 * /dashboard 
 * /dashboard/f/games
 * /dashboard/f/groups
 * ```
 * 
 * the 'f' (forward) option will redirect to the correct user type's dashboard.
 * 
 * for example, if the user is a teacher then:
 * /dashboard/f/games ---> /dashboard/teacher/games
 */
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

  private isForwardMode: boolean = false;
  private forwardingPage: string | undefined;


  constructor(
    private userService: UserService,
    private dialogService: DialogService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    // fixme use navigation events for this
    this.userService.routeOutIfLoggedOut();
    combineLatest([
      this.activatedRoute.params,
      this.activatedRoute.data
    ])
    .subscribe(result => {
      this.forwardingPage = result[0].page;
      this.isForwardMode = result[1].mode == 'forward';

      this.handle();
    }, (err) => {
      console.log("Error at dashboard:", err);
    })

  }

  private handle(){
    const userId = this.userService.getUserAndToken().user.userId;
    const userType = this.userService.getNavSafeUserType();

    if (userId == null || userType == null){
      this.dialogService.showSnackbar("User is not logged in");
      this.userService.routeOutIfLoggedOut();
      return;
    }

    if (this.isForwardMode){
      this.router.navigate([`/dashboard/${userType}/${this.forwardingPage!}`], {replaceUrl: true});
    }
    else{
      this.router.navigate([`/dashboard/${userType}/overview`], {replaceUrl: true});
    }
  }

}
