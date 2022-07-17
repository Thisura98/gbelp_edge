import { GameLevel } from "../../../../../../commons/src/models/game/levels";
import { GameProjectResource } from "../../../../../../commons/src/models/game/resources";
import { TemplateManager } from "../../../templatemanager";
import * as pc from '../../../../util/parseconfig';
import { SceneObjectType } from "../../../../../../commons/src/models/game/levels/scene";

/**
 * Generate code that goes in the scene's 'preload()' function.
 * 
 * Contains mostly load commands. 
 */
export function generatePreloadCode(
    code: string,
    level: GameLevel,
    resources: GameProjectResource[]
): Promise<string>{

    if (code == undefined || code == null || code.trim().length == 0){
        return Promise.resolve(code);
    }

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
        code, 'EDGTOKEN_LOADBASEURL', false, false, serverBaseURL
    )
    .then(t => {
        return TemplateManager.replacePlaceholder(
            t, 
            'EDGTOKEN_LEVEL', 
            false, 
            false, 
            `this.levelData = ${JSON.stringify(level.scene, undefined, 4)}`
        );
    })
    .then(t => {
        return TemplateManager.replacePlaceholder(
            t, 
            'EDGTOKEN_PRELOAD',
            false,
            false,
            resourceLoadCommands.join('\n')
        );
    });
}