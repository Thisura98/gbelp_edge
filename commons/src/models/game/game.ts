import { GameObjective } from "./objectives";
import { GameGuidanceTracker } from "./trackers";

/**
 * Denotes the game type
 */
export enum GameType{
    Singleplayer = 1,
    Multiplayer = 2
}

export class GameEntry{
    constructor(
        public id: number, 
        public author_id: string, 
        public name: string, 
        public type: number, 
        public is_template: boolean,
        public is_published: boolean,
        public parent_entry_id: number,
        public level_switch: number, 
        public multi_user_limit: number, 
        public progress_bound_type: number, 
        public project_id: number | null, 
        public rep_opt_objectives: number, 
        public rep_opt_guidance_trg: number, 
        public rep_opt_student_usg: number, 
        public rep_opt_level_score: number, 
        public rep_opt_level_time: number
    ){
        
    }
}

export interface SaveGameReportOptions{
    /**
     * Objective Reports Enabled?
     */
    rep_opt_objectives: number | boolean

    /**
     * Guidance Trigger Reports Enabled?
     */
     rep_opt_guidance_trg: number | boolean

    /**
     * Student Usage Reports Enbled?
     */
     rep_opt_student_usg: number | boolean

    /**
     * Level Score Reports Enabled?
     */
    rep_opt_level_score: number | boolean

    /**
     * Level Time Reports Enabled?
     */
    rep_opt_level_time: number | boolean
}

export interface SaveGameRequestData extends SaveGameReportOptions{
    id: string
    author_id: string
    name: string
    type: number
    level_switch: number
    multi_user_limit: number
    progress_bound_type: number
    objectives: GameObjective[]
    trackers: GameGuidanceTracker[]
}