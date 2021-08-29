import { Injector } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { ServerResponseGameListing } from "../models/game/game";

let gameListing = new BehaviorSubject<ServerResponseGameListing | null>(null);

export class EditorDataService{

    contructor(){
        
    }

    setData(response: ServerResponseGameListing){
        gameListing.next(response);
    }

    getData(): BehaviorSubject<ServerResponseGameListing | null>{
        return gameListing;
    }

}