export class ReportGraphDataUserObjectives{
    constructor(
        public labels: number[],
        public data: number[],
        public xAxesLabel: string,
        public yAxesLabel: String
    ){}
}

export class ReportGraphDataUserObjectiveProgressByTime{
    constructor(
        public labels: number[],
        public data: number[],
        public xAxesLabel: string,
        public yAxesLabel: String
    ){}
}

/**
 * Not a real table. Returned query result.
 */
export class ReportGraphDataUserObjectiveCompletionProgress{
    constructor(
        public objective_id: string,
        public objective_name: string,
        public objective_progress: string
    ){}
}

export class ReportGraphDataUserObjectiveProgressByCompletion{
    constructor(
        public labels: string[],
        public data: number[],
        public xAxesLabel: string,
        public yAxesLabel: String
    ){}
}