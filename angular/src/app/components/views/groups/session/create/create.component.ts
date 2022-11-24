import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { combineLatest } from "rxjs";
import { DynamicSidebarItem } from "src/app/components/ui/dynamicsidebar/dynamicsidebar.component";
import { TimeConstants } from "src/app/constants/constants";
import { ServerResponse, ServerResponsePlain } from "src/app/models/common-models";
import { ServerResponseAllGameEntries } from "src/app/models/game/game";
import { ServerResponseSessionCreate } from "src/app/models/session";
import { ApiService } from "src/app/services/api.service";
import { DialogService } from "src/app/services/dialog.service";
import { UserService } from "src/app/services/user.service";
import { GameEntry } from "../../../../../../../../commons/src/models/game/game";
import { UserGroupMember, UserGroupMemberData } from "../../../../../../../../commons/src/models/groups/member";
import { GameSession, GameSessionState, GameSessionType } from "../../../../../../../../commons/src/models/session";

@Component({
  selector: 'app-group-session-create',
  templateUrl: './create.component.html',
  styleUrls: [
    './create.component.css',
    '../../common/group.commonstyles.css'
  ]
})
export class GroupSessionCreateComponent implements OnInit{

  isEditMode = false;
  get title(): string{
    return (this.isEditMode ? 'Edit ' : 'Create ') + 'Session';
  }

  groupId = "";
  selectedGame = "";
  selectedState = "";
  startDateAndTime: string | undefined;
  endDateAndTime: string | undefined;
  hasDateError = false;
  sessionScheduleSummary = "Select start and end time to create a session...";

  games: GameEntry[] | undefined;
  states: { [key: number] : string } | undefined;

  private editSessionId = "";
  private editingSession: GameSession | undefined;
  private groupUsers: UserGroupMemberData | undefined;

  get sidebarItems(): DynamicSidebarItem[]{
    return [];
  }

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private apiService: ApiService,
    private dialogService: DialogService
  ){}

  ngOnInit(){
    this.setStates();
    this.loadData();
  }

  handleBack(){
    this.location.back();
  }

  // Create or Edit button
  createButtonClicked(){
    this.validateDates();

    if (!this.hasDateError){
      if (this.selectedGame.length == 0){
        this.dialogService.showDismissable("Cannot create session", "Please select a game and retry.");
        return;
      }

      if (this.isEditMode){
        this.saveSession();
      }
      else{
        this.createSession();
      }
    }
  }

  cancelButtonClicked(){
    this.handleBack();
  }

  validateDates(){
    if (this.startDateAndTime == undefined){
      this.hasDateError = true;
      this.sessionScheduleSummary = 'Enter valid start date & time';
    }
    else if (this.endDateAndTime == undefined){
      this.hasDateError = true;
      this.sessionScheduleSummary = 'Enter valid end date & time';
    }
    else if (this.endDateAndTime < this.startDateAndTime){
      this.hasDateError = true;
      this.sessionScheduleSummary = 'End date must be after start date';
    }
    else{
      this.hasDateError = false;
      this.sessionScheduleSummary = this.getSessionDurationString();
    }
  }

  /**
   * Session States Dropdown values
   */
  private setStates(){
      var states: { [key: number] : string } = {};
      states[GameSessionState.canceled] = 'Canceled';
      states[GameSessionState.complete] = 'Complete';
      states[GameSessionState.live] = 'Live';
      states[GameSessionState.multiplayerReady] = 'Multiplayer Ready';
      states[GameSessionState.multiplayerStaging] = 'Multiplayer Staging';
      states[GameSessionState.scheduled] = 'Scheduled';

      this.states = states;
  }

  /**
   * Get the duration of the session as text
   */
  private getSessionDurationString(): string{
    let startDate = new Date(this.startDateAndTime!);
    let endDate = new Date(this.endDateAndTime!);
    let diff = (endDate.getTime() - startDate.getTime()) / 1000;  // in seconds
    let text = 'Session will be open for ';

    let components: string[] = [];

    let intervals: { [key: string] : number } = {
      'day': TimeConstants.oneDayInSeconds, 
      'hour': TimeConstants.oneHourInSeconds,
      'minute': TimeConstants.oneMinuteInSeconds,
      'second': 1
    };

    for (let str in intervals){
      const interval = intervals[str];

      if (diff > interval){
        const val = Math.floor(diff / interval);
        const plural = val > 1 ? 's' : '';
        components.push(val.toFixed(0).toString() + ` ${str}${plural}`);
        diff -= val * interval;
      }
    }
    
    text = text + components.join(', ');

    return text;
  }

  private loadData(){
    this.userService.routeOutIfLoggedOut();

    // Get isEditMode & GroupID 
    combineLatest([
      this.activatedRoute.data,
      this.activatedRoute.params,
    ])
    .subscribe(([data, params]) => {
      this.isEditMode = data.editMode;

      if (this.isEditMode){
        this.editSessionId = params.sessionId;
        this.loadSession(); // calls getMembersAndGames();
      }
      else{
        this.groupId = params.groupId
        this.getMembersAndGames();
      }
    });
  }

  private loadSession(){
    this.apiService.session.getSession(this.editSessionId).subscribe(
      response => this.handleSessionLoadResponse(response),
      err => this.handleError(err)
    )
  }

  private getMembersAndGames(){
    let userId = this.userService.getUserAndToken().user?.userId

    if (userId == null){
      return;
    }

    // Get Group Members
    this.apiService.group.getGroupMembers(this.groupId, undefined).subscribe(
      response => {
        this.groupUsers = response.data;

        // Get Games List
        this.apiService.game.getAllGames(false, userId!).subscribe(
          res => this.handleGamesResponse(res), 
          error => this.handleError(error)
        );
      },
      error => this.handleError(error)
    )
  }

  private handleSessionLoadResponse(response: ServerResponse<GameSession>){
    if (response == null){
      this.handleError('Session response was null');
      return;
    }
    else if (!response.success){
      this.handleError(response.description);
    }
    else{
      const session = response.data;
      this.editingSession = session;
      this.groupId = session.group_id.toString();
      this.selectedState = session.state.toString();
      this.selectedGame = session.game_entry_id.toString();
      this.startDateAndTime = session.start_time;
      this.endDateAndTime = session.end_time;
      this.validateDates();

      this.getMembersAndGames();
    }
  }

  private handleGamesResponse(data: ServerResponseAllGameEntries | null){
    
    if (data == null){
      this.handleError('Games list could not be loaded');
      return;
    }
    
    this.games = data.data;
  }

  private handleError(data: any){
    const title = 'Error Occurred';
    const msg = typeof(data) === 'string' ? data : String(data).toString();
    this.dialogService.showDismissable(title, msg);
  }

  /**
   * Returns UserIDs of all members in this session's group
   */
  private getSessionUsers(): string[]{
    let users: UserGroupMember[] = this.groupUsers!.parents;
    users = users.concat(this.groupUsers!.privileged);
    users = users.concat(this.groupUsers!.students);
    users = users.concat(this.groupUsers!.teachers);
    return users.map(u => u.user_id);
  }

  /**
   * Create new session (isEditeMode = false)
   */
  private createSession(){
    this.apiService.session.createSession(
      GameSessionType.single.toString(),
      GameSessionState.scheduled.toString(),
      this.selectedGame,
      this.groupId!,
      this.startDateAndTime!,
      this.endDateAndTime!,
      this.getSessionUsers()
    )
    .subscribe(
      res => this.handleCreateSessionResponse(res),
      err => this.handleCreateSessionError(err)
    )
  }

  private handleCreateSessionResponse(response: ServerResponseSessionCreate){
    if (response == null){
      this.handleCreateSessionError('Response was null');
    }
    else{
      this.dialogService.showSnackbar('Session created!');
      this.router.navigate([`groups/sessions/edit/${response.data.session_id}`], {
        replaceUrl: true
      })
    }
  }

  private handleCreateSessionError(err: any){
    this.dialogService.showDismissable('Error creating session', String(err));
  }

  /**
   * Save new session (isEditeMode = true)
   */
  private saveSession(){
    this.apiService.session.saveSession(
      this.editSessionId,
      GameSessionType.single.toString(),
      GameSessionState.scheduled.toString(),
      this.selectedGame,
      this.groupId!,
      this.startDateAndTime!,
      this.endDateAndTime!,
      this.getSessionUsers()
    )
    .subscribe(
      res => this.handleSaveSessionResponse(res),
      err => this.handleError(err)
    )
  }

  private handleSaveSessionResponse(response: ServerResponsePlain){
    if (response == null){
      this.handleCreateSessionError('Response was null');
    }
    else{
      this.dialogService.showSnackbar('Session saved!');
      this.router.navigate(['groups/sessions'], {
        queryParams: {
          groupId: this.groupId
        },
        replaceUrl: true
      })
    }
  }

}