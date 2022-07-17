import { ServerResponse } from '../common-models';
import { GameEntry, GameListing } from '../../../../../commons/src/models/game/game';
import { GameProject } from '../../../../../commons/src/models/game/project';
import { GameObjective } from '../../../../../commons/src/models/game/objectives';
import { GameGuidanceTracker } from '../../../../../commons/src/models/game/trackers';
import { CompileStatus } from '../../../../../commons/src/models/game/compile';

interface CreateGame{
    gameId: string
}


export interface GameTestSession{
    groupId: string,
    sessionId: string
}

export interface ServerResponseGameCreate extends ServerResponse<CreateGame>{};

export interface ServerResponseGameListing extends ServerResponse<GameListing>{};

export interface ServerResponseAllGameEntries extends ServerResponse<GameEntry[]>{};

export interface ServerResponseGameProject extends ServerResponse<GameProject>{};

export interface ServerResponseGetObjectId extends ServerResponse<string[]>{};

export interface ServerResponseGetObjectives extends ServerResponse<GameObjective[]>{};

export interface ServerResponseGetGuidanceTrackers extends ServerResponse<GameGuidanceTracker[]>{};

export interface ServerResponseGameTestSession extends ServerResponse<GameTestSession>{};

export interface ServerResponseGameCompiling extends ServerResponse<CompileStatus>{};

export interface ServerResponseScriptTemplate extends ServerResponse<string>{};