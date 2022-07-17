import { LevelExitCriteria, LevelTypeSingle,  LevelTypeMulti, LevelDisplayMode, GameLevel, LevelExitCriteriaHelper } from ".";
import { getNewObjectId } from "../../common";
import { LevelProperties } from "./properties";
import { SceneObjectHelper } from "./scene";

/**
 * Returns the initial game levels for a single player game.
 */
 export function getSinglePlayerLevelInitData(
    levelExitCriteria: LevelExitCriteria | number,
    levelExitValue: number | null
): GameLevel[] {

    let lExitCriteria: LevelExitCriteria;
    const emptyProperties = new LevelProperties("", {});
    const defaultCamera = SceneObjectHelper.createBlankCamera(getNewObjectId());

    if (typeof levelExitCriteria == 'number')
        lExitCriteria = LevelExitCriteriaHelper.fromNumber(levelExitCriteria);
    else
        lExitCriteria = levelExitCriteria;

    return [
        {
            _id: getNewObjectId(),
            name: 'Title Screen',
            type: LevelTypeSingle.titleScreen,
            displayMode: LevelDisplayMode.replace,
            locked: true,
            exitCriteriaType: LevelExitCriteria.manual,
            exitCriteriaValue: null,
            scene: {
                objects: [defaultCamera]
            },
            properties: emptyProperties,
            logic: {
                script: {
                    setup: "",
                    perframe: "",
                    destroy: ""
                }
            }
        },
        {
            _id: getNewObjectId(),
            name: 'Example Level Screen',
            type: LevelTypeSingle.genericLevel,
            displayMode: LevelDisplayMode.replace,
            locked: false,
            exitCriteriaType: lExitCriteria,
            exitCriteriaValue: levelExitValue,
            scene: {
                objects: [defaultCamera]
            },
            properties: emptyProperties,
            logic: {
                script: {
                    setup: "",
                    perframe: "",
                    destroy: ""
                }
            }
        },
        {
            _id: getNewObjectId(),
            name: 'Game Over Screen',
            type: LevelTypeSingle.gameOver,
            displayMode: LevelDisplayMode.replace,
            locked: true,
            exitCriteriaType: LevelExitCriteria.manual,
            exitCriteriaValue: null,
            scene: {
                objects: [defaultCamera]
            },
            properties: emptyProperties,
            logic: {
                script: {
                    setup: "",
                    perframe: "",
                    destroy: ""
                }
            }
        },
    ]
}

/**
 * Returns the initial game levels for a multi player game.
 */
export function getMultiPlayerLevelInitData(
    levelExitCriteria: LevelExitCriteria | number,
    levelExitValue: number | null
): GameLevel[] {

    let lExitCriteria: LevelExitCriteria
    const emptyProperties = new LevelProperties("", {});
    const defaultCamera = SceneObjectHelper.createBlankCamera(getNewObjectId());

    if (typeof levelExitCriteria == 'number')
        lExitCriteria = LevelExitCriteriaHelper.fromNumber(levelExitCriteria);
    else
        lExitCriteria = levelExitCriteria;

    return [
        {
            _id: getNewObjectId(),
            name: 'Title Screen',
            type: 'multi_title_screen',
            displayMode: 'on_top',
            locked: true,
            exitCriteriaType: 'manual',
            exitCriteriaValue: null,
            scene: {
                objects: [defaultCamera]
            },
            properties: emptyProperties,
            logic: {
                script: {
                    setup: "",
                    perframe: "",
                    destroy: ""
                }
            }
        },
        {
            _id: getNewObjectId(),
            name: 'Staging Screen',
            type: 'multi_staging',
            displayMode: 'on_top',
            locked: false,
            exitCriteriaType: 'manual',
            exitCriteriaValue: null,
            scene: {
                objects: [defaultCamera]
            },
            properties: emptyProperties,
            logic: {
                script: {
                    setup: "",
                    perframe: "",
                    destroy: ""
                }
            }
        },
        {
            _id: getNewObjectId(),
            name: 'Example Level Screen',
            type: 'multi_level',
            displayMode: 'on_top',
            locked: false,
            exitCriteriaType: lExitCriteria,
            exitCriteriaValue: levelExitValue,
            scene: {
                objects: [defaultCamera]
            },
            properties: emptyProperties,
            logic: {
                script: {
                    setup: "",
                    perframe: "",
                    destroy: ""
                }
            }
        },
        {
            _id: getNewObjectId(),
            name: 'Game Over Screen',
            type: 'multi_game_over',
            displayMode: 'on_top',
            locked: false,
            exitCriteriaType: LevelExitCriteria.manual,
            exitCriteriaValue: null,
            scene: {
                objects: [defaultCamera]
            },
            properties: emptyProperties,
            logic: {
                script: {
                    setup: "",
                    perframe: "",
                    destroy: ""
                }
            }
        },
    ]
}