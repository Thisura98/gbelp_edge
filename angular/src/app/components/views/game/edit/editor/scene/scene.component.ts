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

  cameraActive: boolean = true;

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

      // Set data for Child Scene Map Component
      const levels = this.gameListing?.project?.levels ?? [];
      this.sceneObjects = levels[value.selectedLevelIndex!].scene.objects;
      this.editorDataService.setSceneMapData(this.sceneObjects, value.selectedLevelIndex);
    });
    // Get from Child Scene Map Component
    this.editorDataService.getSceneObjectSelection().subscribe(index => {
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
    const index = this.sceneObjects.findIndex((obj) => { 
      if (obj._id == item._id){
        if (obj.type == SceneObjectType.camera && !this.cameraActive){
          this.dialogService.showSnackbar("Camera inactive. Click the cursor icon to re-active it.");
          return false;
        }
        return true;
      }
      return false;
    });

    if (index == -1)
      return;

    this.editorDataService.setSceneObjectSelection(index);
  }

  cameraActiveStateClicked(camera: SceneObject, event: Event){
    event.preventDefault();
    event.cancelBubble = true;
    this.cameraActive = !this.cameraActive;
    this.editorDataService.setSceneObjectActiveState(camera, this.cameraActive);

    if (!this.cameraActive)
      this.editorDataService.setSceneObjectSelection(undefined);
  }

}
