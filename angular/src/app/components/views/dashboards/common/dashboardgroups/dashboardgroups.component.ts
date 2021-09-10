import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { UserService } from 'src/app/services/user.service';
import { UserGroup } from '../../../../../../../../commons/src/models/groups';

interface IGroupDetailsRow{
  group_id: number,
  name: string,
  description: string | undefined,
  banned_user_ids: string | undefined,
  invite_link: string | undefined,
  user_limit: number,
  member_count: number,
}

@Component({
  selector: 'app-dashboardgroups',
  templateUrl: './dashboardgroups.component.html',
  styleUrls: ['./dashboardgroups.component.css']
})
export class DashboardgroupsComponent implements OnInit {

  isLoading = true
  data: IGroupDetailsRow[] = []
  displayedData: IGroupDetailsRow[] = []
  searchTerm: string = '';
  isSearching: boolean = false;

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.userService.routeOutIfLoggedOut();
    this.loadData();
  }

  createInviteLinkForRow(data: IGroupDetailsRow): string{
    return `/groups/join/${data.group_id}`;
  }

  searchInputChanged(event: Event){
    const element = event.target as HTMLInputElement;
    const term = element.value;
    this.searchTerm = term;
    this.filterDisplayData();
  }

  /* Private Methods */

  private loadData(){
    this.apiService.getGroupsForUser().subscribe(data => {
      this.isLoading = false;
      if (!data.success){
        this.dialogService.showDismissable(
          "Data Load Error",
          data.description
        );
        return;
      }

      this.data = data.data;
      this.filterDisplayData();
    });
  }

  private filterDisplayData(){
    if (this.searchTerm.trim().length == 0){
      this.isSearching = false;
      this.displayedData = this.data;
      return;
    }

    const search = new RegExp(this.searchTerm);
    const filtered = this.data.filter(v => {
      return v.name.search(search) != -1;
    });

    this.isSearching = true;
    this.displayedData = filtered;
  }

}
