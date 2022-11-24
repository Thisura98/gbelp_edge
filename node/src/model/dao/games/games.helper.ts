import { kGameEntryParentEntryIdNone } from "../../../../../commons/src/models/game/game";
import { GameProject } from "../../../../../commons/src/models/game/project";
import { GameProjectResource, GameResourceType } from "../../../../../commons/src/models/game/resources"
import { getConfig } from "../../../Util/config";
import { cloneTemplateResources, cleanupGameResources } from './rescopy.helper';
import * as mongo from '../../../Util/connections/mongo/mongo_connection';
import * as l from '../../../Util/logger';
import * as utils from '../../../Util/utils';
import * as gamesDAO from './index';

/**
 * Clones the provided game template and returns a 
 * fully concrete game ID
 * 
 * @param data Parameters sent from client's game create component
 */
export async function cloneTemplateAndCreateGame(data: any): Promise<string> {
    const templateId = data.parent_entry_id;

    if (templateId == null || templateId == kGameEntryParentEntryIdNone) {
        return Promise.reject('Game template cannot be empty');
    }

    return new Promise((resolve, reject) => {
        gamesDAO.getGame(templateId, async (status, msg, listing) => {
            if (!status || listing == null){
                reject(msg);
                return;
            }

            const projectId = listing.project._id;
            const oldResources = listing.project.resources;

            let clonedResources: Map<string, string> | undefined = undefined;

            try{
                clonedResources = await cloneTemplateResources(oldResources);

                reject('Implementation not complete!');
            }
            catch(error){
                if (clonedResources != undefined){
                    await cleanupGameResources(clonedResources.values());
                }

                l.logc(String(error), 'cloneTemplateAndCreateGame()');
                reject('Error occurred while trying to create game');
            }
        });
    });
}
