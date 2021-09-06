type DAOCallback = (status: boolean, msg: string, result: Object | null) => void;
export default DAOCallback;

export type DAOTypedCallback<T> = (status: boolean, msg: string, result: T | null) => void;

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

/**
 * Helper for using a provided value, or resolving it through a promise. 
 * Returns a promise regardless of the method used.
 * 
 * @param checkValue Value to test if undefined | null. If not, will be used.
 * @param resolver Resolve the value through a promise
 * @returns 
 */
export function useOrResolve<T>(
    checkValue: T | undefined | null, resolver: Promise<T>
): Promise<T>{
    if (checkValue == undefined || checkValue == null){
        return new Promise<T>((resolve, reject) => {
            resolver.then((v) => {
                resolve(v);
            }).catch((e) => {
                reject(e);
            });
        });
    }
    else{
        return new Promise<T>((resolve) => {
            resolve(checkValue!);
        });
    }
}

/**
 * Helper that executes a promise if the checked value is false. Otherwise,
 * returns the second parameter.
 * 
 * @param checkValue Value to test.
 * @param defaultValue Value to return if checkValue is true,
 * @param resolver Invoked if checked value is false.
 * @returns 
 */
 export function useIfTrueOrResolve<T>(
    checkValue: boolean, defaultValue: T, resolver: Promise<T>
): Promise<T>{
    if (!checkValue){
        return new Promise<T>((resolve, reject) => {
            resolver.then((v) => {
                resolve(v);
            }).catch((e) => {
                reject(e);
            });
        });
    }
    else{
        return new Promise<T>((resolve) => {
            resolve(defaultValue!);
        });
    }
}