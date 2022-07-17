import { GameLevel } from "../../../../commons/src/models/game/levels";
import { GameProjectResource } from "../../../../commons/src/models/game/resources";
import { TemplateManager } from "../templatemanager";
import * as utils from '../../util/utils';

import { generatePreloadCode } from '../helpers/scene/helpers/preload';
import { generateCreateCode } from '../helpers/scene/helpers/create';

export interface GenerateSceneResult{
    code: string
    sceneName: string
}

export class GenerateScene{

    private static readonly sceneTemplate = '../templates/scene.js';

    static generate(level: GameLevel, resources: GameProjectResource[]): Promise<GenerateSceneResult>{
        const levelName = this.getLevelName(level.name);
        const script = level.logic.script.setup;
        const decodedScript = utils.decodeGameScript(script);
        const preparedScript = decodedScript.replace(/\\\\/g, '').replace(/\\n/g, '\n');

        return Promise.resolve(preparedScript)
        .then(t => {
            if (t.trim().length == 0){
                return TemplateManager.readTemplate(this.sceneTemplate)
            }
            else    
                return t;
        })
        .then(t => {
            return TemplateManager.replacePlaceholder(t, 'EDGTOKEN_1', true, true, levelName);
        })
        .then(t => {
            return generatePreloadCode(t, level, resources);
        })
        .then(t => {
            return generateCreateCode(t, level);
        })
        .then(t => {
            return {
                code: t,
                sceneName: `LevelScene_${levelName}`
            }
        })
        .catch((err) => {
            return Promise.reject('GenerateScene Error:' + err);
        })
    }

    static generateForScripting(level: GameLevel): Promise<GenerateSceneResult>{
        const levelName = this.getLevelName(level.name);

        return TemplateManager.readTemplate(
            this.sceneTemplate
        )
        .then(t => {
            return TemplateManager.replacePlaceholder(t, 'EDGTOKEN_1', true, false, levelName);
        })
        .then(t => {
            return {
                code: t,
                sceneName: `LevelScene_${levelName}`
            }
        })
        .catch((err) => {
            return Promise.reject('GenerateScene Error:' + err);
        })
    }

    private static getLevelName(name: string): string{
        const levelNameReplace = new RegExp('[ -!@#$%^&*0-9]', 'g');
        return name.replace(levelNameReplace, '_');
    }
}