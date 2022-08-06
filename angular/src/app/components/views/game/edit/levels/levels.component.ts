import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicSidebarItem } from 'src/app/components/ui/dynamicsidebar/dynamicsidebar.component';
import { getGameSidebarItems, ViewMode } from 'src/app/constants/constants';
import { GameListing } from '../../../../../../../../commons/src/models/game/game';
import { LevelExitCriteria, GameLevel, GameLevelHelper, LevelTypeSingle, LevelDisplayMode, LevelExitCriteriaHelper, LevelTypeMulti } from '../../../../../../../../commons/src/models/game/levels';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { UserService } from 'src/app/services/user.service';
import { GameEditLevelItemComponent } from './item/item.component';
import { LevelScene, SceneObjectHelper } from '../../../../../../../../commons/src/models/game/levels/scene';
import { LevelLogic, LevelScript } from '../../../../../../../../commons/src/models/game/levels/logic';
import { LevelProperties } from '../../../../../../../../commons/src/models/game/levels/properties';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-game-edit-levels',
  templateUrl: './levels.component.html',
  styleUrls: [
    './levels.component.css',
    '../../common/game.commonstyles.css'
  ]
})
export class GameEditLevelsComponent implements OnInit {

  /**
   * Left sidebar
   */
  get sidebarItems(): DynamicSidebarItem[]{
    return getGameSidebarItems('Levels', this.viewMode, undefined);
  }

  saveBtnText: string = 'Save';
  saveBtnDisabled: boolean = false;

  selectedLevelIndex: number | undefined;
  selectedLevel: GameLevel | undefined;
  gameLevels: GameLevel[] = [];
  
  viewMode = ViewMode.UNKNOWN;
  private editingGameId: number | undefined;
  private gameListing: GameListing | undefined;

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private dialogService: DialogService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.routeOutIfLoggedOut();
    combineLatest([this.activatedRoute.queryParams, this.activatedRoute.data]).subscribe(([params, data]) => {
      this.viewMode = data.mode;
      this.editingGameId = params['gameId'];
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

  /**
   * Get Object Id and insert new level before the game over level.
   */
  addLevelClicked(){
    this.apiService.editor.getNewObjectIds(2).subscribe((res) => {
      const newCameraId = res.data[0];
      const newLevelId = res.data[1];
      const levelExitType = LevelExitCriteriaHelper.fromNumber(this.gameListing!.entry.level_switch);
      const levelExitTypeValue = null;
      const defaultCamera = SceneObjectHelper.createBlankCamera(newCameraId);
      const newLevel: GameLevel = new GameLevel(
        newLevelId,
        'New Level',
        LevelTypeSingle.genericLevel,
        LevelDisplayMode.replace,
        false,
        levelExitType,
        levelExitTypeValue,
        new LevelScene([defaultCamera]),
        new LevelProperties([], {}),
        new LevelLogic(
          new LevelScript('', '', '')
        ),
      );

      const indexOfGameOver = this.gameLevels.findIndex((lvl) => {
        return lvl.type == LevelTypeSingle.gameOver || lvl.type == LevelTypeMulti.gameOver;
      })

      if (indexOfGameOver == -1){
        // add to end of array
        this.gameLevels.push(newLevel);
      }
      else{
        // add before game over level
        const insertIndex = Math.max(0, indexOfGameOver);
        this.gameLevels.splice(insertIndex, 0, newLevel);
      }
    });
  }

  deleteLevelPressed(){
    this.dialogService.showYesNo("Confirm Action", "Are you sure you want to delete this level?", () => {
      this.gameLevels.splice(this.selectedLevelIndex!, 1);
      this.dialogService.showSnackbar('Level Deleted');
    });
  }

  duplicateLevelPressed(){
    // Use spread operator to prevent 'pass by reference' issues
    const levelToClone = {...this.gameLevels[this.selectedLevelIndex!]};
    this.apiService.editor.getNewObjectIds(1).subscribe((res) => {
      levelToClone._id = res.data[0];
      this.gameLevels.splice(this.selectedLevelIndex! + 1, 0, levelToClone);
    });
  }

  levelSelected(gameLevel: GameLevel){
    if (this.selectedLevel?._id == gameLevel._id){
      this.selectedLevel = undefined;
      this.selectedLevelIndex = undefined;
    }
    else{
      this.selectedLevel = gameLevel;
      this.selectedLevelIndex = this.gameLevels.indexOf(gameLevel);
    }
  }

  get isSelectedLevelExitCriteriaTime(): boolean{
    return this.selectedLevel?.exitCriteriaType == LevelExitCriteria.time
  }

  get isSelectedLevelExitCriteriaScore(): boolean{
    return this.selectedLevel?.exitCriteriaType == LevelExitCriteria.score
  }

  getFriendlyLevelName(gameLevel: GameLevel): string{
    return GameLevelHelper.getFriendlyLevelType(gameLevel);
  }

  handleNameChanged(event: Event){
    const input = event.target as HTMLInputElement;
    this.selectedLevel!.name = input.value;
    this.gameLevels[this.selectedLevelIndex!].name = input.value;
  }

  handleExitCriteriaValueChanged(event: Event){
    const input = event.target as HTMLInputElement;
    const value: number = +input.value
    this.selectedLevel!.exitCriteriaValue = value;
    this.gameLevels[this.selectedLevelIndex!].exitCriteriaValue = value;
  }

  handleDisplayModeChanged(event: Event){
    const input = event.target as HTMLInputElement;
    this.selectedLevel!.displayMode = input.value;
    this.gameLevels[this.selectedLevelIndex!].displayMode = input.value;
  }

  handleSaveButtonPressed(){
    this.saveBtnText = 'Saving...';
    this.saveBtnDisabled = true;

    this.apiService.editor.saveLevel(this.editingGameId!.toString(), this.gameListing!.project._id, this.gameLevels).subscribe((r) => {
      this.resetSaveBtnState();
      this.dialogService.showSnackbar("Saved levels successfully!");
    }, (e) => {
      this.dialogService.showDismissable("Error while Saving", JSON.stringify(e));
      this.resetSaveBtnState();
    });
  }

  editLevelPressed(){
    this.router.navigate(['/game/edit/editor/scene'], {
      queryParams: {
        gameId: this.editingGameId,
        levelId: this.selectedLevel!._id
      }
    })
  }

  /* Private Methods */

  private loadData(){
    this.apiService.game.getGame(this.editingGameId!).subscribe({
      next: (data) => {
        if (data.data != undefined){
          this.gameListing = data.data;
          this.setGameProject();
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

  private resetSaveBtnState(){
    this.saveBtnText = 'Save';
    this.saveBtnDisabled = false;
  }

  /**
   * Update view related varaibles.
   */
   private setGameProject(){
    this.selectedLevel = undefined;
    this.gameLevels = this.gameListing!.project.levels;
  }

}
