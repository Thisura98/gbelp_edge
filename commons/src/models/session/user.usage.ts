export class GameSessionUserUsage{
    constructor(
        public id: number,
        public session_id: number,
        public user_id: number,
        public is_start: number,
        public play_nonce: string,
        public timestamp: string
    ){}
}