import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'dialog-fileuplaod',
    template: `
    <div class="dyn-backdrop">
        <div class="dfu-container">
            <div class="dfu-dialog">
                <h3>Uploading file...</h3>
                <div class="dfu-progbar-container">
                    <div class="dfu-progbar" [style.width]="progress"></div>
                </div>
                <h5>{{progress}} complete</h5>
                <div class="dfu-buttons">
                    <div class="dyn-btn clickable" *ngIf="showCancel" (click)="cancelPressed()">CANCEL</div>
                    <div class="dyn-btn clickable" *ngIf="showOk">OK</div>
                </div>
            </div>
        </div>
    </div>
    `,
    styles: [`
    .dyn-backdrop{
        background-color: transparent;
    }

    .dfu-container{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

    .dfu-dialog{
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        background-color: white;
        border-radius: 8px;
        padding: 10px;
        min-width: 300px;

        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        /* min-height: 140px; */
    }

    .dfu-progbar-container{
        background-color: #efefef;
        border-radius: 8px;
        overflow: hidden;
        width: 100%;
        height: 15px;
    }

    .dfu-progbar{
        height: 100%;
        background-color: #0588D8;
    }

    .dyn-btn{
        justify-content: center;
    }

    .dfu-buttons{
        margin-top: 10px;
    }
    `]
})
export class FileUploadDialogComponent {

    @Input()
    /**
     * A floating point number like 0.4 (40%)
     */
    progressFloat: number = 0.0;

    @Output()
    onCancel = new EventEmitter();

    get showCancel(): boolean{
        return this.progressFloat < 100.0;
    }

    get showOk(): boolean{
        return this.progressFloat == 100.0;
    }

    get progress(): string{
        let visibleProg = this.progressFloat * 100.0;
        visibleProg = Math.round(visibleProg);
        return `${visibleProg}%`;
    }

    cancelPressed(){
        this.onCancel.emit('');
    }
}