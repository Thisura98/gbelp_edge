import { Component, Input } from "@angular/core";

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
            </div>
        </div>
    </div>
    `,
    styles: [`
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
    `]
})
export class FileUploadDialogComponent{

    @Input()
    /**
     * A floating point number like 0.4 (40%)
     */
    progressFloat: number = 0.0;

    get progress(): string{
        let visibleProg = this.progressFloat * 100.0;
        visibleProg = Math.round(visibleProg);
        return `${visibleProg}%`;
    }
}