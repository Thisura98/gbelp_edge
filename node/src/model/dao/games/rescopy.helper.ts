import { GameProjectResource, GameResourceType } from "../../../../../commons/src/models/game/resources";
import { getConfig } from "../../../Util/config";
import * as fsPromises from 'fs/promises';
import * as l from '../../../Util/logger';
import * as utils from '../../../Util/utils';

/**
 * Clones the resources in the project projectID and 
 * returns their old vs new filenames in a map.
 * @param projectId MongoDB Game Project ID
 */
export async function cloneTemplateResources(resources: GameProjectResource[]): Promise<Map<string, string>>{

    const resLength = resources.length;

    const tag = 'cloneTemplateRes()';
    l.logc('Starting rescopy process for (' + resLength + ') resources...', tag);

    let map: Map<string, string> = new Map();

    // test
    let i = 0;

    for (let oldRes of resources){
        
        const newFileName = utils.generateUploadResourceName(oldRes.filename);
        const basePath = getFileTypeBasePath(oldRes);
        const newFilePath = basePath + '/' + newFileName;
    
        const oldFullPath = utils.getRootPath() + '/' + oldRes.filename;
        const newFullPath = utils.getRootPath() + '/' + newFilePath;

        l.logc('Copying -', tag);
        l.logc('\t FROM: ' + oldFullPath);
        l.logc('\t To: ' + newFullPath);

        await fsPromises.copyFile(oldFullPath, newFullPath);

        map.set(oldRes.filename, newFilePath);
    }

    // Verification process
    // > Cleanup files copied successfully because the process did not succeed
    try{
        const mapSize = map.size;
        verifyCopy(resLength == mapSize, 'rescpy Verification failed: Number of files processed mismatched');

        l.logc(map.size.toString() + ' of ' + resLength.toString() + ' resources copied!', tag);
        return map;
    }
    catch(verificationError){
        l.logc('Cleaning up ' + map.size.toString() + ' resources because process failed', tag);
        cleanupGameResources(map.values());

        throw 'Rescopy failed because verification failed';
    }

}

/**
 * Cleanup resorces using relative paths
 * @param paths Relative paths of resources to cleanup (e.g. fs/something/1.png)
 */
export async function cleanupGameResources(paths: IterableIterator<string>): Promise<void>{
    for (let path of paths){
        const fullPath = utils.getRootPath() + '/' + path;
        l.logc('deleting: ' + fullPath, 'cleanup()');
        await fsPromises.unlink(fullPath);
    }
}

function getFileTypeBasePath(resource: GameProjectResource): string{
    if (resource.type == GameResourceType.IMAGE){
        return getConfig().fs_res_path_image;
    }
    else if(resource.type == GameResourceType.SOUND){
        return getConfig().fs_res_path_sound;
    }

    throw 'Unsupported game resource type';
}

function verifyCopy(condition: boolean, msgIfFalse: string){
    if (!condition){
        throw msgIfFalse;
    }
}