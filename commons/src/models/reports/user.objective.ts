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