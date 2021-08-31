import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditorDataService } from 'src/app/services/editor.data.service';
import { GameListing } from 'src/app/models/game/game';
import { ResourceUrlTransformPipe } from 'src/app/pipes/resource-url-transform.pipe';

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

  constructor(
    private editorDataService: EditorDataService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.editorDataService.getData().subscribe(value => {
      // console.log("SceneComponent:", JSON.stringify(value));
      this.gameListing = value?.data;
    });
    this.activatedRoute.queryParams.subscribe(params => {
      this.editingLevelId = params['levelId'];
    });
  }

}
