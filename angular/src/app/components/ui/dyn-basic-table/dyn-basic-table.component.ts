import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

export interface DynBasicTableCol{
  name: string
  type: string
}

export class DynBasicTableConfig{
  showDelete: boolean
  columns: DynBasicTableCol[]
  constructor(showDelete: boolean, columns: DynBasicTableCol[]){
    this.showDelete = showDelete
    this.columns = columns;
  }
}

@Component({
  selector: 'dyn-basic-table',
  template: `
    <table>
      <thead>
        <tr>
          <td *ngFor="let col of config.columns">
            {{col.name}}
          </td>
          <td *ngIf="config.showDelete">
            Actions
          </td>
        </tr>
      </thead>
    </table>
  `
})
export class DynBasicTableComponent implements OnInit {

  config: DynBasicTableConfig = new DynBasicTableConfig(true, []);

  /**
   * row[column] = data
   */
  data: Map<number, Map<string, string>>;

  rowCount: number = 0;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) {
    this.data = new Map();
  }

  ngOnInit(): void {
  }

  setConfig(config: DynBasicTableConfig){
    this.config = config;
    // console.log("columns", this.config.columns);
    // this.changeDetector.markForCheck();
  }

  addRow(){
    // console.log("Row count increased!");
    this.rowCount += 1;
  }

}
