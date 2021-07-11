import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
