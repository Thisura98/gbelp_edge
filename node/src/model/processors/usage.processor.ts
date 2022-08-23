import { GameSessionUserUsageGroupedByNonce } from '../../../../commons/src/models/session/user.usage';
import { ReportGraphDataUserUsage } from '../../../../commons/src/models/reports/user.usage';
import { DateTime, LocalZone } from 'luxon';
import { GameSession } from '../../../../commons/src/models/session';
import { isofy, roundedDateToInterval, roundedDateToIntervalMS } from './processor.utils';

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
    const yAxes = 'Seconds';
    const xAxes = 'Cumulative Sessions';
    const oneHourInMs = 1 * 60 * 60 * 1000;
    const tenMinutesInMs = 10 * 60 * 1000;
    const minuteInterval = 10 * 60 * 1000;
    const secondInterval = 1000;
    const hourInterval = oneHourInMs;
    const options = { zone: 'UTC', setZone: true }; // Stop luxon from thinking our timestamps are already in +0530
    let data = new ReportGraphDataUserUsage([], [], xAxes, yAxes);

    if (input.length == 0){
        return Promise.resolve(data);
    }

    const firstSessionTime = DateTime.fromISO(isofy(input[0].start_time), options).toMillis(); 
    let lastSessionTime = firstSessionTime;
    let labelTime = firstSessionTime;
    let interval = secondInterval;
    let map: { [key: number]: number } = {};

    if (input.length > 1){
        lastSessionTime = DateTime.fromISO(isofy(input[input.length - 1].end_time), options).toMillis();

        // If there is more than one hour gap between first & last session then,
        // we count hours. 
        // If there is more than ten minute hour gap, we count minutes.
        // Otherwise, seconds.
        if (lastSessionTime - firstSessionTime > oneHourInMs){
            data.yAxesLabel = 'Hours';
            interval = hourInterval;
        }
        else if (lastSessionTime - firstSessionTime > tenMinutesInMs){
            data.yAxesLabel = 'Minutes';
            interval = minuteInterval;
        }
    }

    // Create labels
    while(labelTime < lastSessionTime){
        const rounded = roundedDateToIntervalMS(labelTime, interval);
        // const label = rounded.toFormat('HH:mm');
        // map[label] = 0;
        map[rounded] = 0;
        labelTime = rounded + interval;
    }

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
            // console.log('ts =', entry.timestamp, 'label =', label, 'rawMs =', time.toMillis(), 'roundedMs =', roundedMs);
        }
        while(time < endTime);
    }

    // Convert the map into readable format
    for (let label in map){
        const timestamp = Number.parseInt(label)
        const date = DateTime.fromMillis(timestamp);
        const timeLabel = date.toFormat('HH:mm');
        // data.labels.push(timeLabel);
        data.labels.push(timestamp);
        data.data.push(map[label]);
    }

    return Promise.resolve(data);
}