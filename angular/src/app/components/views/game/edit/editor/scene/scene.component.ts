import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditorDataService } from 'src/app/services/editor.data.service';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  providers: [
    {provide: EditorDataService, useClass: EditorDataService}
  ],
  styleUrls: ['./scene.component.css']
})
export class SceneEditorComponent implements OnInit {

  editingLevelId: string | undefined;

  constructor(
    private editorDataService: EditorDataService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.editorDataService.getData().subscribe(value => {
      console.log("SceneComponent:", JSON.stringify(value));
    });
    this.activatedRoute.queryParams.subscribe(params => {
      this.editingLevelId = params['levelId'];
    });
  }

}
