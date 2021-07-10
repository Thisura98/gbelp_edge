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
}