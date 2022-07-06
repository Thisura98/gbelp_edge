import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameEntry } from '../../../../../../../commons/src/models/game/game';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { UserService } from 'src/app/services/user.service';
import { ViewMode } from 'src/app/constants/constants';

@Component({
  selector: 'app-game-create',
  templateUrl: './delete.component.html',
  styleUrls: [
    './delete.component.css',
    '../common/game.commonstyles.css'
  ]
})
export class GameDeleteComponent implements OnInit {

  gameName: string | undefined;
  viewMode: string = ViewMode.UNKNOWN;

  isDeleteDisabled: boolean = true;

  private gameId: number | undefined;
  private game: GameEntry | undefined;

  constructor(
    private apiService: ApiService,
    private dialogService: DialogService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.userService.routeOutIfLoggedOut();
    this.activatedRoute.data.subscribe(data => {
      this.viewMode = data.mode;
      this.loadData();
    });
  }

  cancelButtonClicked(){
    this.location.back();
  }

  deleteButtonClicked(){
    this.apiService.game.deleteGame(this.gameId!.toString()).subscribe((res) => {
      if (res.success){
        this.dialogService.showDismissable(
          'Deleted Sucessfully!', '', () => {this.cancelButtonClicked()}
        );
      }
      else
        this.dialogService.showDismissable('Delete operation failed', res.description);
    })
  }

  private loadData(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.gameId = params['gameId'];

      this.apiService.game.getGame(this.gameId!).subscribe((data) => {
        if (data.data != undefined){
          this.game = data.data.entry;
          this.gameName = this.game.name;
          this.isDeleteDisabled = false;
        }
        else{
          this.handleDataLoadError('Could not load data');
        }
      });
    });
  }

  private handleDataLoadError(message: any){
    this.dialogService.showDismissable('Error Load Data', message, () => {
      this.cancelButtonClicked();
    })
  }

}
