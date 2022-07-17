import { GameLevel } from "../../../../../commons/src/models/game/levels";
import { GameProjectResource } from "../../../../../commons/src/models/game/resources";
import { TemplateManager } from "../../templatemanager";
import * as pc from '../../../util/parseconfig';
import * as l from '../../../util/logger';
import { SceneObjectType } from "../../../../../commons/src/models/game/levels/scene";

import { generateCreateCode } from './helpers/helper_create';
import { generateUpdateCode } from './helpers/helper_update';

export interface GenerateSceneResult{
    code: string
    sceneName: string
}

export class GenerateScene{
    static generate(level: GameLevel, resources: GameProjectResource[]): Promise<GenerateSceneResult>{
        const levelNameReplace = new RegExp('[ -!@#$%^&*0-9]', 'g');
        const levelName = level.name.replace(levelNameReplace, '_');

        return TemplateManager.readTemplate(
            'scene/template.js'
        )
        .then(t => {
            return TemplateManager.replacePlaceholder(t, 'EDGTOKEN_1', true, levelName);
        })
        // .then(t => {
        //     const code = `console.log("${levelName}, preload called!");`
        //     return Template.replacePlaceholder(t, 'EDGTOKEN_PRELOAD', false, code);
        // })
        .then(t => {
            return this.generatePreloadCode(t, level, resources);
        })
        // .then(t => {
        //     const code = `console.log("${levelName}, create called!");`
        //     return Template.replacePlaceholder(t, 'EDGTOKEN_CREATE', false, code);
        // })
        .then(t => {
            return generateCreateCode(t, level);
        })
        // .then(t => {
        //     const code = `console.log("${levelName}, update called!");`
        //     return Template.replacePlaceholder(t, 'EDGTOKEN_UPDATE', false, code);
        // })
        .then(t => {
            return generateUpdateCode(t, level);
        })
        .then(t => {
            const code = `console.log("${levelName}, destroy called!");`
            return TemplateManager.replacePlaceholder(t, 'EDGTOKEN_DESTROY', false, code);
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

    /**
     * Generate code that goes in the scene's 'preload()' function.
     * 
     * Contains mostly load commands. 
     */
    private static generatePreloadCode(
        code: string,
        level: GameLevel,
        resources: GameProjectResource[]
    ): Promise<string>{

        let resourceMap: Map<string, GameProjectResource> = new Map([]);
        let resourceLoadCommands: string[] = ['\n'];
        const serverBaseURL = pc.parseConfig('config.json').server_base_url;
        const sceneObjects = level.scene.objects.filter(o => {
            return o.type == SceneObjectType.sprite || o.type == SceneObjectType.sound;
        });
        
        // Find the Resources we need to load for this scene (level),
        // then create a Map with (resId: res).
        for (let so of sceneObjects){
            const resIndex = resources.findIndex(res => {
                return res._id == so.spriteResourceId;
            })
            if (resIndex == -1)
                continue;

            const resource = resources[resIndex];
            resourceMap.set(resource._id.toString(), resource);
        }

        // Create the load commands for the scene objects
        for (let so of sceneObjects){
            const res = resourceMap.get(so.spriteResourceId);
            let cmd = '';

            if (so.type == SceneObjectType.sprite){
                // this.load.image('kirby-1', 'fs/res_upload/image/123.png')
                // image's key is the scene object's name
                cmd = `this.load.image('${so.name}', '${res?.filename ?? "sprite-res-unavail"}');`
            }
            else if (so.type == SceneObjectType.sound){
                // not implemented yet
                cmd = '// loading sounds are not yet supported in scene generator';
            }
            resourceLoadCommands.push(`\t\t${cmd}`);
        }

        return TemplateManager.replacePlaceholder(
            code, 'EDGTOKEN_LOADBASEURL', false, serverBaseURL
        )
        .then(t => {
            return TemplateManager.replacePlaceholder(
                t, 
                'EDGTOKEN_PRELOAD',
                false,
                resourceLoadCommands.join('\n')
            );
        });
    }
}