import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { EditorDataService } from 'src/app/services/editor.data.service';
import { GameListing } from '../../../../../../../../../commons/src/models/game/game';
import { LevelPropertySection } from '../../../../../../../../../commons/src/models/game/levels/properties';
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
  sections: LevelPropertySection[] = [];

  userHidEditor: boolean = false;
  userHidPreview: boolean = false;

  get isTemplate(): boolean{
    return this.gameListing?.entry.is_template ?? false;
  }

  private editorReference = new BehaviorSubject<Editor | undefined>(undefined);
  private codeChanged = new BehaviorSubject<string>("");

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

    editor.onDidChangeModelContent(() => this.codeChanged.next(this.code));
    this.handleEditorCodeChanged();
  }

  toggleCodeHidden(){
    this.userHidEditor = !this.userHidEditor
  }

  togglePreviewHidden(){
    this.userHidPreview = !this.userHidPreview;
  }

  private handleEditorCodeChanged(){
    this.codeChanged.pipe(throttleTime(2000)).subscribe(code => {
      this.sections.push(new LevelPropertySection("Test", []));
    })
  }

}
