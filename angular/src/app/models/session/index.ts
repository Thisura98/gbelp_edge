import { ServerResponse } from "../common-models";
import { GameSession, GameSessionWithExtensions } from "../../../../../commons/src/models/session"

export interface ServerResponseSessionsByGroup extends ServerResponse<GameSessionWithExtensions[]>{}

export interface ServerResponseSessionCreate extends ServerResponse<GameSession>{}

export interface ServerResponseSessionsForUser extends ServerResponse<GameSessionWithExtensions[]>{};