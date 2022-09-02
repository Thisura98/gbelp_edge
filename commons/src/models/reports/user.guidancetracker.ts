export class ReportGraphDataUserGuidanceTrackerTimeGraph{
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
 export class ReportIntermediateGuidanceTrackerHitCounts{
    constructor(
        public tracker_name: string,
        public tracker_hits: number
    ){}
}

export class ReportGraphDataUserGuidanceTrackerHitCounts{
    constructor(
        public labels: string[],
        public data: number[],
        public xAxesLabel: string,
        public yAxesLabel: string
    ){}
}