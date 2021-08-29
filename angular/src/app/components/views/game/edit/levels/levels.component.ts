import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicSidebarItem } from 'src/app/components/ui/dynamicsidebar/dynamicsidebar.component';
import { getGameSidebarItems } from 'src/app/constants/constants';
import { GameListing } from 'src/app/models/game/game';
import { GameProject } from '../../../../../../../../commons/src/models/game/project';
import { LevelExitCriteria, GameLevel, GameLevelHelper } from '../../../../../../../../commons/src/models/game/levels';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { UserService } from 'src/app/services/user.service';
import { GameEditLevelItemComponent } from './item/item.component';

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
    return getGameSidebarItems('Levels');
  }

  saveBtnText: string = 'Save';
  saveBtnDisabled: boolean = false;

  selectedLevelIndex: number | undefined;
  selectedLevel: GameLevel | undefined;
  gameLevels: GameLevel[] = [];
  
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
    this.activatedRoute.queryParams.subscribe((params) => {
      this.editingGameId = params['gameId'];
      this.loadData();
    });
  }

  addLevelClicked(){
    this.router.navigate(['game/edit/levels/add'], {
      queryParams: {
        gameId: this.editingGameId
      }
    })
  }

  levelSelected(gameLevel: GameLevel){
    if (this.selectedLevel?._id == gameLevel._id){
      this.selectedLevel = undefined;
      this.selectedLevelIndex = undefined;
    }
    else{
      this.selectedLevel = gameLevel;
      this.selectedLevelIndex = this.gameLevels.indexOf(gameLevel);
      console.log('Selected Level Index', this.selectedLevelIndex);
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

    this.apiService.saveLevel(this.editingGameId!.toString(), this.gameListing!.project._id, this.gameLevels).subscribe((r) => {
      this.resetSaveBtnState();
    }, (e) => {
      this.dialogService.showDismissable("Error while Saving", JSON.stringify(e));
      this.resetSaveBtnState();
    });
  }

  /* Private Methods */

  private loadData(){
    this.apiService.getGame(this.editingGameId!).subscribe({
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
