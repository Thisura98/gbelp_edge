import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { DialogService } from "src/app/services/dialog.service";
import { UserService } from "src/app/services/user.service";

@Component({
  templateUrl: './session.component.html',
  styleUrls: [
    './session.component.css',
    './../common/group.commonstyles.css'
  ]
})
export class GroupsSessionComponent implements OnInit{

  private groupId: string | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private apiService: ApiService,
    private dialogService: DialogService,
  ){}

  ngOnInit(){
    this.userService.routeOutIfLoggedOut();
    this.activatedRoute.queryParamMap.subscribe(map => {
      this.groupId = map.get('groupId') ?? undefined;
      this.loadData();
    });
  }

  private loadData(){
    this.apiService.getGroup(this.groupId!).subscribe(response => {
      if (!response.success){
        const msg = response.description;
        this.dialogService.showDismissable("Data Load Error", msg);

        // Membership error in API.
        if (response.code == 201)
          this.router.navigate(['/dashboard/f/groups']);
        return;
      }
      
      // this.group = response.data;

      // this.loadSessions();
    });
  }

}