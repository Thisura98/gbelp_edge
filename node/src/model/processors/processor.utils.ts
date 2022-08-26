import { DateTime, LocalZone, Zone} from "luxon";

/**
 * Replaces the ' ' in dates with 'T'
 */
export function isofy(date: string): string{
    return date.replace(' ', 'T');
}

/**
 * Round the source DateTime into the target milliseconds and return DateTime
 */
export function roundedDateToInterval(source: DateTime, intervalMs: number, zone: Zone = LocalZone.instance): DateTime{
    const roundedMs = roundedDateToIntervalMS(source.toMillis(), intervalMs);
    return DateTime.fromMillis(roundedMs, { zone: zone });
}

/**
 * Round the source DateTime into the target milliseconds and return time in ms
 */
export function roundedDateToIntervalMS(source: number, intervalMs: number): number{
    return intervalMs * Math.floor(source / intervalMs);
}

export interface IQuantizedIntervalMapResult{
    map: { [key: number] : number }
}

/**
 * Generates a map with quanitized ms intervals between start to end times.
 * @param startMS Start time in MS
 * @param endMS End time in MS
 * @param intervalMS Quantization Interval
 */
export function createEmptyQuantizedIntervalMap(startMS: number, endMS: number, intervalMS: number): IQuantizedIntervalMapResult{
    let map: { [key: string] : number } = {};
    while(startMS < endMS){
        const rounded = roundedDateToIntervalMS(startMS, intervalMS);
        map[rounded] = 0;
        startMS = rounded + intervalMS;
    }
    return { map: map };
}

export interface IQuantizationResult{
    interval: number
    intervalName: string
}

/**
 * Retrieve an appropriate time quantization
 * @param firstMS Millisecond timestamp of the first item
 * @param lastMS Millisecond timestamp of the last item
 */
export function determineTimeQuantizationInterval(firstMS: number, lastMS: number): IQuantizationResult{
    const oneHourInMs = 1 * 60 * 60 * 1000;
    const tenMinutesInMs = 10 * 60 * 1000;

    const tenMinuteInterval = 10 * 60 * 1000;
    const oneSecondInterval = 1 * 1000;
    const oneHourInterval = oneHourInMs;

    const diff = lastMS - firstMS;

    console.log('dtqi: diff =', diff, ' values =', lastMS, firstMS);

    if (diff > oneHourInMs){
        return { interval: oneHourInterval, intervalName: 'Hours' };
    }
    else if (diff > tenMinutesInMs){
        return { interval: tenMinuteInterval, intervalName: 'Minutes' };
    }
    else{
        return { interval: oneSecondInterval, intervalName: 'Seconds' };
    }
}