import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-player-controlbtn',
  template: `
  <div class="circle" [class.danger]="dangerous" [class.flash]="flash">
    <img [src]="assetName"/>
  </div>
  <div class="title" [class.danger]="dangerous" [class.flash]="flash">
    {{title}}
  </div>
  `,
  styleUrls: ['./controlbtn.component.css']
})
export class PlayerControlButtonComponent{
  @Input()
  imageName: string | undefined;

  @Input()
  flashImage: string | undefined;

  @Input()
  title: string | undefined;

  @Input()
  flash: boolean = false;

  @Input()
  dangerous: boolean = false;

  get assetName(): string{
    const prefix = 'assets/';

    if (this.flash && this.flashImage != undefined){
      return `${prefix}${this.flashImage!}`;
    }
    
    return `${prefix}${this.imageName ?? ""}`;
  }
}