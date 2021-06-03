/** Server Response without a Data Body */
export interface ServerResponsePlain{
    /** Was request successful? */
    success: Boolean

    /** Request status code */
    code: number

    /** Optional Description */
    description: string;
}

/** Server Response with a Data Body */
export interface ServerResponse<T> extends ServerResponsePlain{
    /** Embedded data of the request */
    data: T
}