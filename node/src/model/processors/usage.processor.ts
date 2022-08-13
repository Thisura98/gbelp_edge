import { GameSessionUserUsage } from '../../../../commons/src/models/session/user.usage';
import { ReportGraphDataUserUsage } from '../../../../commons/src/models/reports/user.usage';
import { DateTime } from 'luxon';
import { GameSession } from '../../../../commons/src/models/session';
import { isofy, roundedDateToInterval } from './processor.utils';

export function processUsage(session: GameSession, input: GameSessionUserUsage[]): Promise<ReportGraphDataUserUsage>{
    const yAxes = 'Cumulative Students';
    const xAxes = 'Minutes';
    const minuteInterval = 10 * 60 * 1000;
    const hourInterval = 1 * 60 * 60 * 1000;
    let data = new ReportGraphDataUserUsage([], [], xAxes, yAxes);
    let isUnitHours = false;

    if (input.length == 0){
        return Promise.resolve(data);
    }

    const firstSessionTime = DateTime.fromISO(isofy(input[0].timestamp)); 
    let lastSessionTime = firstSessionTime;
    let labelTime = firstSessionTime;
    let interval = minuteInterval;
    let map: { [key: string]: number } = {};

    if (input.length > 1){
        lastSessionTime = DateTime.fromISO(isofy(input[input.length - 1].timestamp));

        // If there is more than one hour gap between first & last session then,
        // we count hours. Otherwise, we count minutes.
        if (lastSessionTime.minus(firstSessionTime.toMillis()).hour > 0){
            isUnitHours = true;
            data.xAxesLabel = 'Hours';
            interval = hourInterval;
        }
    }

    // Create labels
    while(labelTime.toSeconds() < lastSessionTime.toSeconds()){
        const rounded = roundedDateToInterval(labelTime, interval);
        const label = rounded.toFormat('HH:mm');
        map[label] = 0;
        labelTime = rounded.plus(interval);
    }

    for (let entry of input){
        const time = DateTime.fromISO(isofy(entry.timestamp));
        const label = roundedDateToInterval(time, interval).toFormat('HH:mm');
        // console.log('ts =', entry.timestamp, 'label =', label, 'rawMs =', time.toMillis(), 'roundedMs =', roundedMs);
        map[label] = map[label] + 1;
    }

    for (let label in map){
        data.labels.push(label);
        data.data.push(map[label]);
    }

    return Promise.resolve(data);
}