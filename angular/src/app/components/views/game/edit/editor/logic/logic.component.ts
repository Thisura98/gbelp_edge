import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { EditorChildDataPack, EditorDataService } from 'src/app/services/editor.data.service';
import { LevelScript } from '../../../../../../../../../commons/src/models/game/levels/logic';
import { GameListing } from '../../../../../../../../../commons/src/models/game/game';
import { EDGEMonacoEditorOptions } from './monaco.editor.options';
import { DialogService } from 'src/app/services/dialog.service';

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
  editorOptions = EDGEMonacoEditorOptions;

  // MARK: Game Properties
  readonly scriptTypes: string[] = ['Main Script'];
  levelScripts: string[] = [];
  gameListing: GameListing | undefined;
  selectedLevelIndex: number | undefined;
  selectedScriptIndex: number | undefined;

  private gameLibLoaded: boolean = false;
  private editorReference = new BehaviorSubject<Editor | undefined>(undefined);

  constructor(
    private editorDataService: EditorDataService,
    private dialogService: DialogService,
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

  /**
   * 'init' callback set on ngx-monaco-editor from template.
   */
  editorInit(editor: monaco.editor.IStandaloneCodeEditor){
    this.editorReference.next(editor);
    editor.onDidChangeModelContent(() => this.copyCurrentCodeToScriptObject());
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

    this.loadTemplateIfNeeded(data);
  }

  /**
   * Load the Phaser and Edge game libraries into Monaco
   */
  private loadExtraLib(){
    if (this.gameLibLoaded)
      return;

    const type = this.gameListing!.entry.type.toString();
    this.apiService.editor.getGameLibraryJSFile(type).subscribe(_gameLib => {
      this.apiService.editor.getPhaserLibraryFile().subscribe(_phaserLib => {
        const gameLib = this.stripUnwantedImports(_gameLib);
        const phaserLib = this.stripUnwantedImports(_phaserLib);

        // console.log("Received Game LIB:", lib);

        this.editorReference.pipe(filter(v => v != undefined)).subscribe(value => {
          console.log("Editor:", value);
          console.log(monaco.languages.typescript.javascriptDefaults.getExtraLibs());
          monaco.languages.typescript.javascriptDefaults.addExtraLib(gameLib);
          monaco.languages.typescript.javascriptDefaults.addExtraLib(phaserLib);
        })

      }, (err) => this.showLibLoadError(err))
    }, (err) => this.showLibLoadError(err));
  }

  private stripUnwantedImports(lib: string): string{
    const search = new RegExp('^require.+', 'g');
    const replace = '// removed import';
    return lib.replace(search, replace);
  }

  private showLibLoadError(error: any){
    const str = typeof error == 'string' ? error : JSON.stringify(error);
    this.dialogService.showDismissable('Error white loading game library', str);
  }

  private loadTemplateIfNeeded(data: EditorChildDataPack){
    if (this.code.length > 5)
      return;

    if (this.code.trim().length > 0)
      return;

    const gameId = String(data.gameListing?.data.entry.id);
    const levelId = data.selectedLevelId ?? "";
    
    this.apiService.editor.getScriptTemplate(gameId, levelId).subscribe(template => {
      let cleaned = template.data.replace(/\\\\/g, '').replace(/\\n/g, '\n');
      this.code = cleaned;

      console.log("Loaded template code:");
      console.log(cleaned);
    });
  }

  private b64enc(data: string): string{
    return btoa(unescape(encodeURIComponent(data)));
  }
 
  private b64dec(data: string): string{
    return decodeURIComponent(escape(atob(data)));
  }

}
