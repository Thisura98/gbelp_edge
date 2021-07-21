export class ResponseModel{
    constructor(
        public success: boolean,
        public code: number,
        public description: string | null,
        public data: Object | null = null
    ){}
}

export class ResponsePlainModel{
    constructor(
        public success: boolean,
        public code: number,
        public description: string | null
    ){}
}