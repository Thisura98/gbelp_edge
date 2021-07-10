import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Dialog data interface
 */
export interface Simple2DialogData{
  title: string,
  message: string,
  onYes: CallableFunction|undefined,
  onNo: CallableFunction|undefined,
}

@Component({
  selector: 'dialog-simple2',
  template: `
    <h2 mat-dialog-title>{{this.data.title}}</h2>
    <div mat-dialog-content>
        {{data.message}}
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onYesClick()" cdkFocusInitial>YES</button>
      <button mat-button (click)="onNoClick()">NO</button>
    </div>
  `
})
export class Simple2DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<Simple2DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Simple2DialogData
  ) {
    dialogRef.afterClosed().subscribe(result => {
        if (result instanceof String || typeof result == "string"){
            if (result == "yes" && this.data.onYes !== undefined)
                this.data.onYes();
            else if (result == "no" && this.data.onNo !== undefined)
                this.data.onNo();

        }
    });
  }

  onYesClick(): void {
    this.dialogRef.close('yes')
  }

  onNoClick(): void {
    this.dialogRef.close('no');
  }

}
