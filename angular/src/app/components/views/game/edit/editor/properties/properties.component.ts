import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

  private editorReference = new BehaviorSubject<Editor | undefined>(undefined);

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * 'init' callback set on ngx-monaco-editor from template.
   */
   editorInit(editor: monaco.editor.IStandaloneCodeEditor){
    this.editorReference.next(editor);;
  }

}
