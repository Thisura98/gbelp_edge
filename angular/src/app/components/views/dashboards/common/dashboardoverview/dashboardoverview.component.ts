import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GameSessionTableActionEvent, GroupsSessionTable } from 'src/app/components/ui/groups/session-data-table/groups.sessiontable';
import { ServerResponseSessionsForUser } from 'src/app/models/session';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { UserService } from 'src/app/services/user.service';
import { GameSessionWithExtensions } from '../../../../../../../../commons/src/models/session';

@Component({
  selector: 'app-dashboardoverview',
  templateUrl: './dashboardoverview.component.html',
  styleUrls: ['./dashboardoverview.component.css']
})
export class DashboardoverviewComponent implements OnInit {

  isLoading = false;
  sessions: GameSessionWithExtensions[] = [];

  @ViewChild(GroupsSessionTable)
  sessionTable: GroupsSessionTable | undefined;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private apiService: ApiService,
    private userService: UserService,
    private dialogService: DialogService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userService.routeOutIfLoggedOut();

    this.loadData();
  }

  handleTableSelect(row: GameSessionWithExtensions){
    this.router.navigate(['groups/sessions'], {
      queryParams: {
        groupId: row.group_id
      }
    })

  }

  // handleTableActionSelect(event: GameSessionTableActionEvent){
  //   console.log('Todo:', event.action);
  // }

  private loadData(){
    this.isLoading = true;
    this.apiService.session.getSessionsForUser().subscribe(
      results => this.handleDataLoaded(results),
      error => this.handleLoadError(error)
    )
  }

  private handleDataLoaded(response: ServerResponseSessionsForUser){
    this.isLoading = false;
    if (response.data == null){
      this.handleLoadError('Response data was null');
    }
    else{
      this.sessions = response.data;
      this.changeDetectorRef.detectChanges();
      this.sessionTable!.setRawData(this.sessions, true);
    }
  }

  private handleLoadError(error: any){
    const str = String(error);
    this.dialogService.showDismissable(
      'Error loading data',
      str
    );
  }

}
