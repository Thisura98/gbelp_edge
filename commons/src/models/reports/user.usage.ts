export class ReportGraphDataUserUsage{
    constructor(
        public labels: number[],
        public data: number[],
        public xAxesLabel: string,
        public yAxesLabel: String
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