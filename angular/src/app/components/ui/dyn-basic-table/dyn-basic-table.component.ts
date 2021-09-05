import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

export interface DynBasicTableCol{
  name: string
  type: 'input:text' | 'input:number'
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
  styleUrls: ['./dyn-basic-table.component.css'],
  templateUrl: './dyn-basic-table.component.html'
})
export class DynBasicTableComponent implements OnInit {

  @Input()
  config: DynBasicTableConfig = new DynBasicTableConfig(true, []);

  /**
   * data[rowIndex] = columnWiseData;
   */
  data: string[][];

  get columns(): DynBasicTableCol[]{
    return this.config.columns;
  }

  rowCount: number = 0;

  constructor(
  ) {
    this.data = [];
  }

  ngOnInit(): void {
  }

  // setConfig(config: DynBasicTableConfig){
  //   this.config = config;
  //   console.log("columns", this.config.columns);
  //   // this.changeDetector.markForCheck();
  // }

  addRow(row: string[]){
    // console.log("Row count increased!");
    this.data.push(row);
    this.rowCount += 1;
  }

}
