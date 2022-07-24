import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { getGameSidebarItems, QueryKey, ViewMode } from 'src/app/constants/constants';
import { DynamicSidebarItem } from 'src/app/components/ui/dynamicsidebar/dynamicsidebar.component';
import { GameLevel } from '../../../../../../../../commons/src/models/game/levels';
import { GameTestSession, ServerResponseGameListing } from 'src/app/models/game/game';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';
import { DialogService } from 'src/app/services/dialog.service';
import { EditorDataService } from 'src/app/services/editor.data.service';
import { SceneEditorComponent } from './scene/scene.component';
import { PropertiesEditorComponent } from './properties/properties.component';
import { LogicEditorComponent } from './logic/logic.component';
import { GameListing, GameType } from '../../../../../../../../commons/src/models/game/game';
import { combineLatest } from 'rxjs';
import { MetaKeyService } from 'src/app/services/metakey.service';

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
    return getGameSidebarItems('Editor', this.viewMode, this.getSelectedTabIndex(), (item, index) => {
      this.didSelectedEditorTab(item, index);
    });
  }

  get editorQueryParams(): Params{
    const params: Params = {
      'gameId': this.editingGameId,
      'levelId': this.selectedLevel?._id
    };
    return params;
  }

  get isProcessing(): boolean{
    return this.isSavingAPIWorking || this.processingSaving || this.processingCompiling || this.processingCompilingAndPlaying || this.processingPlay;
  }

  selectedLevelIndex: number | undefined;
  selectedLevel: GameLevel | undefined;
  gameLevels: GameLevel[] = [];
  didLoadData: boolean = false

  isSavingAPIWorking: boolean = false;

  processingSaving: boolean = false;
  processingCompiling: boolean = false;
  processingCompilingAndPlaying: boolean = false;
  processingPlay: boolean = false;
  
  viewMode = ViewMode.UNKNOWN;
  private editingGameId: number | undefined;
  private gameListing: GameListing | undefined;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private apiService: ApiService,
    private dialogService: DialogService,
    private editorDataService: EditorDataService,
    private metaKeyService: MetaKeyService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userService.routeOutIfLoggedOut();
  }

  ngAfterViewInit(){
    combineLatest([this.activatedRoute.queryParams, this.activatedRoute.data]).subscribe(([map, data]) => {
      this.viewMode = data.mode;
      this.editingGameId = map['gameId'];
      this.loadData();
    });
  }

  handleBack(){
    // 'f' for find dashboard user type.

    if (this.viewMode == ViewMode.GAME){
      this.router.navigate([
        `/dashboard/f/games`
      ]);
    }
    else{
      this.router.navigate([
        `/dashboard/f/templates`
      ]);
    }
  }

  didSelectLevel(event: Event){
    const levelId = (event.target as HTMLInputElement).value;
    const path = this.viewMode == ViewMode.GAME ? '/game/edit/editor/scene' : '/template/edit/editor/scene';

    if (levelId == "-1")
      return;

    this.router.navigate([path], {
      queryParams: {
        gameId: this.editingGameId!,
        levelId: levelId
      },
      replaceUrl: true
    });
  }

  /**
   * Save the game when user presses Ctlr / Command + S
   */
  @HostListener('document:keydown', ['$event'])
  saveShortcutPressed(e: Event){
    const kbEvent = e as KeyboardEvent;
    if (this.metaKeyService.isMetaKey(kbEvent) && kbEvent.key == 's'){
      e.preventDefault();
      this.saveGame(true, undefined);
    }
  }

  /**
   * Saves the current level by collecting data
   * from all children. 
   * @param {boolean} showSuccessToast Show toast if saving is successful
   * @param callback Invoked after successfull game save
   */
  saveGame(showSuccessToast: boolean, callback: (() => void) | undefined = undefined){
    console.log("Saving...");
    this.isSavingAPIWorking = true;

    this.editorDataService.invokeAllSaveListeners(this.gameListing!.project, () => {
      console.log("Project levels:", this.gameListing!.project!.levels);
      console.log("Local levels:", this.gameLevels)

      this.apiService.editor.saveLevel(
        this.editingGameId!.toString(), 
        this.gameListing!.project!._id, 
        this.gameLevels
      ).subscribe((r) => {
        this.isSavingAPIWorking = false;
        if (r.success){
          if (callback != undefined)
            callback();

          if (showSuccessToast)
            this.dialogService.showSnackbar("Saved successfully!");
        }
        else
          this.dialogService.showDismissable('Error', `Could not save game. ${r.description}`);
      });
    });
  }

  getSelectedTabIndex(): number | undefined{
    if (this.activatedRoute.children == null || this.activatedRoute.children.length == 0)
      return undefined;

    const component = this.activatedRoute.children[0].component
    if (component == SceneEditorComponent)
      return 0;
    else if (component == PropertiesEditorComponent)
      return 1;
    else if (component == LogicEditorComponent)
      return 2;
    else
      return undefined;
  }

  /**
   * @param {DynamicSidebarItem} item
   * @param {number} index Index in the subitems array
   */
  didSelectedEditorTab(item: DynamicSidebarItem, index: number){
    if(this.getSelectedTabIndex() == index)
      return;

    if (this.selectedLevelIndex == undefined){
      this.dialogService.showSnackbar('Select a level first');
      return;
    }

    const queryParams = {
      gameId: this.editingGameId,
      levelId: this.selectedLevel!._id
    };
    let command = this.viewMode == ViewMode.GAME ? 'game' : 'template';

    switch(index){
      case 0: command += '/edit/editor/scene'; break;
      case 1: command += '/edit/editor/animation'; break;
      case 2: command += '/edit/editor/logic'; break;
      default: return;
    }
    
    this.saveGame(true, () => {
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
    this.processingPlay = true;
    this.saveGame(false, () => {
      this.apiService.editor.getGameTestSession(this.editingGameId!.toString(), false).subscribe((r) => {
        this.processingPlay = false;
        if (!r.success){
          this.dialogService.showDismissable('Cannot Play Game', r.description);
          return;
        }

        this.navigateToPlaySession(r.data);
      });
    });
  }

  compileGamePressed(){
    this.processingCompiling = true;
    this.saveGame(false, () => {
      this.apiService.editor.compileGame(this.editingGameId!.toString()).subscribe((r) => {
        this.processingCompiling = false;
        if (r.success){
          this.dialogService.showSnackbar('Game Compilation Successful');
        }
        else{
          this.dialogService.showDismissable('Game Compilation failed', r.description);
          // todo show error list modal
        }
      }, (error) => {
        console.timeLog("Game Compilation Error:", error);
        this.dialogService.showDismissable('Game Compilation failed', "Unknown error occurred");
      })
    });
  }

  compileAndPlayGamePressed(){
    const gameId = this.editingGameId!.toString();
    this.processingCompilingAndPlaying = true;

    this.saveGame(false, () => {
      this.apiService.editor.compileGame(gameId).subscribe((compileResponse) => {
        if (compileResponse.success){
          this.apiService.editor.getGameTestSession(gameId, false).subscribe((testSession) => {
            this.processingCompilingAndPlaying = false;

            if (!testSession.success){
              this.dialogService.showDismissable('Cannot Play Game', testSession.description);
              return;
            }
    
            this.navigateToPlaySession(testSession.data);
          });
        }
        else{
          // todo show error list modal

          this.processingCompilingAndPlaying = false;
          this.dialogService.showDismissable('Game Compilation failed', compileResponse.description);
        }
      }, (error) => {
        this.processingCompilingAndPlaying = false;
        console.timeLog("Game Compilation Error:", error);
        this.dialogService.showDismissable('Game Compilation failed', "Unknown error occurred");
      })
    });
  }

  /* private methods */

  private loadData(){
    if (!this.editingGameId){
      this.handleError('Game Id Not Found');
      this.navigateToDashboard();
      return;
    }
    this.apiService.game.getGame(this.editingGameId).subscribe((value) => {
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

      this.editorDataService.setEditorChildData(response, this.selectedLevelIndex, this.selectedLevel!._id!);
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
    const path = this.viewMode == ViewMode.GAME ? '/game/edit/editor' : '/template/edit/editor';
    this.router.navigate([path], {
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
      window.open(`splay/${data.sessionId}?${QueryKey.testSession}=true`, '_blank');
    }
    else{
      window.open(`mplay/${data.sessionId}?${QueryKey.testSession}=true`, '_blank');
    }
  }

}
