import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UtilsService{

    documentClickedTarget: Subject<Element | Document | Window>

    constructor(){
        this.documentClickedTarget = new Subject();
    }

    copyToClipboard(text: string){
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = text;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }

    /**
     * Creates location from the current or provided location params.
     * @param text path with leading slash (/dashboard/games)
     * @param domain optional custom domain. if null will be picked from location.
     * @param port optional custom port. if null will be picked from location.
     */
    urlFromPath(text: string, domain: string | null = null, port: string | null = null): string{
        const actualDomain = domain ?? location.hostname
        const actualPort = port ?? location.port;
        const protocol = location.protocol;

        let url = protocol;
        url += "//"
        url += actualDomain

        if (actualPort.length > 0){
            url += ":" + actualPort
        }

        url += text.trim();
        return url;
    }
}