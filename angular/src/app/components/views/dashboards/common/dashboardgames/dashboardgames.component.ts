import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Game{
  id: number
  name: string,
  type: number,
  usage: number,
}

@Component({
  selector: 'app-dashboardgames',
  templateUrl: './dashboardgames.component.html',
  styleUrls: ['./dashboardgames.component.css']
})
export class DashboardgamesComponent implements OnInit {

  isLoading = true
  data: Game[] = []

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createGameClicked(){
    this.router.navigate(['/game/create'], {replaceUrl: false});
  }

}
