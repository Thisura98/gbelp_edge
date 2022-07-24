export const EDGEMonacoEditorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
  theme: 'vs-dark', 
  language: 'javascript',
  fixedOverflowWidgets: true,
  suggest: {
    showFiles: false // Hide the "Document Icon" on suggestions widget
  },
  fontSize: 14
}

// TODO: Custom Themes
/**
 * Definition Example: https://microsoft.github.io/monaco-editor/playground.html#customizing-the-appearence-exposed-colors
 * Base Theme: https://github.com/Microsoft/vscode/blob/main/src/vs/editor/standalone/common/themes.ts#L13
 */