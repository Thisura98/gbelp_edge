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

/**
 * Not a real table. Only a query result
 */
export interface GameSessionUserUsageGroupedByNonce{
    play_nonce: string;
    session_id: number;
    user_id: number;
    start_time: string;
    end_time: string;
}