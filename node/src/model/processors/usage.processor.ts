import { GameSessionUserUsageGroupedByNonce } from '../../../../commons/src/models/reports/user.usage';
import { ReportGraphDataUserUsage } from '../../../../commons/src/models/reports/user.usage';
import { DateTime, LocalZone } from 'luxon';
import { GameSession } from '../../../../commons/src/models/session';
import { isofy, determineTimeQuantizationInterval, roundedDateToIntervalMS, createEmptyQuantizedIntervalMap } from './processor.utils';

/**
 * Generates graph data for User Usage
 * 
 * NOTE:
 * Database Timestamps will always be in UTC format.
 * Luxon by default thinks all times its being fed, are FROM the local time zone.
 * In our case, they are from the UTC zone. So we must explicitly
 * tell Luxon to NOT remove +0530 from the provided times.
 */
export function processUsage(session: GameSession, input: GameSessionUserUsageGroupedByNonce[]): Promise<ReportGraphDataUserUsage>{
    const yAxes = 'Cumulative Sessions';
    const xAxes = 'Seconds';
    const options = { zone: 'UTC', setZone: true }; // Stop luxon from thinking our timestamps are already in +0530
    let data = new ReportGraphDataUserUsage([], [], xAxes, yAxes);

    if (input.length == 0){
        return Promise.resolve(data);
    }

    const firstSessionTime = DateTime.fromISO(isofy(input[0].start_time), options).toMillis(); 
    let lastSessionTime = firstSessionTime;
    let interval = 0;
    let map: { [key: number]: number } = {};

    if (input.length > 1){
        lastSessionTime = DateTime.fromISO(isofy(input[input.length - 1].end_time), options).toMillis();
    }

    // Determine interval
    const quantization = determineTimeQuantizationInterval(firstSessionTime, lastSessionTime)
    interval = quantization.interval;
    data.xAxesLabel = quantization.intervalName;

    // Create labels
    const intervalMap = createEmptyQuantizedIntervalMap(firstSessionTime, lastSessionTime, interval);
    map = intervalMap.map;

    // Add one time point each to intermediate time intervals 
    // between start and end of each play session.
    // [play session = sessions group by nonce]
    for (let entry of input){
        const endTime = DateTime.fromISO(isofy(entry.end_time), options).toMillis();
        let time = DateTime.fromISO(isofy(entry.start_time), options).toMillis();

        do{
            const label = roundedDateToIntervalMS(time, interval);
            map[label] = map[label] + 1;
            time += interval;
        }
        while(time < endTime);
    }

    // Convert the map into readable format
    for (let label in map){
        const timestamp = Number.parseInt(label)
        data.labels.push(timestamp);
        data.data.push(map[label]);
    }

    return Promise.resolve(data);
}