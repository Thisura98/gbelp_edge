import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  get isLoggedIn(): boolean{
    return this.userService.getIsLoggedIn()
  }

  constructor(
    private router: Router,
    private userService: UserService,
    private apiService: ApiService
  ) { } 

  ngOnInit(){
    console.log('ngOninit');
    if (this.userService.getIsLoggedIn()){
      console.log('checking user');
      this.refreshToken();
    }
  }

  refreshToken(){
    this.apiService.refreshToken().subscribe((_) => {});
  }

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
