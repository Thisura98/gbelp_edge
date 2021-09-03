import { Injectable, Injector } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { SceneObject } from "../../../../commons/src/models/game/levels/scene";
import { SceneDataPack } from "../components/views/game/edit/editor/scene/scene.component";
import { SceneMapDataPack } from "../components/views/game/edit/editor/scene/scenemap/scenemap.component";
import { ServerResponseGameListing } from "../models/game/game";

let sceneData = new BehaviorSubject<SceneDataPack>(new SceneDataPack(undefined, undefined));
let sceneMapData = new BehaviorSubject<SceneMapDataPack>(new SceneMapDataPack([], undefined));
let addSceneObject = new Subject<SceneObject>();
let sceneObjectSelection = new BehaviorSubject<number | undefined>(undefined);

@Injectable()
export class EditorDataService{

    contructor(){
        
    }

    // Scene Data

    setSceneData(response: ServerResponseGameListing, selectedLevel: number | undefined){
        const data = new SceneDataPack(response, selectedLevel)
        sceneData.next(data);
    }

    getSceneData(): BehaviorSubject<SceneDataPack>{
        return sceneData;
    }

    // Scene Map Data

    setSceneMapData(sceneObjects: SceneObject[], selectedLevel: number | undefined){
        const data = new SceneMapDataPack(sceneObjects, selectedLevel);
        sceneMapData.next(data);
    }

    getSceneMapData(): BehaviorSubject<SceneMapDataPack>{
        return sceneMapData;
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