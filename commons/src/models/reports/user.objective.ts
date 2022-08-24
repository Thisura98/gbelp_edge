export class ReportGraphDataUserObjectiveProgressByTime{
    constructor(
        public labels: number[],
        public data: number[],
        public xAxesLabel: string,
        public yAxesLabel: string
    ){}
}

/**
 * Not a real table. Returned query result.
 */
export class ReportIntermediateObjectiveCompletionProgress{
    constructor(
        public objective_id: string,
        public objective_name: string,
        public objective_progress: string
    ){}
}

export class ReportGraphDataUserObjectiveCompletionProgress{
    constructor(
        public labels: string[],
        public data: number[],
        public xAxesLabel: string,
        public yAxesLabel: string
    ){}
}

export class GameSessionUserObjectiveBreakdown{
    constructor(
        public user_name: string,
        public count_completed_objectives: number,
        public progress: number,
        public count_sessions: string,
        public velocity: string
    ){}
}