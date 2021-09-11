import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-stateful-btn',
  template: `
  <div 
    class="dyn-btn clickable btn-stateful"
    [class.dyn-btn-disabled]="isLoading">
    {{isLoading ? "" : text}}
    <mat-progress-spinner class="statefulbtn-progress"
        *ngIf="isLoading" [diameter]="20" mode="indeterminate">
    </mat-progress-spinner>
</div>
  `,
  styles: [
    `
    :host /deep/.statefulbtn-progress.mat-progress-spinner circle, 
    :host /deep/.statefulbtn-progress.mat-spinner circle {
      stroke: #ffffff;
    }
    .btn-stateful{
      justify-content: center;
    }
    `
  ]
})
export class StatefulButton{

  @Input()
  isLoading: boolean = false

  @Input()
  /**
   * Bind to the text displayed when not loading
   */
  text: string = ""

}