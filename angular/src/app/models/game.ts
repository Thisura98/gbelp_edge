import { ServerResponse } from './common-models';

interface CreateGame{
    gameId: string
}

export interface ServerResponseGameCreate extends ServerResponse<CreateGame>{};