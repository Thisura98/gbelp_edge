import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameEntry } from '../../../../../../../../commons/src/models/game/game';
import { ServerResponseAllGameEntries } from 'src/app/models/game/game';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboardtemplates',
  templateUrl: './dashboardtemplates.component.html',
  styleUrls: ['./dashboardtemplates.component.css']
})
export class DashboardTemplatesComponent implements OnInit {

  isLoading = true;
  templates: GameEntry[] = [];
  displayedData: GameEntry[] = [];
  searchTerm: string = '';
  isSearching: boolean = false;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  createGameClicked(){
    this.router.navigate(['/game/create'], {replaceUrl: false});
  }

  refreshClicked(){
    this.templates = [];
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

  searchInputChanged(event: Event){
    const element = event.target as HTMLInputElement;
    const term = element.value;
    this.searchTerm = term;
    this.filterDisplayData();
  }

  private loadData(){
    this.isLoading = true;

    this.apiService.game.getAllGames(true).subscribe((data) => {
      this.notifydataLoaded(data);
    });
    /*
    this.apiService.getAllGames().subscribe((data) => {
      this.notifydataLoaded(data);
    });*/
  }

  private notifyErrorLoading(err: any){
    this.isLoading = false
    this.dialogService.showDismissable('Data Loading', err);
  }

  private notifydataLoaded(response: ServerResponseAllGameEntries){
    this.isLoading = false
    this.templates = response.data;
    this.filterDisplayData();
  }

  private filterDisplayData(){
    if (this.searchTerm.trim().length == 0){
      this.isSearching = false;
      this.displayedData = this.templates;
      return;
    }

    const search = new RegExp(this.searchTerm);
    const filtered = this.templates.filter(v => {
      return v.name.search(search) != -1;
    });

    this.isSearching = true;
    this.displayedData = filtered;
  }

}
