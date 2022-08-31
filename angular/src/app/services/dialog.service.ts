import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SimpleDialogComponent } from '../components/ui/dialogs/simple.component';
import { Simple2DialogComponent } from '../components/ui/dialogs/simple2.component';

@Injectable({
    providedIn: 'root'
})
export class DialogService{

    constructor(
        public dialog: MatDialog,
        private toastr: ToastrService
    ){}

    showDismissable(title: string, message: string, onOkay: CallableFunction|undefined = undefined){
        const dialogRef = this.dialog.open(SimpleDialogComponent, {
            data: {title: title, message: message, onOkay: onOkay}
        });
      
        /*
        dialogRef.afterClosed().subscribe(result => {
            // console.log('The dialog was closed');
        });*/
    }

    showYesNo(title: string, message: string, onYes: CallableFunction|undefined = undefined, onNo: CallableFunction|undefined = undefined){
        const _ = this.dialog.open(Simple2DialogComponent, {
            data: {
                title: title,
                message: message,
                onYes: onYes,
                onNo: onNo
            }
        });
    }

    async showSnackbar(title: string, duration: number | undefined = 1500){
        this.toastr.error(title, undefined, {
            positionClass: 'toast-bottom-center',
            toastClass: 'dyn-toast-class',
            
            timeOut: duration
        });
    }


}