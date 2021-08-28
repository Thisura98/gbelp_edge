import * as StartScreen from "./lt_startscreen";

export function getAllSingleplayerTemplates(): Object[]{
    return [
        StartScreen.LevelTemplateStartScreenSingleplayer,
    ]
}

export function getAllMultiplayerTemplates(): Object[]{
    return [
        StartScreen.LevelTemplateStartScreenMultiplayer,
    ]
}