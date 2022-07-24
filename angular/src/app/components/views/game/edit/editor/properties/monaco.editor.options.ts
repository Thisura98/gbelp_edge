export const EDGEMonacoEditorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
  theme: 'vs-dark', 
  language: 'json',
  fixedOverflowWidgets: true,
  suggest: {
    showFiles: false // Hide the "Document Icon" on suggestions widget
  },
  fontSize: 14
}
