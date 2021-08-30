import { Component, OnInit } from '@angular/core';
import { getGameSidebarItems } from 'src/app/constants/constants';
import { DynamicSidebarItem } from 'src/app/components/ui/dynamicsidebar/dynamicsidebar.component';
import { GameLevel } from '../../../../../../../../commons/src/models/game/levels';
import { GameListing, ServerResponseGameListing } from 'src/app/models/game/game';
import { ActivatedRoute } from '@angular/router';
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
  
  private editingGameId: number | undefined;
  private gameListing: GameListing | undefined;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private apiService: ApiService,
    private dialogService: DialogService,
    private editorDataService: EditorDataService,
  ) { }

  ngOnInit(): void {
    this.userService.routeOutIfLoggedOut();

    this.activatedRoute.queryParams.subscribe((map) => {
      this.editingGameId = map['gameId'];
      this.loadData();
    });
  }

  /* private methods */

  private loadData(){
    if (!this.editingGameId){
      this.handleError('Game Id Not Found');
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
    this.editorDataService.setData(response);
  }

  private handleError(error: any){
    let displayMsg = "";
    if (typeof error == 'string')
      displayMsg = error;
    else
      displayMsg = JSON.stringify(error);

    this.dialogService.showDismissable('Error', displayMsg);
  }

}
