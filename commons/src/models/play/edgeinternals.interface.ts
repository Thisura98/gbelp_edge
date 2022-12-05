/**
 * TS interface for `window.EdgeInternalsFromAngular` 
 * loaded in the singleplayer.lib.js Game Lib file.
 */
export declare interface IEdgeInternalsFromAngular{
    _on_updateObjective: (name: string, progress: number) => void;
    _on_updateGuidance: (name: string, progress: number) => void;
    _on_gameCompleted: (message: string, data: object | null | undefined) => void;
}

/**
 * TS interface for `window.EdgeInternalsFromGame` 
 * loaded in the singleplayer.lib.js Game Lib file
 * and defined from each game
 */
export declare interface IEdgeInternalsFromGame{
    _on_changeGameState: (paused: boolean) => void;
}