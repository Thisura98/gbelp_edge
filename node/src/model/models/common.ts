export class ResponseModel{
    constructor(
        public success: boolean,
        public code: number,
        public description: string,
        public data: Object | null
    ){}
}

export class ResponsePlainModel{
    constructor(
        public success: boolean,
        public code: number,
        public description: string
    ){}
}