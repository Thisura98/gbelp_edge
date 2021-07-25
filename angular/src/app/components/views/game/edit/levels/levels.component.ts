import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicSidebarItem } from 'src/app/components/ui/dynamicsidebar/dynamicsidebar.component';
import { getGameSidebarItems } from 'src/app/constants/constants';
import { GameListing } from 'src/app/models/game/game';
import { GameProject, GameProjectLevel } from 'src/app/models/game/game_project';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-game-edit-levels',
  templateUrl: './levels.component.html',
  styleUrls: [
    './levels.component.css',
    '../../common/game.commonstyles.css'
  ]
})
export class GameEditLevelsComponent implements OnInit {

  get sidebarItems(): DynamicSidebarItem[]{
    return getGameSidebarItems('Levels');
  }

  selectedLevel: GameProjectLevel | undefined;
  gameLevels: GameProjectLevel[] = [];
  
  private editingGameId: number | undefined;
  private gameListing: GameListing | undefined;

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private dialogService: DialogService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.editingGameId = params['gameId'];
      this.loadData();
    });
  }

  /* Private Methods */

  private loadData(){
    this.apiService.getGame(this.editingGameId!).subscribe({
      next: (data) => {
        if (data.data != undefined){
          this.gameListing = data.data;
          this.setGameProject(data.data.project);
        }
        else{
          this.handleDataLoadError('Could not load data');
        }
      },
      error: (err) => {
        this.handleDataLoadError(JSON.stringify(err));
      }
    });
  }

  private handleDataLoadError(message: any){
    this.dialogService.showDismissable('Error Load Data', message, undefined);
  }

  /**
   * Set the project file and update view related varaibles.
   */
   private setGameProject(project: GameProject){
    this.gameListing!.project = project;
    this.selectedLevel = undefined;

    this.gameLevels = project.levels;
  }

}
