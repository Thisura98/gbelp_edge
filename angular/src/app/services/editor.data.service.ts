import { Injector } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { SceneObject } from "../../../../commons/src/models/game/levels/scene";
import { ServerResponseGameListing } from "../models/game/game";

let gameListing = new BehaviorSubject<ServerResponseGameListing | null>(null);
let sceneObjects = new BehaviorSubject<SceneObject[]>([]);
let addSceneObject = new Subject<SceneObject>();
let sceneObjectSelection = new BehaviorSubject<number | undefined>(undefined);

export class EditorDataService{

    contructor(){
        
    }

    // Game Listing

    setGameListing(response: ServerResponseGameListing){
        gameListing.next(response);
    }

    getGameListing(): BehaviorSubject<ServerResponseGameListing | null>{
        return gameListing;
    }

    // Complete set of scene objects

    setSceneObjects(arr: SceneObject[]){
        sceneObjects.next(arr);
    }

    getSceneObjects(): BehaviorSubject<SceneObject[]>{
        return sceneObjects;
    }

    // Add Individual Scene Object

    addSceneObject(obj: SceneObject){
        addSceneObject.next(obj);
    }

    onAddSceneObject(): Subject<SceneObject>{
        return addSceneObject;
    }

    // Selection

    setSceneObjectSelection(index: number | undefined){
        sceneObjectSelection.next(index);
    }

    getSceneObjectSelection(): BehaviorSubject<number | undefined>{
        return sceneObjectSelection;
    }

}