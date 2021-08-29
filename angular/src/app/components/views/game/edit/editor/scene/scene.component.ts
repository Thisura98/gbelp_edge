import { Component, OnInit } from '@angular/core';
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

  constructor(
    private editorDataService: EditorDataService
  ) { }

  ngOnInit(): void {
    this.editorDataService.getData().subscribe(value => {
      console.log("SceneComponent:", JSON.stringify(value));
    });
  }

}
