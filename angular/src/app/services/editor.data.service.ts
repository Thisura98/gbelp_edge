import { Injectable, Injector } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { SceneObject } from "../../../../commons/src/models/game/levels/scene";
import { GameProject } from "../../../../commons/src/models/game/project";
import { SceneObjectDataPack, SceneMapDataPack } from "../components/views/game/edit/editor/scene/scenemap/scenemap.component";
import { ServerResponseGameListing } from "../models/game/game";

export class EditorChildDataPack{
    constructor(
        public gameListing: ServerResponseGameListing | undefined,
        public selectedLevelIndex: number | undefined,
        public selectedLevelId: string | undefined
    ){}
}

export interface ReorderPack{
    object: SceneObject,
    toFront: boolean
}

let sceneData = new BehaviorSubject<EditorChildDataPack>(new EditorChildDataPack(undefined, undefined, undefined));
let sceneMapData = new BehaviorSubject<SceneMapDataPack>(new SceneMapDataPack([], undefined));
let addSceneObject = new Subject<SceneObject>();
let sceneObjectSelection = new BehaviorSubject<string | undefined>(undefined);
let objectState = new Subject<SceneObjectDataPack>();
let unsavedChanges = new BehaviorSubject<Boolean>(false);
let reOrderEvent = new BehaviorSubject<ReorderPack | undefined>(undefined);

interface OnSaveListener{
    callback: (project: GameProject) => void
    id: number
}
let onSaveListeners: OnSaveListener[] = [];
let onSaveIdCounter = 0;

/**
 * Sync "save" actions across all editor pages (scene, animation, logic)
 * and sync various data across editor pages and main editor component.
 */
@Injectable()
export class EditorDataService{

    contructor(){
        
    }

    /**
     * Adds a listener and returns the listener's index in the listener array.
     * @param listener The listener that will be called when a save is requested
     */
    addOnSaveListener(listener: (project: GameProject) => void): number{
        onSaveIdCounter++;
        const newListener = {
            callback: listener,
            id: onSaveIdCounter
        };
        onSaveListeners.push(newListener);
        return newListener.id;
    }

    /**
     * Give a chance to child components to modify game project.
     * @param gameProject The game project to be modified
     * @param callback Called once all save listeners have done processing
     * @returns 
     */
    invokeAllSaveListeners(gameProject: GameProject, callback: () => void){
        if (onSaveListeners.length == 0){
            callback();
            return;
        }
        const promises = onSaveListeners.map((listener) => {
            return new Promise<GameProject>((resolve, reject) => {
                listener.callback(gameProject);
                resolve(gameProject);
            });
        })
        console.log("Going to wait on all listeners...");
        Promise.all(promises).then(() => {
            console.log("All listeners resolved");
            callback();
        });
    }

    /**
     * Removes a Save Listener added by addOnSaveListener
     * @param id An id returned by `addOnSaveListener`
     * @returns 
     */
    removeOnSaveListener(id: number){
        const index = onSaveListeners.findIndex((obj) => obj.id == id);
        if (index == -1)
            return;
        onSaveListeners.splice(index, 1);
    }

    // Scene Data

    setEditorChildData(response: ServerResponseGameListing, selectedLevelIndex: number | undefined, selectedLevelId: string | undefined){
        const data = new EditorChildDataPack(response, selectedLevelIndex, selectedLevelId);
        sceneData.next(data);
    }

    getEditorChildData(): BehaviorSubject<EditorChildDataPack>{
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

    setSceneObjectSelection(objectId: string | undefined){
        sceneObjectSelection.next(objectId);
    }

    getSceneObjectSelection(): BehaviorSubject<string | undefined>{
        return sceneObjectSelection;
    }

    // Scene Object state

    setSceneObjectState(object: SceneObject, active: boolean){
        objectState.next(new SceneObjectDataPack(object, active));
    }

    getSceneObjectState(): Subject<SceneObjectDataPack>{
        return objectState;
    }

    // Unsaved changes

    setHasUnsavedChanges(hasChanges: boolean = true){
        unsavedChanges.next(hasChanges);
    }

    getHasUnsuavedChanges(): BehaviorSubject<Boolean> {
        return unsavedChanges;
    }

    // Reorder

    setReorder(object: SceneObject, toFront: boolean){
        reOrderEvent.next({ object: object, toFront: toFront });
    }

    getReorder(): BehaviorSubject<ReorderPack | undefined>{
        return reOrderEvent;
    }

}