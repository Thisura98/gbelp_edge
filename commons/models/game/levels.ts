export namespace Level{

    /**
     * Defines how a level can exit
     */
    export enum LevelExitCriteria{
        time = "time",
        score = "score",
        manual = "manual"
    }

    /**
     * Returns the initial game levels for a single player game.
     */
    export function getSinglePlayerLevelInitData(
        levelExitCriteria: LevelExitCriteria, 
        levelExitValue: string | null
    ): Object[]{
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
                exitCriteriaType: levelExitCriteria,
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
        levelExitCriteria: LevelExitCriteria, 
        levelExitValue: string | null
    ): Object[]{
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
                exitCriteriaType: levelExitCriteria,
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

}