import { Component, OnInit } from '@angular/core';
import { GameListing } from 'src/app/models/game/game';
import { EditorChildDataPack, EditorDataService } from 'src/app/services/editor.data.service';
import { LevelScript } from '../../../../../../../../../commons/src/models/game/levels/logic';

type EditorOptions = monaco.editor.IStandaloneEditorConstructionOptions;

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
  gameListing: GameListing | undefined;
  levelScripts: string[] = [];
  readonly scriptTypes: string[] = ['On Level Setup', 'Each Frame', 'On Level Destroy'];
  selectedLevelIndex: number | undefined;
  selectedScriptIndex: number | undefined;
  // MARK: End Game Properties

  private editor: monaco.editor.IStandaloneCodeEditor | undefined;

  constructor(
    private editorDataService: EditorDataService
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
    this.editor = editor;
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

    if (this.selectedLevelIndex == undefined)
      return;
    this.code = this.levelScripts[this.selectedScriptIndex!];
  }

  private b64enc(data: string): string{
    return btoa(unescape(encodeURIComponent(data)));
  }

  private b64dec(data: string): string{
    return decodeURIComponent(escape(atob(data)));
  }

}
