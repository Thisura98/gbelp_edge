import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-game-edit-levels-add',
  templateUrl: './add.component.html',
  styleUrls: [
    './add.component.css',
    '../../../common/game.commonstyles.css'
  ]
})
export class GameEditLevelsAddComponentComponent implements OnInit {

  editingGameId: number | undefined;

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
    this.activateRoute.queryParams.subscribe((p) => {
      this.editingGameId = p['gameId'];
    })
  }

  handleBack(){
    const type = this.userService.getNavSafeUserType();
    this.router.navigate([
      `/game/edit/levels`
    ], {
      queryParams: {
        gameId: this.editingGameId
      }
    });
  }

  addButtonPressed(){

  }

  cancelButtonPressed(){
    this.handleBack()
  }

}
