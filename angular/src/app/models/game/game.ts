import { ServerResponse } from '../common-models';
import { GameEntry } from './game_entry';
import { GameProject } from './game_project';

interface CreateGame{
    gameId: string
}

export interface GameListing{
    entry: GameEntry,
    project: GameProject
}

export { GameEntry };

export interface ServerResponseGameCreate extends ServerResponse<CreateGame>{};

export interface ServerResponseGameListing extends ServerResponse<GameListing>{};

export interface ServerResponseAllGameEntries extends ServerResponse<GameEntry[]>{};