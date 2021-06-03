import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData{
  title: string,
  message: string
}

@Component({
  selector: 'dialog-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.css']
})
export class SimpleDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SimpleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    console.log('simple.component:', this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
