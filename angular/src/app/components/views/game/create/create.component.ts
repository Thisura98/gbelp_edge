import { Location } from '@angular/common';
import { Component, OnInit, AfterContentInit, ViewChild } from '@angular/core';
import { DynBasicTableComponent, DynBasicTableConfig } from 'src/app/components/ui/dyn-basic-table/dyn-basic-table.component';
import { DynamicSidebarItem } from 'src/app/components/ui/dynamicsidebar/dynamicsidebar.component';
import { getGameSidebarItems } from 'src/app/constants/constants';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-game-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class GameCreateComponent implements OnInit {

  @ViewChild('objectivesTable', {static: true})
  objectivesTable: DynBasicTableComponent | undefined;

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

  constructor(
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.userService.routeOutIfLoggedOut();
  }

  createButtonClicked(){
    console.log("Game Name", this.gameName);
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

}
