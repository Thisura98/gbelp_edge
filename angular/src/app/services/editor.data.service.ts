import { Injector } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { SceneObject } from "../../../../commons/src/models/game/levels/scene";
import { ServerResponseGameListing } from "../models/game/game";

let gameListing = new BehaviorSubject<ServerResponseGameListing | null>(null);
let sceneObjects = new BehaviorSubject<SceneObject[]>([]);
let addSceneObject = new Subject<SceneObject>();

export class EditorDataService{

    contructor(){
        
    }

    setGameListing(response: ServerResponseGameListing){
        gameListing.next(response);
    }

    getGameListing(): BehaviorSubject<ServerResponseGameListing | null>{
        return gameListing;
    }

    setSceneObjects(arr: SceneObject[]){
        sceneObjects.next(arr);
    }

    addSceneObject(obj: SceneObject){
        addSceneObject.next(obj);
    }

    getSceneObjects(): BehaviorSubject<SceneObject[]>{
        return sceneObjects;
    }

    onAddSceneObject(): Subject<SceneObject>{
        return addSceneObject;
    }

}