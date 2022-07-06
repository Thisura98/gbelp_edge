import { LevelLogic, LevelScript } from "./logic";
import { LevelProperties } from "./properties";
import { LevelScene } from "./scene";

/**
 * Defines how a level can exit
 */
export enum LevelExitCriteria{
    time = "time",
    score = "score",
    manual = "manual"
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
        public _id: string | null,
        public name: string,
        public type: string,
        public displayMode: string,
        public locked: boolean,
        public exitCriteriaType: string,
        public exitCriteriaValue: number | null,
        public scene: LevelScene,
        public properties: LevelProperties,
        public logic: LevelLogic
    ){}

}

/**
 * Helper methods for the GameLevel class
 */
export class GameLevelHelper{
    /**
     * Returns a display friendly name for the Game Level Type
     * @param level Level to extra details from
     */
    static getFriendlyLevelType(level: GameLevel | undefined): string{
        let type = (level?.type ?? "").toLowerCase();
        if (type == "")
          return type;

        if (type.startsWith('single_')){
          type = type.substring(6, type.length)
        }
        else if (type.startsWith('multi_')){
          type = type.substring(5, type.length)
        }

        type = type.split('_').join(' ');
        return type
    }
}

/**
 * Helper for converting between numbers and strings for
 * Level Exit Criteria
 */
export class LevelExitCriteriaHelper {

    public static fromNumber(levelExitCriteraAsNumber: number): LevelExitCriteria{
        switch(levelExitCriteraAsNumber){
            case 1: return LevelExitCriteria.time; break;
            case 2: return LevelExitCriteria.score; break;
            case 3: return LevelExitCriteria.manual; break;
            default: return LevelExitCriteria.manual;
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