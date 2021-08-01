import { ObjectId } from "mongodb";

/**
 * Returns a new Object ID instantiated from mongodb
 * @returns string
 */
export function getNewObjectId(): string{
    const objId = new ObjectId();
    return objId.toHexString();
}