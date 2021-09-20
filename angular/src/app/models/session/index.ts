import { ServerResponse } from "../common-models";
import { GameSessionWithExtensions } from "../../../../../commons/src/models/session"

export interface ServerResponseSessionsByGroup extends ServerResponse<GameSessionWithExtensions[]>{}