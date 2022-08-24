export class ReportGraphDataUserUsage{
    constructor(
        public labels: number[],
        public data: number[],
        public xAxesLabel: string,
        public yAxesLabel: string
    ){}
}

 export class GameSessionUserUsageBreakdown{
    constructor(
        public user_id: string, 
        public user_name: string,
        public max_usage: number,
        public avg_usage: number,
        public session_count: number
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