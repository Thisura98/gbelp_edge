import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-player-controlbtn',
  template: `
  <div class="circle" [class.danger]="dangerous">
    <img [src]="assetName"/>
  </div>
  <div class="title" [class.danger]="dangerous">
    {{title}}
  </div>
  `,
  styleUrls: ['./controlbtn.component.css']
})
export class PlayerControlButtonComponent{
  @Input()
  imageName: string | undefined;

  @Input()
  title: string | undefined;

  @Input()
  dangerous: boolean = false;

  get assetName(): string{
    return `assets/${this.imageName ?? ""}`;
  }
}