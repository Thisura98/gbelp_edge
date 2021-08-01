import { Component, Input, Output, OnInit, EventEmitter, HostBinding } from '@angular/core';
import { GameLevel, GameLevelHelper } from '../../../../../../../../../commons/src/models/game/levels';

@Component({
  selector: 'app-game-edit-level-item',
  template: `

  <div class="asset dyn-anim-fadein-delayed" 
    (click)="onSelect.emit(level)">
    <div class="asset-img-container">
      <img class="asset-img" src="assets/game/levelbg.png"/>
      <img class="asset-img-locked" src="assets/game/levellock.png" *ngIf="level?.locked ?? false" />
      <div class="asset-type">{{levelType}}</div>
    </div>
    <div class="asset-name">{{level!.name | titlecase}}</div>
  </div>

  `,
  styleUrls: ['./item.component.css']
})
export class GameEditLevelItemComponent implements OnInit {

  @Input() level: GameLevel | undefined;
  @Input() @HostBinding('class.asset-selected') isSelected: boolean = false
  @Output() onSelect: EventEmitter<GameLevel> = new EventEmitter();

  constructor(
  ) { }

  ngOnInit(): void {
    // console.log(this.type, this.name, this.isSelected);
  }

  get levelType(): string{
    let type = GameLevelHelper.getFriendlyLevelType(this.level).toUpperCase();
    return type;
  }
}
