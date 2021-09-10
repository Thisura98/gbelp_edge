import { GameLevel, LevelTypeMulti, LevelTypeSingle } from "../../../../../commons/src/models/game/levels";
import { GameProject } from "../../../../../commons/src/models/game/project";
import { GameProjectResource } from "../../../../../commons/src/models/game/resources";
import { Template } from "../common/templateloader";
import { GenerateScene } from "../scene/generator";

export class GenerateGame{
    static generate(project: GameProject): Promise<string>{
        let scenesCodes: string[] = [];
        let sceneNames: string[] = [];

        const promises = project.levels.map(lvl => {
            return GenerateScene.generate(lvl, project.resources);
        })

        const startingLeveIndex = project.levels.findIndex(lvl => {
            return lvl.type == LevelTypeSingle.titleScreen || lvl.type == LevelTypeMulti.titleScreen;
        });

        return new Promise<string>((resolve, reject) => {
            Promise.all(promises).then(values => {
                for (let v of values){
                    sceneNames.push(v.sceneName);
                    scenesCodes.push(v.code);
                }
                return Promise.resolve();
            })
            .then(() => {
                return Template.readTemplate('game/template.js');
            })
            .then(t => {
                const allSceneCodes = scenesCodes.join('\n\n');
                return Template.replacePlaceholder(t, 'EDGTOKEN_SCENECODE', false, allSceneCodes);
            })
            .then(t => {
                const strSceneNames = sceneNames.join(', ');
                return Template.replacePlaceholder(t, 'EDGTOKEN_SCENES', false, strSceneNames);
            })
            .then(t => {
                const startSceneName = sceneNames[startingLeveIndex!];
                return Template.replacePlaceholder(t, 'EDGTOKEN_STARTING_SCENE', false, startSceneName);
            })
            .then(final => {
                resolve(final);
            })
            .catch((err) => {
                reject(err);
            })
        });
    }
}