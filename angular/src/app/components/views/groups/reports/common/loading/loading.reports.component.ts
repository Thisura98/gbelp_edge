import { Component, Input } from "@angular/core";

@Component({
  selector: 'loading-reports',
  template: `
  {{text}}
  `,
  styleUrls: ['./loading.reports.component.css']
})
export class LoadingReportsComponent{

  @Input()
  text: string = '';

}