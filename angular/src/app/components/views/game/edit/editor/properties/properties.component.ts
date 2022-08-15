import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { debounce, delay, throttleTime } from 'rxjs/operators';
import { DialogService } from 'src/app/services/dialog.service';
import { EditorDataService } from 'src/app/services/editor.data.service';
import { GameListing } from '../../../../../../../../../commons/src/models/game/game';
import { LevelPropertySection } from '../../../../../../../../../commons/src/models/game/levels/properties';
import { GameProject } from '../../../../../../../../../commons/src/models/game/project';
import { Example } from './example.levelprops';
import { getMonacoLevelPropsTextModel } from './monaco.editor.model';
import { EDGEMonacoEditorOptions } from './monaco.editor.options';


type Editor = monaco.editor.IStandaloneCodeEditor;

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: [
    './properties.component.css',
    './properties.fields.css',
    '../editor.component.css'
  ]
})
export class PropertiesEditorComponent implements OnInit {
  // code: string = JSON.stringify(Example, null, 4); // Remove after testing
  code: string = '';
  editorOptions = EDGEMonacoEditorOptions;
  gameListing: GameListing | undefined;
  sections: LevelPropertySection[] = [];
  errorInSchema: boolean = false;

  userHidEditor: boolean = false;
  userHidPreview: boolean = false;

  get isTemplate(): boolean{
    return this.gameListing?.entry.is_template ?? false;
  }

  private selectedLevelIndex: number | undefined;
  private editorReference = new BehaviorSubject<Editor | undefined>(undefined);
  private codeChanged = new BehaviorSubject<string>(this.code);

  constructor(
    private editorDataService: EditorDataService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    // Get from Parent Editor Component
    this.editorDataService.getEditorChildData().subscribe(data => {
      this.gameListing = data.gameListing?.data;
      this.selectedLevelIndex = data.selectedLevelIndex;
      this.setLevelProperties();
    });

    this.editorDataService.addOnSaveListener(project => this.prepareForSave(project))
  }

  /**
   * 'init' callback set on ngx-monaco-editor from template.
   */
  editorInit(editor: monaco.editor.IStandaloneCodeEditor){
    this.editorReference.next(editor);
    const modelUri = monaco.Uri.parse('edge://b/foo.json');
    if (monaco.editor.getModel(modelUri) == null){
      const model = monaco.editor.createModel(this.code, 'json', modelUri);
      const sectionsSchema = getMonacoLevelPropsTextModel(modelUri);

      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        schemas: [ sectionsSchema ]
      });

      editor.setModel(model);
    }
    else{
      editor.setModel(monaco.editor.getModel(modelUri));
    }

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
    // Else show errors.
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

  valueChanged(){
    // TODO: Capture values from the controls
    // TODO:
    this.code = JSON.stringify(this.sections, null, 4);
  }

  private setLevelProperties(){
    if (this.selectedLevelIndex == undefined)
      return;

    const index = this.selectedLevelIndex!;
    this.sections = this.gameListing?.project.levels[index].properties.properties!;
    this.valueChanged();
  }

  private prepareForSave(project: GameProject){

    try{
      let propertyMap = this.generateLevelPropertyMap();
      project.levels[this.selectedLevelIndex!].properties.propertyValues = propertyMap;
      project.levels[this.selectedLevelIndex!].properties.properties = this.sections;
    }
    catch(error){
      this.dialogService.showDismissable("Error occurred while saving", `${error}`);
    }

  }

  private generateLevelPropertyMap(): { [key: string] : any } {
    let map: { [key: string] : any } = {};

    for (let section of this.sections){
      for (let param of section.properties){
        const key = param.name;
        switch(param.type){
          case 'number':  map[key] = param.number!.value; break;
          case 'text':    map[key] = param.text!.value;   break;
          case 'select':  map[key] = param.select!.value; break;
          default: 
            throw new Error(`Unsupported parameter type '${param.type}' when generating level property map`);
          break;
        }
      }
    }

    return map;
  }

}
