import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-report-available-card',
  templateUrl: './available.report.card.html',
  styleUrls: ['./available.report.card.css']
})
export class ReportAvailableCard{
  /**
   * Example: 'guidance' will become report_ico_guidance.png
   */
  @Input()
  title: string | undefined;

  @Input()
  icon: string | undefined;

  /**
   * Description
   */
  @Input()
  desc: string | undefined;

  getIconURL(): string | undefined{
    if (this.icon == undefined)
      return undefined;

    return `assets/groups/report_ico_${this.icon}.png`;
  }
}