import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Dialog data interface
 */
export interface LoadingDialogData{
  title: string,
  message: string,
}

@Component({
  selector: 'dialog-simple',
  template: `
    <h2 mat-dialog-title>{{this.data.title}}</h2>
    <div mat-dialog-content class="content">
      <mat-progress-spinner class="load-container" mode="indeterminate" [diameter]="30">
      </mat-progress-spinner>
      {{ this.data.message }}
    </div>
  `,
  styles: [
    `.content{
      display: flex;
      flex-direction: row;
      gap: 10px;
      justify-content: center;
      align-items: center;
      margin-bottom: 15px;
    }`
  ]
})
export class InfiniteLoadingDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<InfiniteLoadingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoadingDialogData
  ) {
    // dialogRef.afterClosed().subscribe(result => {
    //   if (this.data.onOkay !== undefined){
    //     this.data.onOkay();
    //   }
    // });
  }

}
