import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-edit-level-item',
  template: `
  <div>
    {{type | uppercase}}
    {{name}}
  </div>
  `,
  styleUrls: ['./item.component.css']
})
export class GameEditLevelItemComponent implements OnInit {

  @Input() type: string = ""
  @Input() name: string = ""
  @Input() isSelected: boolean = false
  @Input() isLocked: boolean = false

  constructor() { }

  ngOnInit(): void {
    console.log(this.type, this.name, this.isSelected);
  }

}
