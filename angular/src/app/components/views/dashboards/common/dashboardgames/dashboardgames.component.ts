import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameEntry } from '../../../../../../../../commons/src/models/game/game';
import { ServerResponseAllGameEntries } from 'src/app/models/game/game';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { filter } from 'rxjs/operators';
import { ViewMode } from 'src/app/constants/constants';

/**
 * A page that Shows Games & Templates
 */
@Component({
  selector: 'app-dashboardgames',
  templateUrl: './dashboardgames.component.html',
  styleUrls: ['./dashboardgames.component.css']
})
export class DashboardgamesComponent implements OnInit {

  isLoading = true
  data: GameEntry[] = []
  displayedData: GameEntry[] = []
  searchTerm: string = '';
  isSearching: boolean = false;

  /**
   * Displaying Games or Templates?
   */
  mode: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.mode = data.mode;
      this.loadData();
    });
  }

  createGameClicked(){
    const target = this.mode == ViewMode.GAME ? '/game/create' : '/template/create';
    this.router.navigate([target], {replaceUrl: false});
  }

  refreshClicked(){
    this.data = [];
    this.loadData();
  }

  editGameClicked(id: number){
    const target = this.mode == ViewMode.GAME ? '/game/edit' : '/template/edit';
    this.router.navigate(
      [target],
      {
        queryParams: {
          gameId: id
        }
      }
    )
  }

  deleteGameClicked(id: number){
    const target = this.mode == ViewMode.GAME ? '/game/delete' : '/template/delete';
    this.router.navigate(
      [target],
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
    const isTemplate = this.mode == 'template';

    this.isLoading = true;
    this.apiService.game.getAllGames(isTemplate).subscribe((data) => {
      this.notifydataLoaded(data);
    });
  }

  private notifyErrorLoading(err: any){
    this.isLoading = false
    this.dialogService.showDismissable('Data Loading', err);
  }

  private notifydataLoaded(response: ServerResponseAllGameEntries){
    this.isLoading = false
    this.data = response.data;
    this.filterDisplayData();
  }

  private filterDisplayData(){
    if (this.searchTerm.trim().length == 0){
      this.isSearching = false;
      this.displayedData = this.data;
      return;
    }

    const search = new RegExp(this.searchTerm);
    const filtered = this.data.filter(v => {
      return v.name.search(search) != -1;
    });

    this.isSearching = true;
    this.displayedData = filtered;
  }

}
