import { GameLevel, LevelTypeMulti, LevelTypeSingle } from "../../../../commons/src/models/game/levels";
import { GameProject } from "../../../../commons/src/models/game/project";
import { GameProjectResource } from "../../../../commons/src/models/game/resources";
import { TemplateManager } from "../templatemanager";
import { GenerateScene } from "./scene";

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
                return TemplateManager.readTemplate('../templates/game.js');
            })
            .then(t => {
                const allSceneCodes = scenesCodes.join('\n\n');
                return TemplateManager.replacePlaceholder(t, 'EDGTOKEN_SCENECODE', false, false, allSceneCodes);
            })
            .then(t => {
                const strSceneNames = sceneNames.join(', ');
                return TemplateManager.replacePlaceholder(t, 'EDGTOKEN_SCENES', false, false, strSceneNames);
            })
            .then(t => {
                const startSceneName = sceneNames[startingLeveIndex!];
                return TemplateManager.replacePlaceholder(t, 'EDGTOKEN_STARTING_SCENE', false, false, startSceneName);
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