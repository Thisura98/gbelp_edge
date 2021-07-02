import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Dialog data interface
 */
export interface DialogData{
  title: string,
  message: string,
  onOkay: CallableFunction|undefined
}

@Component({
  selector: 'dialog-simple',
  template: `
    <h2 mat-dialog-title>{{this.data.title}}</h2>
    <div mat-dialog-content>
        {{data.message}}
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()" cdkFocusInitial>OKAY</button>
    </div>
  `
})
export class SimpleDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SimpleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    console.log('simple.component:', this.data);
    dialogRef.afterClosed().subscribe(result => {
      if (this.data.onOkay !== undefined){
        this.data.onOkay();
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
