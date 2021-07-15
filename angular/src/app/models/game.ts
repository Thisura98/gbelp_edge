import { ServerResponse } from './common-models';

interface CreateGame{
    gameId: string
}

export interface GameEntry{
    id: number
    author_id: string
    name: string
    type: number
    level_switch: number
    multi_user_limit: number
    progress_bound_type: number
    project_id: number | null
    rep_opt_objectives: number
    rep_opt_guidance_trg: number
    rep_opt_student_usg: number
    rep_opt_level_score: number
    rep_opt_level_time: number
}

export interface ServerResponseGameCreate extends ServerResponse<CreateGame>{};

export interface ServerResponseGameEntry extends ServerResponse<GameEntry>{};

export interface ServerResponseAllGameEntries extends ServerResponse<GameEntry[]>{};