import { Location, TitleCasePipe } from '@angular/common';
import { Component, OnInit, AfterContentInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { DynBasicTableComponent, DynBasicTableConfig, DynBasicTableDeleteEvent } from 'src/app/components/ui/dyn-basic-table/dyn-basic-table.component';
import { DynamicSidebarItem } from 'src/app/components/ui/dynamicsidebar/dynamicsidebar.component';
import { getGameSidebarItems, ViewMode } from 'src/app/constants/constants';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { UserService } from 'src/app/services/user.service';
import { GameEntry, kGameEntryParentEntryIdNone, SaveGameRequestData } from '../../../../../../../commons/src/models/game/game';
import { GameObjective } from '../../../../../../../commons/src/models/game/objectives';
import { GameGuidanceTracker } from '../../../../../../../commons/src/models/game/trackers';
import { GameEditConstants } from 'src/app/constants/constants';
import { MetaKeyService } from 'src/app/services/metakey.service';
import { UserTypeNames } from '../../../../../../../commons/src/models/user';

@Component({
  selector: 'app-game-create',
  templateUrl: './create.component.html',
  styleUrls: [
    './create.component.css',
    '../common/game.commonstyles.css'
  ]
})
export class GameCreateComponent implements OnInit {

  readonly kParentEntryIdNone = kGameEntryParentEntryIdNone;

  gameName: string = "";
  gameType: number = 1; // single player
  published: boolean = false;
  templateId: string | null = this.kParentEntryIdNone;
  userLimit: number = 0;
  levelSwitching: number = 1; // time based
  progressBoundType: number = 1;
  repOptObjectiveTracking: boolean = false
  repOptGuidanceTrgTracking: boolean = false
  repOptStudentUsage: boolean = true;
  repOptScore: boolean = false;
  repOptTiming: boolean = true

  disableScoreReports: boolean = true
  disableTimingReports: boolean = false

  /**
   * Is Game or Template mode?
   */
  viewMode = ViewMode.UNKNOWN;
  isEditMode: boolean = false;
  editingGameId: number | undefined;
  editingGame: GameEntry | undefined = undefined;
  isLoading: boolean = false;

  gameObjectives: GameObjective[] = [];
  gameGuidanceTrackers: GameGuidanceTracker[] = [];
  gameTemplates: GameEntry[] = [];

  get sidebarItems(): DynamicSidebarItem[]{
    if (this.isEditMode)
      return getGameSidebarItems('Overview', this.viewMode, undefined);
    return [];
  }

  get title(): string{
    const mode = this.titleCasePipe.transform(this.viewMode);
    const operation = this.isEditMode ? 'Edit' : 'Create'
    return `${operation} ${mode}`;
  }

  constructor(
    private userService: UserService,
    private location: Location,
    private apiService: ApiService,
    private dialogService: DialogService,
    private metaKeyService: MetaKeyService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private titleCasePipe: TitleCasePipe
  ) { }

  ngOnInit(): void {
    this.userService.routeOutIfLoggedOut();

    combineLatest([this.activateRoute.data, this.activateRoute.queryParamMap]).subscribe(([data, route]) => {

      if (data.mode){
        this.viewMode = data.mode;
      }
      
      if (data.editMode){
        this.isEditMode = true;
        this.editingGameId = parseInt(route.get('gameId') ?? "-1", 10);
      }

      this.loadData();

    });
  }

  // MARK: Event Handlers

  /// Create or Save button, depending on whether in Create or Edit mode
  createButtonClicked(){
    const userId = this.userService.getUserAndToken().user.userId;
    let data: SaveGameRequestData = {
      id: '0',
      name: this.gameName,
      author_id: userId!,
      type: this.gameType,
      is_template: this.viewMode == ViewMode.TEMPLATE,
      is_published: this.published,
      parent_entry_id: this.templateId,
      multi_user_limit: this.userLimit,
      level_switch: this.levelSwitching,
      progress_bound_type: this.progressBoundType,
      rep_opt_objectives: Number(this.repOptObjectiveTracking),
      rep_opt_guidance_trg: Number(this.repOptGuidanceTrgTracking),
      rep_opt_student_usg: 1,
      rep_opt_level_score: Number(this.repOptScore),
      rep_opt_level_time: Number(this.repOptTiming),
      objectives: this.gameObjectives,
      trackers: this.gameGuidanceTrackers
    }

    // TODO: Validate fields

    /// MARK: Call Create game or Edit Game accordingly

    if (this.isEditMode){

      // Save Edited Game
      data.id = this.editingGameId!.toString();
      this.apiService.game.saveGame(data).subscribe(response => {
        if (response.success){
          // this.dialogService.showDismissable('Saved Successfully', '');
          this.getObjectivesAndTrackers();
          this.dialogService.showSnackbar('Saved Successfully!');
        }
        else
          this.notifyGameCreationError(response.description);
      });
    }
    else{

      // Create new game, and 
      // get newly created game id
      this.apiService.game.createGame(data).subscribe((response) => {
        if (response.data?.gameId != undefined)
          this.gameCreatedSuccessfully(response.data.gameId);
        else
          this.notifyGameCreationError(response.description)
      });
    }
  }

  canceledButtonClicked(){
    this.handleBack();
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
   * Save the game when user presses Ctlr / Command + S
   */
  @HostListener('document:keydown', ['$event'])
  saveShortcutPressed(e: Event){
    const kbEvent = e as KeyboardEvent;
    if (this.metaKeyService.isMetaKey(kbEvent) && kbEvent.key == 's'){
      e.preventDefault();
      this.createButtonClicked();
    }
  }

  // MARK: Add, Delete, Get Objective view methods

  addNewObjectiveClicked(event: Event){
    event.preventDefault();
    this.gameObjectives.push(
      new GameObjective(undefined, this.editingGameId!, '', '', 0)
    );
  }

  deleteObjectiveClicked(event: DynBasicTableDeleteEvent){
    const index = event.index;
    this.gameObjectives.splice(index, 1);
    this.dialogService.showSnackbar('Refresh page to Undo Delete');
  }

  get objectiveTableConfig(): DynBasicTableConfig{
    return GameEditConstants.objectiveTableConfig;
  }

  // MARK: Add, Delete, Get Trackers view methods

  addNewTrackerClicked(event: Event){
    event.preventDefault();
    this.gameGuidanceTrackers.push(
      new GameGuidanceTracker(undefined, this.editingGameId!, '', '', 0)
    );
  }

  deleteTrackerClicked(event: DynBasicTableDeleteEvent){
    const index = event.index;
    this.gameGuidanceTrackers.splice(index, 1);
    this.dialogService.showSnackbar('Refresh page to Undo Delete');
  }

  get guidanceTrackerTableConfig(): DynBasicTableConfig{
    return GameEditConstants.guidanceTrackerTableConfig;
  }

  // MARK: Private Methods

  private notifyGameCreationError(message: string | null){
    this.dialogService.showDismissable(
      "Error", 
      message ?? "Unknown Error"
    );
  }

  private gameCreatedSuccessfully(gameId: string){
    const target = `${this.viewMode}/edit`;
    this.router.navigate([target], {
      queryParams: {
        gameId: gameId
      },
      replaceUrl: true
    })
  }

  private loadData(){
    // Load Game Template
    this.apiService.game.getAllGames(true, true).subscribe((entries) => {
      this.gameTemplates = entries.data;
    });

    if (!this.isEditMode)
      return;

    this.isLoading = true;

    // Load Game Entry
    this.apiService.game.getGame(this.editingGameId!).subscribe((response) => {
      this.isLoading = false;
      if (response.success)
        this.setEditData(response.data.entry);
      else
        this.loadFailed(response.description);
    });

    this.getObjectivesAndTrackers();
  }

  /**
   * Requests objectives and trackers for this game.
   */
  private getObjectivesAndTrackers(){
    this.apiService.game.getObjectives(this.editingGameId!).subscribe(response => {
      if (response.success)
        this.setObjectives(response.data);
      else
        this.loadFailed(response.description);
    });

    this.apiService.game.getGuidanceTrackers(this.editingGameId!).subscribe(response => {
      if (response.success)
        this.setGuidanceTrackers(response.data);
      else
        this.loadFailed(response.description);
    });
  }

  private loadFailed(reason: string){
    this.dialogService.showDismissable('Data Loading Failed', reason);
  }

  private setEditData(data: GameEntry){

    // Protect Unauthorized Editing

    const user = this.userService.getUserAndToken().user;
    const userId = user.userId;
    const allowedAuthors = data.author_id.split(',');
    const inList = allowedAuthors.find(id => id == userId);

    this.editingGame = data;

    if (inList == undefined){
      if (user.userTypeName == UserTypeNames.admin){
        this.dialogService.showDismissable(
          'Permission Notice', 
          'This game was not created by you. Please be careful when making changes');
      }
      else{
        this.dialogService.showDismissable(
          'No Permission', 
          'You do not have permission to edit this game', 
          () => this.location.back());
        return
      }
    }

    // Set data to UI

    this.gameName = data.name;
    this.gameType = data.type;
    this.published = data.is_published;
    this.templateId = data.parent_entry_id;
    this.userLimit = data.multi_user_limit;
    this.levelSwitching = data.level_switch;
    this.progressBoundType = data.progress_bound_type;
    this.repOptObjectiveTracking = data.rep_opt_objectives == 1;
    this.repOptGuidanceTrgTracking = data.rep_opt_guidance_trg == 1;
    this.repOptStudentUsage = data.rep_opt_student_usg == 1;
    this.repOptScore = data.rep_opt_level_score == 1;
    this.repOptTiming = data.rep_opt_level_time == 1;

    // this.objectivesTable!.setConfig(new DynBasicTableConfig(true, [
    //   {name: "Objective Name", type:"input:text"},
    //   {name: "Description", type:"input:text"},
    //   {name: "Maximum Progress", type:"input:number"},
    // ]))

    // this.objectivesTable!.data = [
    //   ['Example Name', 'Description', '20']
    // ];
  }

  private setObjectives(data: GameObjective[]){
    this.gameObjectives = data;
  }

  private setGuidanceTrackers(data: GameGuidanceTracker[]){
    this.gameGuidanceTrackers = data;
  }

}
