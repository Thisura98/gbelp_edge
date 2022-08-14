import { Component, Input, Output, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AnyToStringPipe } from 'src/app/pipes/any-to-string.pipe';

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
  staticFormatter?: (input: string) => string
}

export interface DynBasicTableDeleteEvent{
  object: any
  index: number
}

export class DynBasicTableConfig{
  showDelete: boolean
  columns: DynBasicTableCol[]
  textAlign?: string = 'left';
  constructor(showDelete: boolean, columns: DynBasicTableCol[], textAlign: string = 'left'){
    this.showDelete = showDelete
    this.columns = columns;
    this.textAlign = textAlign;
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
  delete = new EventEmitter<DynBasicTableDeleteEvent>();

  /**
   * data[rowIndex] = columnWiseData;
   */
  @Input()
  data: any[];

  // @Output()
  // dataChanged = new EventEmitter<any[]>();

  get columns(): DynBasicTableCol[]{
    return this.config.columns;
  }

  rowCount: number = 0;

  constructor(
    private anyToStringPipe: AnyToStringPipe
  ) {
    this.data = [];
  }

  ngOnInit(): void {
  }

  getObjectKeys(obj: any): string[]{
    return Object.keys(obj);
  }

  updateData(event: Event, item: any, property: string){
    const elem = event.target as HTMLTextAreaElement;
    item[property] = elem.value;
  }

  emitDeleteEvent(obj: any, index: number){
    this.delete.emit({object: obj, index: index});
  }

  formattedOrRaw(data: any, col: DynBasicTableCol): string{
    const str = this.anyToStringPipe.transform(data);
    return col.staticFormatter == undefined ? str : col.staticFormatter!(str);
  }

}
