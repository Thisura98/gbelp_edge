import { Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dyn-checkbox',
  template: `
    <style>
      :host{
        display: flex;
        align-items: center;
        -webkit-user-select: none; /* Safari */        
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none; /* Standard */
      }
      .tick{
        width: 17px;
        height: 17px;
      }
      .text-container{
        margin-left: 10px;
      }
    </style>
    <img class="tick" src="{{image}}">
    <div class="text-container" [style.color]="textColor">{{text}}</div>
  `,
})
/**
 * Use text, checked and disabled properties
 */
export class DynCheckboxComponent implements OnInit {

  @Input()
  text: string | undefined

  @Input()
  checked: boolean = false

  @Input()
  disabled: boolean = false

  @HostBinding('style.cursor')
  get cursor(): string{
    if (this.disabled)
      return "not-allowed";
    return "pointer";
  }

  get image(): string{
    const prefix = "assets/common/check";
    if (this.checked && this.disabled)
      return prefix + "_checked_disabled.png"
    else if(this.checked)
      return prefix + "_checked.png"
    else if (this.disabled)
      return prefix + "_disabled.png"
    else
      return prefix + ".png";
  }

  get pointer(): string{
    if (this.disabled)
      return "not-allowed";
    return "pointer"
  }
  
  get textColor(): string{
    if (this.disabled)
      return "#BEBEBE";
    return "#000";
  }

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('click', ['$event'])
  clicked(e: any){
    if (this.disabled)
      return;
    this.checked = !this.checked;
  }

}
