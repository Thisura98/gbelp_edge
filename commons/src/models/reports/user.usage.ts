export class ReportGraphDataUserUsage{
    constructor(
        public labels: string[],
        public data: number[],
        public xAxesLabel: string,
        public yAxesLabel: String
    ){}
}