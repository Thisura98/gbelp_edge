import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditorDataService } from 'src/app/services/editor.data.service';
import { SceneObject, SceneObjectHelper, SceneObjectType } from '../../../../../../../../../commons/src/models/game/levels/scene';
import { GameProjectResource } from '../../../../../../../../../commons/src/models/game/resources';
import { DialogService } from 'src/app/services/dialog.service';
import { GameListing } from '../../../../../../../../../commons/src/models/game/game';


@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  // Resolve from the parent component's ElementInjector
  // providers: [
  //   {provide: EditorDataService, useClass: EditorDataService}
  // ],
  styleUrls: [
    './scene.component.css',
    '../editor.component.css'
  ]
})
export class SceneEditorComponent implements OnInit {

  editingLevelId: string | undefined;
  gameListing: GameListing | undefined;

  sceneObjects: SceneObject[] = [];
  selectedSceneObjIndex: number | undefined = 0;
  selectedLevelIndex: number | undefined = 0;

  cameraActive: boolean = true;

  get cameraObjectType(): string{
    return SceneObjectType.camera;
  }

  constructor(
    private dialogService: DialogService,
    private editorDataService: EditorDataService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // Get from Parent Editor Component
    this.editorDataService.getEditorChildData().subscribe(value => {
      this.gameListing = value?.gameListing?.data;

      if (value.selectedLevelIndex == undefined)
        return;

      this.selectedLevelIndex = value.selectedLevelIndex;

      // Set data for Child Scene Map Component
      const levels = this.gameListing?.project?.levels ?? [];
      this.sceneObjects = levels[value.selectedLevelIndex!].scene.objects;
      this.editorDataService.setSceneMapData(this.sceneObjects, value.selectedLevelIndex);
    });
    // Get from Child Scene Map Component
    this.editorDataService.getSceneObjectSelection().subscribe(objectId => {
      const index = this.sceneObjects.findIndex(obj => obj._id == objectId);
      this.selectedSceneObjIndex = index;
      console.log('getSceneObjectSelection', index)
    });
    this.activatedRoute.queryParams.subscribe(params => {
      this.editingLevelId = params['levelId'];
    });
  }

  didDoubleClickLibraryItem(resource: GameProjectResource){
    // todo
    // create sceneObject from resource
    // add sceneObject to editor
    // set selectedSceneObjIndex to count - 1
    // draw item on canvas

    const sceneObject = SceneObjectHelper.createFromResource(resource);
    const resCount = this.sceneObjects.filter((o) => o.spriteResourceId == resource._id).length;

    if (resCount > 0)
      sceneObject.name = sceneObject.name + '_' + (resCount + 1).toString();

    // assign temporary id
    sceneObject._id = 'temp_' + Date.now().toString()!

    console.log("Adding new object with frame", JSON.stringify(sceneObject.frame));

    this.sceneObjects.push(sceneObject);
    this.selectedSceneObjIndex = this.sceneObjects.length - 1;

    // Scene Objects
    // this.editorDataService.setSceneObjects(this.sceneObjects);
    this.editorDataService.addSceneObject(sceneObject);
  }

  getSelectedSceneObj(): SceneObject | undefined{
    if (this.selectedSceneObjIndex == undefined)
      return undefined;
    return this.sceneObjects[this.selectedSceneObjIndex!];
  }

  hierarchyItemClicked(item: SceneObject){
    if (item.type == SceneObjectType.camera && !this.cameraActive){
      this.dialogService.showSnackbar("Camera inactive. Click the cursor icon to re-active it.");
      return false;
    }

    // const index = this.sceneObjects.findIndex((obj) => { 
    //   if (obj._id == item._id){
    //     if (obj.type == SceneObjectType.camera && !this.cameraActive){
    //       this.dialogService.showSnackbar("Camera inactive. Click the cursor icon to re-active it.");
    //       return false;
    //     }
    //     return true;
    //   }
    //   return false;
    // });

    // if (index == -1)
    //   return;

    this.editorDataService.setSceneObjectSelection(item._id!);
    return true;
  }

  cameraActiveStateClicked(camera: SceneObject, event: Event){
    event.preventDefault();
    event.cancelBubble = true;
    this.cameraActive = !this.cameraActive;
    this.editorDataService.setSceneObjectState(camera, this.cameraActive);

    if (!this.cameraActive)
      this.editorDataService.setSceneObjectSelection(undefined);
  }

  updateObjectState(object: SceneObject){
    console.log("updateObjectstate called");

    const state = object.type == 'camera' ? this.cameraActive : true;
    this.editorDataService.setSceneObjectState(object, state);
  }

  removeSceneObject(index: number){
    this.dialogService.showYesNo(
      "Confirm Object Deletion",
      "Are you sure you want to delete this object?", 
      () => {
        this.deleteSceneObjectConfirmed(index);
      },
      () => {}
    );
  }

  moveItemToBack(){
    const i = this.selectedSceneObjIndex;

    if (i == undefined || i < 2){
      return;
    }

    this.swapItems(i, i-1);
  }

  moveItemToFront(){
    const i = this.selectedSceneObjIndex;

    if (i == undefined || i == 0){
      return;
    }

    if (i == this.sceneObjects.length - 1){
      return;
    }

    this.swapItems(i, i+1);
  }

  private swapItems(sourceIndex: number, destIndex: number){
    const destItem = this.sceneObjects[destIndex];
    const thisItem = this.sceneObjects[sourceIndex];
    const toFront = destIndex > sourceIndex;
    this.sceneObjects.splice(destIndex, 1, thisItem);
    this.sceneObjects.splice(sourceIndex, 1, destItem);
    this.selectedSceneObjIndex = destIndex;

    this.editorDataService.setReorder(thisItem, toFront);
    // this.editorDataService.setSceneObjectSelection(this.selectedSceneObjIndex);
  }

  private deleteSceneObjectConfirmed(index: number){
    this.selectedSceneObjIndex = undefined;
    this.editorDataService.setSceneObjectSelection(undefined);
    this.sceneObjects.splice(index, 1);
    this.editorDataService.setSceneMapData(this.sceneObjects, this.selectedLevelIndex!);
  }

}
