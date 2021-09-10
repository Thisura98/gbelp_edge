import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicSidebarItem } from 'src/app/components/ui/dynamicsidebar/dynamicsidebar.component';
import { getGroupSidebarItems } from 'src/app/constants/constants';

@Component({
  selector: 'app-create-group',
  templateUrl: './create.component.html',
  styleUrls: [
    './create.component.css',
    '../common/group.commonstyles.css'
  ]
})
export class GroupCreateComponent implements OnInit {
  
  get sidebarItems(): DynamicSidebarItem[]{
    return getGroupSidebarItems('Overview');
  }

  constructor(
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  handleBack(){
    this.router.navigate(['/dashboard/teacher/groups']);
  }

}
