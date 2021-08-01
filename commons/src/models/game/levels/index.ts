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
 * Describes how a level should be displayed against
 * any currently displayed level screen
 */
export enum LevelDisplayMode{
    onTop = "on_top",
    replace = "replace"
}

/**
 * Single Player game level types as a string enum
 */
export enum LevelTypeSingle{
    titleScreen = "single_title_screen",
    genericLevel = "single_level",
    gameOver = "single_game_over",
}

/**
 * Multi Player game level types as a string enum
 */
export enum LevelTypeMulti{
    titleScreen = "multi_title_screen",
    staging = "multi_staging",
    genericLevel = "multi_level",
    gameOver = "multi_game_over"
}

/**
 * Base class for a Level
 */
export class GameLevel{

    constructor(
        public _id: string,
        public name: string,
        public type: string,
        public displayMode: string,
        public locked: boolean,
        public exitCriteriaType: string,
        public exitCriteriaValue: number | null
    ){

    }

}