import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameEntry } from '../../../../../../../../commons/src/models/game/game';
import { ServerResponseAllGameEntries } from 'src/app/models/game/game';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';


@Component({
  selector: 'app-dashboardgames',
  templateUrl: './dashboardgames.component.html',
  styleUrls: ['./dashboardgames.component.css']
})
export class DashboardgamesComponent implements OnInit {

  isLoading = true
  data: GameEntry[] = []

  constructor(
    private router: Router,
    private apiService: ApiService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    console.log('DashboardgamesComponent', '');
    this.loadData();
  }

  createGameClicked(){
    this.router.navigate(['/game/create'], {replaceUrl: false});
  }

  refreshClicked(){
    this.data = [];
    this.loadData();
  }

  editGameClicked(id: number){
    this.router.navigate(
      ['/game/edit'],
      {
        queryParams: {
          gameId: id
        }
      }
    )
  }

  deleteGameClicked(id: number){
    this.router.navigate(
      ['/game/delete'],
      {
        queryParams: {
          gameId: id
        }
      }
    )
  }

  private loadData(){
    this.isLoading = true;
    this.apiService.getAllGames().subscribe({
      next: (data) => {
        this.notifydataLoaded(data);
      },
      error: (err) => {
        this.notifyErrorLoading(JSON.stringify(err));
      }
    })
  }

  private notifyErrorLoading(err: any){
    this.isLoading = false
    this.dialogService.showDismissable('Data Loading', err);
  }

  private notifydataLoaded(response: ServerResponseAllGameEntries){
    this.isLoading = false
    this.data = response.data;
  }

}
