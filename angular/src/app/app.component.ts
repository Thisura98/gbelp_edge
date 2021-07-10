import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from './services/user.service';
import { filter } from 'rxjs/operators';
import { UtilsService } from './services/utils.service';

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
    private userService: UserService,
    private utilsService: UtilsService
  ){

  }

  @HostListener('document:click', ['$event'])
  documentClicked(event: Event){
    if (event.target == null)
      return;

    const target = event.target as Window | Document | Element;
    this.utilsService.documentClickedTarget.next(target);
  }

  logoutClicked(){
    // todo clear auth token in db
    this.userService.clearCredentials();
    window.location.reload();
  }
}
