import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { DynamicSidebarItem } from "src/app/components/ui/dynamicsidebar/dynamicsidebar.component";

@Component({
  selector: 'app-group-session-create',
  templateUrl: './create.component.html',
  styleUrls: [
    './create.component.css',
    '../../common/group.commonstyles.css'
  ]
})
export class GroupSessionCreateComponent{

  isEditMode = false;
  title = (this.isEditMode ? 'Edit ' : 'Create ') + 'Session';

  selectedGame = "";
  selectedState = "";
  startDateAndTime = "";
  endDateAndTime = "";
  sessionScheduleSummary = "The quick brow fox jumped over the lazy dog";

  get sidebarItems(): DynamicSidebarItem[]{
    return [];
  }

  constructor(
    private location: Location
  ){}

  handleBack(){
    this.location.back();
  }

  createButtonClicked(){
    // todo
  }

  cancelButtonClicked(){
    this.handleBack();
  }

}