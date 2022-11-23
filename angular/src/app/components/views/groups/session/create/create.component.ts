import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DynamicSidebarItem } from "src/app/components/ui/dynamicsidebar/dynamicsidebar.component";
import { ServerResponseAllGameEntries } from "src/app/models/game/game";
import { ApiService } from "src/app/services/api.service";
import { DialogService } from "src/app/services/dialog.service";
import { UserService } from "src/app/services/user.service";
import { GameEntry } from "../../../../../../../../commons/src/models/game/game";

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
  title = (this.isEditMode ? 'Edit ' : 'Create ') + 'Session';

  selectedGame = "";
  selectedState = "";
  startDateAndTime = "";
  endDateAndTime = "";
  sessionScheduleSummary = "The quick brow fox jumped over the lazy dog";

  games: GameEntry[] | undefined;

  get sidebarItems(): DynamicSidebarItem[]{
    return [];
  }

  constructor(
    private location: Location,
    private userService: UserService,
    private apiService: ApiService,
    private dialogService: DialogService
  ){}

  ngOnInit(){
    this.loadData();
  }

  handleBack(){
    this.location.back();
  }

  createButtonClicked(){
    // todo
  }

  cancelButtonClicked(){
    this.handleBack();
  }

  private loadData(){
    this.userService.routeOutIfLoggedOut();
    let userId = this.userService.getUserAndToken().user?.userId

    if (userId == null){
      return;
    }

    this.apiService.game.getAllGames(false, userId!).subscribe(
      res => this.handleGamesResponse(res), 
      (error) => this.handleError(error)
    );
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

}