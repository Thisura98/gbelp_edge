import { GameProject } from "../../../../../commons/src/models/game/project";

export function replaceResourcesInTemplate(project: GameProject, resourceMap: Map<string, string>){

    if (project.resources.length == 0){
        return;
    }

    for (let res of project.resources){
        const newResource = resourceMap.get(res.filename);

        if (newResource == undefined){
            throw 'Resource \"' + res.filename + '\" missing from cloned resources!';
        }

        res.filename = newResource;
    }

}