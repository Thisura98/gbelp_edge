import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  template: `
  <style>
    .container{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      flex-direction: column
    };
  </style>
  <style>
    .margin-top{
      margin-top: 10px;
    }
  </style>
  <div class="container">
    <h2>404 - Path not found</h2>
    <h4>{{ path }}</h4>
    <h4>did not match any known paths</h4>
    <div class="dyn-btn clickable" (click)="goToDashboard()">Back to Dashboard</div>
    <div class="dyn-btn clickable margin-top" (click)="goBack()">Back</div>
  </div>
  `
})
export class NotFoundComponent implements OnInit {

  path: string = ""

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.activatedRoute.url.subscribe(urlSegment => {
      this.path = urlSegment.map(m => m.path).join("/");
    })
  }

  ngOnInit(): void {
  }

  goToDashboard(){
    this.router.navigate(['/dashboard']);
  }

  goBack(){
    this.location.back();
  }

}
