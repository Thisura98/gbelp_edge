import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EditorDataService } from 'src/app/services/editor.data.service';
import { GameListing } from '../../../../../../../../../commons/src/models/game/game';
import { getMonacoLevelPropsTextModel } from './monaco.editor.model';
import { EDGEMonacoEditorOptions } from './monaco.editor.options';

type Editor = monaco.editor.IStandaloneCodeEditor;

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: [
    './properties.component.css',
    '../editor.component.css'
  ]
})
export class PropertiesEditorComponent implements OnInit {
  code: string = '[]';
  editorOptions = EDGEMonacoEditorOptions;
  gameListing: GameListing | undefined;

  userHidEditor: boolean = false;
  userHidPreview: boolean = false;

  get isTemplate(): boolean{
    return this.gameListing?.entry.is_template ?? false;
  }

  private editorReference = new BehaviorSubject<Editor | undefined>(undefined);

  constructor(
    private editorDataService: EditorDataService
  ) { }

  ngOnInit(): void {
    // Get from Parent Editor Component
    this.editorDataService.getEditorChildData().subscribe(data => {
      this.gameListing = data.gameListing?.data;
    });
  }

  /**
   * 'init' callback set on ngx-monaco-editor from template.
   */
  editorInit(editor: monaco.editor.IStandaloneCodeEditor){
    this.editorReference.next(editor);
    const modelUri = monaco.Uri.parse('edge://b/foo.json');
    const model = monaco.editor.createModel('{}', 'json', modelUri);
    const sectionsSchema = getMonacoLevelPropsTextModel(modelUri);
    editor.setModel(model);

    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [ sectionsSchema ]
    });
    
  }

  toggleCodeHidden(){
    this.userHidEditor = !this.userHidEditor
  }

  togglePreviewHidden(){
    this.userHidPreview = !this.userHidPreview;
  }

}
