import { DateTime } from "luxon";
import { isofy } from "../../src/model/processors/processor.utils";

export const oneHour = 1 * 60 * 60 * 1000;
export const tenMinutes = 10 * 60 * 1000;
export const oneSecond = 1 * 1000;

const luxonOptions = { zone: 'UTC', setZone: true };

export function toMilliseconds(input: string): number{
    return DateTime.fromISO(isofy(input), luxonOptions).toMillis()
}