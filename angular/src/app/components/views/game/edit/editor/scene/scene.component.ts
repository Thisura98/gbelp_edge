import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditorDataService } from 'src/app/services/editor.data.service';
import { GameListing } from 'src/app/models/game/game';
import { ResourceUrlTransformPipe } from 'src/app/pipes/resource-url-transform.pipe';
import { SceneObject, SceneObjectHelper } from '../../../../../../../../../commons/src/models/game/levels/scene';
import { GameProjectResource } from '../../../../../../../../../commons/src/models/game/resources';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  providers: [
    {provide: EditorDataService, useClass: EditorDataService}
  ],
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


  constructor(
    private editorDataService: EditorDataService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.editorDataService.getGameListing().subscribe(value => {
      // console.log("SceneComponent:", JSON.stringify(value));
      this.gameListing = value?.data;
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

}
