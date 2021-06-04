import { Component, OnInit, Input } from '@angular/core';
import { GameObjective } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource } from '@angular/material/table';

var ELEMENT_DATA = new MatTableDataSource<GameObjective>();

@Component({
  selector: 'dashboard-objectivehistory',
  templateUrl: './objectivehistory.component.html',
  styleUrls: ['./objectivehistory.component.css']
})
export class ObjectivehistoryComponent implements OnInit {

  displayedColumns: string[] = ['session_id', 'objective_id', 'user_id', 'progress', 'name', 'last_updated'];
  dataSource = ELEMENT_DATA;
  loading = false;

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.refreshDatasource();
  }

  refreshDatasource(){
    const userId = this.userService.getUserAndToken().userId!;
    const hardCodedSessionId = '1';

    this.loading = true;
    
    // Simulate Delay
    setTimeout(() => {
      this.apiService.getGameObjectiveHistories(userId, hardCodedSessionId).subscribe(response => {
        if (response.success){
          ELEMENT_DATA.data = response.data;
          console.log("NEW DATA!", ELEMENT_DATA);
        }
        this.loading = false;
      });
    }, 1000);
  }

  sortData(){
    var newSet = new Array<GameObjective>();

    for (let v of ELEMENT_DATA.data){
      
    }
  }
}