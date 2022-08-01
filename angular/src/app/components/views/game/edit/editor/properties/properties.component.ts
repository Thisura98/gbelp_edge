import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { debounce, delay, throttleTime } from 'rxjs/operators';
import { EditorDataService } from 'src/app/services/editor.data.service';
import { GameListing } from '../../../../../../../../../commons/src/models/game/game';
import { LevelPropertySection } from '../../../../../../../../../commons/src/models/game/levels/properties';
import { Example } from './example.levelprops';
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
  code: string = JSON.stringify(Example, null, 4); // Remove after testing
  editorOptions = EDGEMonacoEditorOptions;
  gameListing: GameListing | undefined;
  sections: LevelPropertySection[] = [];
  errorInSchema: boolean = false;

  userHidEditor: boolean = false;
  userHidPreview: boolean = false;

  get isTemplate(): boolean{
    return this.gameListing?.entry.is_template ?? false;
  }

  private editorReference = new BehaviorSubject<Editor | undefined>(undefined);
  private codeChanged = new BehaviorSubject<string>(this.code);

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
    const model = monaco.editor.createModel(this.code, 'json', modelUri);
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
    // debounce 800 - Bundle code changes into 800ms groups
    // delay 200 - Wait 200ms after we get an event to check markers
    // Monaco Markers are warnings/errors in the Editor
    // If there are errors, don't display sections.
    // Else show sections.
    this.codeChanged.pipe(debounce(() => interval(800))).pipe(delay(200)).subscribe(code => {
      let modelMarkers = monaco.editor.getModelMarkers({owner: 'json'});

      if (modelMarkers.length == 0 && code.length > 0){
        this.sections = JSON.parse(code) as LevelPropertySection[];
        this.errorInSchema = false;
      }
      else{
        this.errorInSchema = true;
      }
    });
  }

}
