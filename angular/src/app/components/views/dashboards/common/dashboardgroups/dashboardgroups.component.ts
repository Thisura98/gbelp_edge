import { Component, OnInit } from '@angular/core';

interface Group{
  id: number,
  name: string,
  members: number,
  joinlink: string
}

@Component({
  selector: 'app-dashboardgroups',
  templateUrl: './dashboardgroups.component.html',
  styleUrls: ['./dashboardgroups.component.css']
})
export class DashboardgroupsComponent implements OnInit {

  isLoading = true
  data: Group[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
