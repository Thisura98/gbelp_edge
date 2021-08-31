import { Component, OnInit } from '@angular/core';
import { getGameSidebarItems } from 'src/app/constants/constants';
import { DynamicSidebarItem } from 'src/app/components/ui/dynamicsidebar/dynamicsidebar.component';
import { GameLevel } from '../../../../../../../../commons/src/models/game/levels';
import { GameListing, ServerResponseGameListing } from 'src/app/models/game/game';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';
import { DialogService } from 'src/app/services/dialog.service';
import { EditorDataService } from 'src/app/services/editor.data.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  providers: [
    { provide: EditorDataService, useClass: EditorDataService }
  ],
  styleUrls: [
    './editor.component.css',
    '../../common/game.commonstyles.css'
  ]
})
export class GameEditorComponents implements OnInit {

  /**
   * Left sidebar
   */
  get sidebarItems(): DynamicSidebarItem[]{
    return getGameSidebarItems('Editor');
  }

  selectedLevelIndex: number | undefined;
  selectedLevel: GameLevel | undefined;
  gameLevels: GameLevel[] = [];
  didLoadData: boolean = false
  
  private editingGameId: number | undefined;
  private gameListing: GameListing | undefined;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private apiService: ApiService,
    private dialogService: DialogService,
    private editorDataService: EditorDataService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userService.routeOutIfLoggedOut();

    this.activatedRoute.queryParams.subscribe((map) => {
      this.editingGameId = map['gameId'];
      this.loadData();
    });
  }

  didSelectLevel(event: Event){
    const levelId = (event.target as HTMLInputElement).value;

    if (levelId == "-1")
      return;

    this.router.navigate(['/game/edit/editor/scene'], {
      queryParams: {
        gameId: this.editingGameId!,
        levelId: levelId
      },
      replaceUrl: true
    });
  }

  /* private methods */

  private loadData(){
    if (!this.editingGameId){
      this.handleError('Game Id Not Found');
      this.navigateToDashboard();
      return;
    }
    this.apiService.getGame(this.editingGameId).subscribe({
      next: (value) => this.handleLoadData(value),
      error: (e) => this.handleError(e)
    })
  }

  private handleLoadData(response: ServerResponseGameListing){
    this.gameListing = response.data;
    this.gameLevels = this.gameListing!.project.levels;

    // Find the level index from level ID then,
    // set the data for child views.
    let indexOfLevel = null;
    this.activatedRoute.queryParams.subscribe(params => {
      const levelId = params['levelId'];
      const matchingLevelIndex = this.gameLevels.findIndex((lvl) => {return lvl._id == levelId});
      if (matchingLevelIndex >= 0){
        indexOfLevel = matchingLevelIndex;
        this.selectedLevel = this.gameLevels[indexOfLevel];
        this.selectedLevelIndex = indexOfLevel;
      }

      this.editorDataService.setData(response);
      this.navigateToDefaultChildIfNeeded();
      this.didLoadData = true;
    });
  }

  private handleError(error: any){
    let displayMsg = "";
    if (typeof error == 'string')
      displayMsg = error;
    else
      displayMsg = JSON.stringify(error);

    this.dialogService.showDismissable('Error', displayMsg);
  }

  private navigateToDefaultChildIfNeeded(){
    if (this.editingGameId == undefined){
      // error navigate to dashboard.
      this.navigateToDashboard();
    }
    if (this.selectedLevelIndex == undefined && this.activatedRoute.children.length == 0){
      // ok. stay
    }
    else if (this.selectedLevelIndex == undefined && this.activatedRoute.children.length > 0){
      // error navigate to level selector
      this.navigateToLevelSelector();
    }
    else if (this.selectedLevelIndex != undefined && this.activatedRoute.children.length == 0){
      // error navigate to level selector
      this.navigateToLevelSelector();
    }
    else{
      // go the the 'scene' child component.
      this.router.navigate(
        ['/game/edit/editor/scene'],
        {
          replaceUrl: true,
          queryParams: {
            gameId: this.editingGameId,
            levelId: this.selectedLevel!._id
          }
        }
      );
    }
  }

  private navigateToLevelSelector(){
    const gameId = this.editingGameId;
    this.router.navigate(['/game/edit/editor'], {
      queryParams: {
        gameId: gameId
      },
      replaceUrl: true
    });
  }

  private navigateToDashboard(){
    this.router.navigate(['/dashboard'], {replaceUrl: true});
  }

}
