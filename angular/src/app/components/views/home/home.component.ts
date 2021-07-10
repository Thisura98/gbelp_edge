import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  get isLoggedIn(): boolean{
    return this.userService.getIsLoggedIn()
  }

  constructor(
    private router: Router,
    private userService: UserService
  ) { } 


  registerClicked(){
    this.router.navigate(['/register']);
  }

  loginClicked(){
    this.router.navigate(['/login']);
  }

  showDashboardClicked(){
    this.router.navigate(['/dashboard']);
  }

}
