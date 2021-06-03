import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SimpleDialogComponent } from '../components/dialogs/simple/simple.component';

@Injectable({
    providedIn: 'root'
})
export class DialogService{

    constructor(public dialog: MatDialog){
    }

    showDismissable(title: string, message: string){
        const dialogRef = this.dialog.open(SimpleDialogComponent, {
            data: {title: title, message: message}
        });
      
        dialogRef.afterClosed().subscribe(result => {
            // console.log('The dialog was closed');
        });
    }

}