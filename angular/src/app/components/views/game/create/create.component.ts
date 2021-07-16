import { Location } from '@angular/common';
import { Component, OnInit, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { DynBasicTableComponent, DynBasicTableConfig } from 'src/app/components/ui/dyn-basic-table/dyn-basic-table.component';
import { DynamicSidebarItem } from 'src/app/components/ui/dynamicsidebar/dynamicsidebar.component';
import { getGameSidebarItems } from 'src/app/constants/constants';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { UserService } from 'src/app/services/user.service';
import { GameEntry } from '../../../../models/game';

@Component({
  selector: 'app-game-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class GameCreateComponent implements OnInit, AfterContentInit {

  @ViewChild('objectivesTable', {static: true})
  objectivesTable: DynBasicTableComponent | undefined;

  @ViewChild('objectivesForm', {static: true})
  objectivesForm: ElementRef | undefined;

  gameName: string = ""
  gameType: number = 1 // single player
  userLimit: number = 0
  levelSwitching: number = 1; // time based
  progressBoundType: number = 1;
  repOptObjectiveTracking: boolean = false
  repOptGuidanceTrgTracking: boolean = false
  repOptStudentUsage: boolean = true;
  repOptScore: boolean = false;
  repOptTiming: boolean = true

  disableScoreReports: boolean = true
  disableTimingReports: boolean = false

  isEditMode: boolean = false;
  editingGameId: number | undefined;
  isLoading: boolean = false;

  get sidebarItems(): DynamicSidebarItem[]{
    if (this.isEditMode)
      return getGameSidebarItems('Overview');
    return [];
  }

  constructor(
    private userService: UserService,
    private location: Location,
    private apiService: ApiService,
    private dialogService: DialogService,
    private activateRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userService.routeOutIfLoggedOut();

    combineLatest([this.activateRoute.data, this.activateRoute.queryParamMap]).subscribe(([data, route]) => {
      
      if (data.editMode){
        this.isEditMode = true;
        this.editingGameId = parseInt(route.get('gameId') ?? "-1", 10);
        this.ngAfterContentInit();
        this.loadData();
      }

    });
  }

  createButtonClicked(){
    const userId = this.userService.getUserAndToken().user.userId;
    let data = {
      id: 0,
      name: this.gameName,
      author_id: userId,
      type: this.gameType,
      multi_user_limit: this.userLimit,
      level_switch: this.levelSwitching,
      progress_bound_type: this.progressBoundType,
      rep_opt_objectives: this.repOptObjectiveTracking,
      rep_opt_guidance_trg: this.repOptGuidanceTrgTracking,
      rep_opt_student_usg: true,
      rep_opt_level_score: this.repOptScore,
      rep_opt_level_time: this.repOptTiming
    }

    /// MARK: Call Create game or Edit Game accordingly

    if (this.isEditMode){

      // Save Edited Game
      data.id = this.editingGameId!;
      this.apiService.editGame(data).subscribe({
        next: (response) => {
          if (response.success)
            this.dialogService.showDismissable('Saved Successfully', '');
          else
            this.notifyGameCreationError(response.description);
        },
        error: (err) => {
          this.notifyGameCreationError(JSON.stringify(err));
        }
      })
    }
    else{

      // Create new game, and 
      // get newly created game id
      this.apiService.createGame(data).subscribe({
        next: (response) => {
          if (response.data.gameId != null)
            this.gameCreatedSuccessfully(response.data.gameId);
          else
            this.notifyGameCreationError("Unknown error")
        },
        error: (err) => {
          this.notifyGameCreationError(err as string);
        },
      });
    }
  }

  private notifyGameCreationError(message: string | null){
    this.dialogService.showDismissable(
      "Error", 
      message ?? "Unknown Error"
    );
  }

  private gameCreatedSuccessfully(gameId: string){
    console.log("not implemented yet.", gameId);
    this.router.navigate(['game/edit'], {
      queryParams: {
        gameId: gameId
      },
      replaceUrl: true
    })
  }

  private loadData(){
    if (!this.isEditMode)
      return;

    const loadFailed = (reason: string) => {
      this.dialogService.showDismissable('Game Load Failed', reason);
    }

    this.isLoading = true;
    this.apiService.getGame(this.editingGameId!).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success)
          this.setEditData(response.data);
        else
          loadFailed(response.description);
      },
      error: (err) => {
        this.isLoading = false
        loadFailed(err)
      }
    });
  }

  private setEditData(data: GameEntry){

    // Protect Unauthorized Editing

    const userId = this.userService.getUserAndToken().user.userId;
    const allowedAuthors = data.author_id.split(',');
    const inList = allowedAuthors.find(id => id == userId);

    if (inList == undefined){
      this.dialogService.showDismissable('No Permission', 'You do not have permission to edit this game', () => {
        this.location.back();
      });
      return
    }

    // Set data to UI

    this.gameName = data.name;
    this.gameType = data.type;
    this.userLimit = data.multi_user_limit;
    this.levelSwitching = data.level_switch;
    this.progressBoundType = data.progress_bound_type;
    this.repOptObjectiveTracking = data.rep_opt_objectives == 1;
    this.repOptGuidanceTrgTracking = data.rep_opt_guidance_trg == 1;
    this.repOptStudentUsage = data.rep_opt_student_usg == 1;
    this.repOptScore = data.rep_opt_level_score == 1;
    this.repOptTiming = data.rep_opt_level_time == 1;
  }

  canceledButtonClicked(){
    this.location.back();
  }

  gameTypeDidChange(){
    console.log("new game type", this.gameType);
  }

  levelSwitchingDidChange(){
    if (this.levelSwitching == 1){
      // Time Based
      this.repOptScore = false;
      this.disableScoreReports = true;
      this.disableTimingReports = false;
    }
    else if (this.levelSwitching == 2){
      // Score Based
      this.repOptTiming = false;
      this.disableScoreReports = false;
      this.disableTimingReports = true;
    }
    else if (this.levelSwitching == 3){
      // Manual
      this.repOptTiming = false
      this.repOptScore = false;
      this.disableScoreReports = true;
      this.disableTimingReports = true;
    }
  }

  // MARK: Edit

  ngAfterContentInit(): void{
    if (!this.isEditMode){
      this.objectivesForm!.nativeElement?.remove();
      return;
    }

    /**
     * static: true elements run before change detection happens.
     * If we change values in ngAfterViewInit, it will cause, 
     * ExpressionChangedAfterItHasBeenCheckedError.
     * 
     * So doing it here, before afterViewInit and with static:true
     * is the best option.
     */
    this.objectivesTable!.setConfig(new DynBasicTableConfig(true, [
      {name: "Objective Name", type:"input:text"},
      {name: "Description", type:"input:text"},
      {name: "Maximum Progress", type:"input:number"},
    ]))
  }

  addNewObjectiveClicked(event: Event){
    event.preventDefault();
    this.objectivesTable!.addRow();
  }

}
