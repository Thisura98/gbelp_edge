import { Component, Input } from "@angular/core";

@Component({
  selector: 'loading-reports',
  template: `
  <mat-progress-spinner
      [diameter]="20" mode="indeterminate">
  </mat-progress-spinner>
  {{text}}
  `,
  styleUrls: ['./loading.reports.component.css']
})
export class LoadingReportsComponent{

  @Input()
  text: string = '';

}