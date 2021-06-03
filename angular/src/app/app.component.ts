import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { DialogService } from './services/dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'App';
  showRegister = false;

  constructor(
    private router: Router,
    public dialogService: DialogService
  ){}

  ngOnInit(){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd){
        this.showRegister = event.url == "/";
      }
    });
  }

  registerClicked(){
    this.router.navigate(['/register']);
  }
}
