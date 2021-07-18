import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameEntry } from 'src/app/models/game';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { UserService } from 'src/app/services/user.service';

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
    this.loadData();
  }

  cancelButtonClicked(){
    this.location.back();
  }

  deleteButtonClicked(){
    this.apiService.deleteGame(this.gameId!.toString()).subscribe({
      next: (res) => {
        if (res.success)
          this.dialogService.showDismissable('Deleted Sucessfully!', '', () => {this.cancelButtonClicked()})
        else
        this.dialogService.showDismissable('Delete operation failed', res.description);
      },
      error: (err) => {
        this.dialogService.showDismissable('Delete operation failed', JSON.stringify(err));
      }
    })
  }

  private loadData(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.gameId = params['gameId'];

      this.apiService.getGame(this.gameId!).subscribe({
        next: (data) => {
          if (data.data != undefined){
            this.game = data.data;
            this.gameName = this.game.name;
            this.isDeleteDisabled = false;
          }
          else{
            this.handleDataLoadError('Could not load data');
          }
        },
        error: (err) => {
          this.handleDataLoadError(JSON.stringify(err));
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
