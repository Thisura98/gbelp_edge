import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'App';
  showRegister = false;
  showLogin = false;
  showDashboardLink = false;

  get isLoggedIn(): boolean{
    return this.userService.getIsLoggedIn()
  }

  constructor(
    private router: Router,
    private userService: UserService
  ){}

  ngOnInit(){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd){
        this.updateMessageVisibility(event);
      }
    });
  }

  private updateMessageVisibility(event: NavigationEnd){
    const shouldShowRegister = event.url == "/" && !this.isLoggedIn
    const shouldShowDashboardLink = event.url == "/" && this.isLoggedIn
    this.showRegister = shouldShowRegister;
    this.showLogin = this.showRegister;
    this.showDashboardLink = shouldShowDashboardLink;
  }

  registerClicked(){
    this.router.navigate(['/register']);
  }

  loginClicked(){
    this.router.navigate(['/login']);
  }

  goToDashboardClicked(){
    this.router.navigate(['/dashboard']);
  }

  logoutClicked(){
    // todo clear auth token in db
    this.userService.clearCredentials();
    window.location.reload();
  }
}
