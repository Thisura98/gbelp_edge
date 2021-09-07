import { AfterViewInit, Component, OnInit } from '@angular/core';
import { getGameSidebarItems } from 'src/app/constants/constants';
import { DynamicSidebarItem } from 'src/app/components/ui/dynamicsidebar/dynamicsidebar.component';
import { GameLevel } from '../../../../../../../../commons/src/models/game/levels';
import { GameListing, GameTestSession, ServerResponseGameListing } from 'src/app/models/game/game';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';
import { DialogService } from 'src/app/services/dialog.service';
import { EditorDataService } from 'src/app/services/editor.data.service';
import { SceneEditorComponent } from './scene/scene.component';
import { AnimationEditorComponent } from './animation/animation.component';
import { LogicEditorComponent } from './logic/logic.component';
import { GameType } from '../../../../../../../../commons/src/models/game/game';

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
export class GameEditorComponents implements OnInit, AfterViewInit {

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
  isSaving: boolean = false;
  
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
  }

  ngAfterViewInit(){
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

  /**
   * Saves the current level by collecting data
   * from all children. 
   * @param callback Invoked after successfull game save
   */
  saveGame(callback: (() => void) | undefined = undefined){
    console.log("Saving...");
    this.isSaving = true;

    this.editorDataService.invokeAllSaveListeners(this.gameListing!.project, () => {
      console.log("Project levels:", this.gameListing!.project!.levels);
      console.log("Local levels:", this.gameLevels)

      this.apiService.saveLevel(
        this.editingGameId!.toString(), 
        this.gameListing!.project!._id, 
        this.gameLevels
      ).subscribe((r) => {
        this.isSaving = false;
        if (!r.success){
          this.dialogService.showDismissable('Error', `Could not save game. ${r.description}`);
        }
        else{
          if (callback != undefined)
            callback();
        }
      });
    });
  }

  getSelectedTabIndex(): number | undefined{
    const component = this.activatedRoute.children[0].component
    if (component == SceneEditorComponent)
      return 0;
    else if (component == AnimationEditorComponent)
      return 1;
    else if (component == LogicEditorComponent)
      return 2;
    else
      return undefined;
  }

  /**
   * @param index Scene, Animation, Index (0, 1, 2)
   */
  didSelectedEditorTab(index: number){
    if(index == this.getSelectedTabIndex())
      return;

    const queryParams = {
      gameId: this.editingGameId,
      levelId: this.selectedLevel!._id
    };
    let command = '';

    switch(index){
      case 0: command = 'game/edit/editor/scene'; break;
      case 1: command = 'game/edit/editor/animation'; break;
      case 2: command = 'game/edit/editor/logic'; break;
      default: return;
    }
    
    this.saveGame(() => {
      this.router.navigate([command], {
        queryParams: queryParams
      });
    });
  }

  openHelpPressed(){
    const url = '/docs';
    window.open(url, '_blank');
  }

  playGamePressed(){
    this.saveGame(() => {
      this.apiService.getGameTestSession(this.editingGameId!.toString()).subscribe((r) => {
        if (!r.success){
          this.dialogService.showDismissable('Cannot Play Game', r.description);
          return;
        }

        this.navigateToPlaySession(r.data);
      });
    });
  }

  /* private methods */

  private loadData(){
    if (!this.editingGameId){
      this.handleError('Game Id Not Found');
      this.navigateToDashboard();
      return;
    }
    this.apiService.getGame(this.editingGameId).subscribe((value) => {
      this.handleLoadData(value)
    });
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

      this.editorDataService.setEditorChildData(response, this.selectedLevelIndex);
      this.navigateToDefaultChildIfNeeded();
      this.didLoadData = true;
    });
  }

  private handleError(error: string){
    this.dialogService.showDismissable('Error', error);
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
      return;
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

  private navigateToPlaySession(data: GameTestSession){
    if (this.gameListing!.entry.type == GameType.Singleplayer){
      this.router.navigate([`splay/${data.sessionId}`]);
    }
    else{
      this.router.navigate([`mplay/${data.sessionId}`]);
    }
  }

}
