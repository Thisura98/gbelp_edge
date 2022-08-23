export class GameSessionUserObjective{
    constructor(
        public id: string,
        public session_id: string,
        public objective_id: string,
        public user_id: string,
        public progress: number,
        public play_nonce: string,
        public last_updated: string
    ){}
}