import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GameListing } from 'src/app/models/game/game';
import { ApiService } from 'src/app/services/api.service';
import { EditorChildDataPack, EditorDataService } from 'src/app/services/editor.data.service';
import { LevelScript } from '../../../../../../../../../commons/src/models/game/levels/logic';

type EditorOptions = monaco.editor.IStandaloneEditorConstructionOptions;
type Editor = monaco.editor.IStandaloneCodeEditor;

@Component({
  selector: 'app-logic',
  templateUrl: './logic.component.html',
  styleUrls: [
    './logic.component.css',
    '../editor.component.css'
  ]
})
export class LogicEditorComponent implements OnInit {
  // MARK: Editor Properties
  code: string = '// Welcome to EDGE!';
  editorOptions: EditorOptions = {
    theme: 'vs-dark', 
    language: 'javascript',
    fixedOverflowWidgets: true,
    suggest: {
      showFiles: false // Hide the "Document Icon" on suggestions widget
    },
    fontSize: 14
  };

  // MARK: Game Properties
  readonly scriptTypes: string[] = ['On Level Setup', 'Each Frame', 'On Level Destroy'];
  levelScripts: string[] = [];
  gameListing: GameListing | undefined;
  selectedLevelIndex: number | undefined;
  selectedScriptIndex: number | undefined;

  private gameLibLoaded: boolean = false;
  private editorReference = new BehaviorSubject<Editor | undefined>(undefined);

  constructor(
    private editorDataService: EditorDataService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    // Get from Editor Component
    this.editorDataService.getEditorChildData().subscribe((data) => {
      this.setData(data);
    });

    // Update the game project with current values when saving
    this.editorDataService.addOnSaveListener((project) => {
      if (this.selectedLevelIndex == undefined)
        return;
      project.levels[this.selectedLevelIndex!].logic.script = {
        setup: this.b64enc(this.levelScripts[0]),
        perframe: this.b64enc(this.levelScripts[1]),
        destroy: this.b64enc(this.levelScripts[2]),
      }
    });
  }

  editorInit(editor: monaco.editor.IStandaloneCodeEditor){
    this.editorReference.next(editor);
    editor.onKeyDown(() => {
      this.copyCurrentCodeToScriptObject();
    });
    editor.onDidPaste(() => {
      this.copyCurrentCodeToScriptObject();
    });
  }

  scriptItemClicked(index: number){
    // Load other script code
    this.selectedScriptIndex = index;
    this.code = this.levelScripts[index];
  }

  private copyCurrentCodeToScriptObject(){
    if (this.selectedScriptIndex == undefined)
      return;

    this.levelScripts[this.selectedScriptIndex!] = this.code;
  }

  private setData(data: EditorChildDataPack){
    this.gameListing = data.gameListing?.data;
    const levelIndex = data.selectedLevelIndex;
    if (levelIndex == undefined)
      return;

    const scriptCollection = this.gameListing?.project.levels[levelIndex].logic.script;
    if (scriptCollection == undefined)
      return;

    this.levelScripts = [
      scriptCollection.setup,
      scriptCollection.perframe,
      scriptCollection.destroy
    ].map((script) => this.b64dec(script));

    this.selectedScriptIndex = 0;
    this.selectedLevelIndex = data.selectedLevelIndex;

    this.loadExtraLib();

    if (this.selectedLevelIndex == undefined)
      return;

    this.code = this.levelScripts[this.selectedScriptIndex!];
  }

  private loadExtraLib(){
    if (this.gameLibLoaded)
      return;

    const type = this.gameListing!.entry.type.toString();
    this.apiService.getGameLibraryJSFile(type).subscribe((lib) => {
      console.log("Received Game LIB:", lib);

      this.editorReference.pipe(filter(v => v != undefined)).subscribe(value => {
        console.log("Editor:", value);
        console.log(monaco.languages.typescript.javascriptDefaults.getExtraLibs());
        monaco.languages.typescript.javascriptDefaults.addExtraLib(lib);
      })
      
    }, (err) => {
      console.log(err);
    });
  }

  private b64enc(data: string): string{
    return btoa(unescape(encodeURIComponent(data)));
  }
 
  private b64dec(data: string): string{
    return decodeURIComponent(escape(atob(data)));
  }

}
