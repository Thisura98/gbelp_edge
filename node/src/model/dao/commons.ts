type DAOCallback = (status: boolean, msg: string, result: Object | null) => void;
export default DAOCallback;

/**
 * Helper class for handling Merge Operations,
 * since MySQL does not natively support merging of data.
 */
export class DAOMergeOperation<T>{
    constructor(
        public data: T,
        public operation: 'insert' | 'update' | 'delete'
    ){}
}