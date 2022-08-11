/**
 * TS interface for `window.EdgeInternals` 
 * loaded in the singleplayer.lib.js Game Lib file.
 */
export declare interface IEdgeInternals{
    _on_updateObjective: (name: string, progress: number) => void;
    _on_updateGuidance: (name: string, progress: number) => void;
}