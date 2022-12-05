import { GameLevel } from "../../../../../../commons/src/models/game/levels";
import { GameProjectResource } from "../../../../../../commons/src/models/game/resources";
import { TemplateManager } from "../../../templatemanager";
import { getConfig } from '../../../../Util/config';
import { SceneObject, SceneObjectType } from "../../../../../../commons/src/models/game/levels/scene";

const EDGTOKEN_PRELOAD = 'EDGTOKEN_PRELOAD';

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

    let commands: string[] = ['\n'];
    const serverBaseURL = getConfig().server_base_url;
    const sceneObjects = level.scene.objects.filter(o => {
        return o.type == SceneObjectType.sprite || o.type == SceneObjectType.sound;
    });

    // Base URL
    commands.push('\t\t' + `this.load.setBaseURL('${serverBaseURL}');`);
    commands.push('\n');

    // Resource lookup lines
    commands.push('\t\t' + `this.rawResources = {}`);
    for (let res of resources){
        const line = `\t\tthis.rawResources['${res.displayName}'] = "${res.filename}";`;
        commands.push(line);
    }
    commands.push('\n');
    
    // Load Resources
    const loadResourceCommands = getImageLoadCommands(sceneObjects, resources);
    commands = commands.concat(loadResourceCommands);
    commands.push('\n');

    // Level Data
    commands.push('\t\t' + `this.levelData = ${JSON.stringify(level.scene, undefined, 4)}`)
    commands.push('\n');

    // Level Properties
    commands.push('\t\t' + `this.levelProperties = ${JSON.stringify(level.properties.propertyValues, null, 4)}`);
    commands.push('\t');

    return TemplateManager.replacePlaceholder(
        code, 
        EDGTOKEN_PRELOAD,
        false,
        true,
        commands.join('\n')
    );
}

function getImageLoadCommands(sceneObjects: SceneObject[], resources: GameProjectResource[]): string[]{
    let resourceMap: Map<string, GameProjectResource> = new Map([]);
    let commands: string[] = [];

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
            // image's key is the scene object's name
            cmd = `this.load.image('${so.name}', '${res?.filename ?? "sprite-res-unavail"}');`
        }
        else if (so.type == SceneObjectType.sound){
            // not implemented yet
            cmd = '// loading sounds are not yet supported in scene generator';
        }
        commands.push('\t\t' + `${cmd}`);
    }
    return commands;

}