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

export class ReportGraphDataUserObjectivesSumByObjective{
    constructor(
        public objective_id: string,
        public cumulative_sum: string
    ){}
}

export class ReportGraphDataUserObjectiveProgressByObjective{
    constructor(
        public labels: string[],
        public data: number[],
        public xAxesLabel: string,
        public yAxesLabel: String
    ){}
}