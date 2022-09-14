import { ObjectId } from "mongodb";

/**
 * Returns a new Object ID instantiated from mongodb
 * @returns string
 */
export function getNewObjectId(): string{
    const objId = new ObjectId();
    return objId.toHexString();
}

/* WARNING: Dont' put anything here that doesn't like importing mongodb */