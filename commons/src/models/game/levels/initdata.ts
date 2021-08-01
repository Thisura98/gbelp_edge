import { LevelExitCriteria, LevelTypeSingle,  LevelTypeMulti, LevelDisplayMode } 
from ".";

/**
 * Returns the initial game levels for a single player game.
 */
 export function getSinglePlayerLevelInitData(
    levelExitCriteria: LevelExitCriteria | number,
    levelExitValue: string | null
): Object[] {

    let lExitCriteria: LevelExitCriteria

    if (typeof levelExitCriteria == 'number')
        lExitCriteria = LevelExitCriteria.fromNumber(levelExitCriteria);
    else
        lExitCriteria = levelExitCriteria;

    return [
        {
            name: 'Title Screen',
            type: LevelTypeSingle.titleScreen,
            displayMode: LevelDisplayMode.replace,
            locked: true,
            exitCriteriaType: LevelExitCriteria.manual,
            exitCriteriaValue: null
        },
        {
            name: 'Example Level Screen',
            type: LevelTypeSingle.genericLevel,
            displayMode: LevelDisplayMode.replace,
            locked: false,
            exitCriteriaType: lExitCriteria,
            exitCriteriaValue: levelExitValue
        },
        {
            name: 'Game Over Screen',
            type: LevelTypeSingle.gameOver,
            displayMode: LevelDisplayMode.replace,
            locked: true,
            exitCriteriaType: null,
            exitCriteriaValue: null
        },
    ]
}

/**
 * Returns the initial game levels for a multi player game.
 */
export function getMultiPlayerLevelInitData(
    levelExitCriteria: LevelExitCriteria | number,
    levelExitValue: string | null
): Object[] {

    let lExitCriteria: LevelExitCriteria

    if (typeof levelExitCriteria == 'number')
        lExitCriteria = LevelExitCriteria.fromNumber(levelExitCriteria);
    else
        lExitCriteria = levelExitCriteria;

    return [
        {
            name: 'Title Screen',
            type: 'multi_title_screen',
            displayMode: 'on_top',
            locked: true,
            exitCriteriaType: 'manual',
            exitCriteriaValue: null
        },
        {
            name: 'Staging Screen',
            type: 'multi_staging',
            displayMode: 'on_top',
            locked: false,
            exitCriteriaType: 'manual',
            exitCriteriaValue: null
        },
        {
            name: 'Example Level Screen',
            type: 'multi_level',
            displayMode: 'on_top',
            locked: false,
            exitCriteriaType: lExitCriteria,
            exitCriteriaValue: levelExitValue
        },
        {
            name: 'Game Over Screen',
            type: 'multi_game_over',
            displayMode: 'on_top',
            locked: false,
            exitCriteriaType: null,
            exitCriteriaValue: null
        },
    ]
}