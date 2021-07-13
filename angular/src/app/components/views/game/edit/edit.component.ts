import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { DynBasicTableComponent, DynBasicTableConfig } from 'src/app/components/ui/dyn-basic-table/dyn-basic-table.component';
import { DynamicSidebarItem } from 'src/app/components/ui/dynamicsidebar/dynamicsidebar.component';
import { getGameSidebarItems } from 'src/app/constants/constants';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class GameEditComponent implements OnInit, AfterContentInit {

  @ViewChild('objectivesTable', {static: true})
  objectivesTable: DynBasicTableComponent | undefined;

  get sidebarItems(): DynamicSidebarItem[]{
    return getGameSidebarItems();
  }

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.routeOutIfLoggedOut();
  }

  ngAfterContentInit(): void{
    /**
     * static: true elements run before change detection happens.
     * If we change values in ngAfterViewInit, it will cause, 
     * ExpressionChangedAfterItHasBeenCheckedError.
     * 
     * So doing it here, before afterViewInit and with static:true
     * is the best option.
     */
    this.objectivesTable!.setConfig(new DynBasicTableConfig(true, [
      {name: "Objective Name", type:"input:text"},
      {name: "Description", type:"input:text"},
      {name: "Maximum Progress", type:"input:number"},
    ]))
  }

  addNewObjectiveClicked(event: Event){
    event.preventDefault();
    this.objectivesTable!.addRow();
  }

}
