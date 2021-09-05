import { Component, Input, Output, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';

export interface DynBasicTableCol{
  /**
   * Human readlable name for this column
   */
  name: string
  /**
   * The corresponding object property for this column
   */
  property: string
  type: 'static' | 'input:text' | 'input:number'
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

  @Input()
  cellHeight: string = '30';

  @Output()
  delete = new EventEmitter<any>();

  /**
   * data[rowIndex] = columnWiseData;
   */
  @Input()
  data: any[];

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

  getObjectKeys(obj: any): string[]{
    return Object.keys(obj);
  }

}
