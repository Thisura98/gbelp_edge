import { ServerResponse } from '../common-models';
import { GameEntry } from '../../../../../commons/src/models/game/game';
import { GameProject } from '../../../../../commons/src/models/game/project';

interface CreateGame{
    gameId: string
}

export interface GameListing{
    entry: GameEntry,
    project: GameProject
}

export interface ServerResponseGameCreate extends ServerResponse<CreateGame>{};

export interface ServerResponseGameListing extends ServerResponse<GameListing>{};

export interface ServerResponseAllGameEntries extends ServerResponse<GameEntry[]>{};

export interface ServerResponseGameProject extends ServerResponse<GameProject>{};