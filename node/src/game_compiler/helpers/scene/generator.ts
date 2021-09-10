import { GameLevel } from "../../../../../commons/src/models/game/levels";
import { GameProjectResource } from "../../../../../commons/src/models/game/resources";
import { Template } from "../common/templateloader";

export interface GenerateSceneResult{
    code: string
    sceneName: string
}

export class GenerateScene{
    static generate(level: GameLevel, resources: GameProjectResource[]): Promise<GenerateSceneResult>{
        const levelNameReplace = new RegExp('[ -!@#$%^&*0-9]', 'g');
        const levelName = level.name.replace(levelNameReplace, '_');

        return Template.readTemplate(
            'scene/template.js'
        )
        .then(t => {
            return Template.replacePlaceholder(t, 'EDGTOKEN_1', true, levelName);
        })
        .then(t => {
            const code = `console.log("${levelName}, preload called!");`
            return Template.replacePlaceholder(t, 'EDGTOKEN_PRELOAD', false, code);
        })
        .then(t => {
            const code = `console.log("${levelName}, create called!");`
            return Template.replacePlaceholder(t, 'EDGTOKEN_CREATE', false, code);
        })
        .then(t => {
            const code = `console.log("${levelName}, update called!");`
            return Template.replacePlaceholder(t, 'EDGTOKEN_UPDATE', false, code);
        })
        .then(t => {
            const code = `console.log("${levelName}, destroy called!");`
            return Template.replacePlaceholder(t, 'EDGTOKEN_DESTROY', false, code);
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

    private static generatePreloadCode(
        lavel: GameLevel,
        resources: GameProjectResource[]
    ): string{
        let code = '';

        const setBaseURL = `this.`;

        return code;
    }
}