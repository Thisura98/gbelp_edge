/**
 * Defines how a level can exit
 */
export class LevelExitCriteria {
    public static time = "time"
    public static score = "score"
    public static manual = "manual"

    public static fromNumber(levelExitCriteraAsNumber: number): LevelExitCriteria{
        switch(levelExitCriteraAsNumber){
            case 1: return LevelExitCriteria.time; break;
            case 2: return LevelExitCriteria.score; break;
            case 3: return LevelExitCriteria.manual; break;
            default:  return "unknown_1";
        }   
    }

    public static toNumber(value: LevelExitCriteria): number{
        switch(value){
            case LevelExitCriteria.time: return 1;
            case LevelExitCriteria.score: return 2;
            case LevelExitCriteria.manual: return 3
            default: return -1;
        }
    }
}

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
            type: 'single_title_screen',
            displayMode: 'on_top',
            exitCriteriaType: 'manual',
            exitCriteriaValue: null
        },
        {
            name: 'Example Level Screen',
            type: 'single_level',
            displayMode: 'on_top',
            exitCriteriaType: lExitCriteria,
            exitCriteriaValue: levelExitValue
        },
        {
            name: 'Game Over Screen',
            type: 'single_game_over',
            displayMode: 'on_top',
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
            exitCriteriaType: 'manual',
            exitCriteriaValue: null
        },
        {
            name: 'Staging Screen',
            type: 'multi_staging',
            displayMode: 'on_top',
            exitCriteriaType: 'manual',
            exitCriteriaValue: null
        },
        {
            name: 'Example Level Screen',
            type: 'multi_level',
            displayMode: 'on_top',
            exitCriteriaType: lExitCriteria,
            exitCriteriaValue: levelExitValue
        },
        {
            name: 'Game Over Screen',
            type: 'multi_game_over',
            displayMode: 'on_top',
            exitCriteriaType: null,
            exitCriteriaValue: null
        },
    ]
}