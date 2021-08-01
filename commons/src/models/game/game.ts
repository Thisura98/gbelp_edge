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