import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'App'
  
  get isLoggedIn(): boolean{
    return this.userService.getIsLoggedIn()
  }

  constructor(
    private userService: UserService
  ){}

  logoutClicked(){
    // todo clear auth token in db
    this.userService.clearCredentials();
    window.location.reload();
  }
}
