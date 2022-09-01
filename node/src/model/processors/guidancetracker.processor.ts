import { ReportGraphDataUserGuidacenTrackerTimeGraph } from '../../../../commons/src/models/reports/user.guidancetracker';
import { DateTime } from 'luxon';
import { GameSessionUserGuidanceTracker } from '../../../../commons/src/models/session/user.guidancetracker';
import { isofy, determineTimeQuantizationInterval, roundedDateToIntervalMS, round } from './processor.utils';

/**
 * Generates Graph Data for User Objectives progress by Time.
 * 
 * @param input Must be sorted in ascending last_updated order
 */
export function processGuidanceTrackerTimeGraph(input: GameSessionUserGuidanceTracker[]){
    const yAxes = 'Total';
    const xAxes = 'Seconds';
    const options = { zone: 'UTC', setZone: true }; // Stop luxon from thinking our timestamps are already in +0530
    let data = new ReportGraphDataUserGuidacenTrackerTimeGraph([], [], xAxes, yAxes);

    if (input.length == 0){
        return Promise.resolve(data);
    }

    const firstSessionTime = DateTime.fromISO(isofy(input[0].last_updated), options).toMillis(); 
    let lastSessionTime = firstSessionTime;
    let interval = 0;
    let lastProgress: { [key: string]: number } = {};
    let totals: Map<number, number> = new Map();

    if (input.length > 1){
        lastSessionTime = DateTime.fromISO(isofy(input[input.length - 1].last_updated), options).toMillis();
    }

    // Determine interval
    const quantization = determineTimeQuantizationInterval(firstSessionTime, lastSessionTime)
    interval = quantization.interval;
    data.xAxesLabel = quantization.intervalName;

    for (let entry of input){
        const key = `${entry.user_id}-${entry.tracker_id}`;
        const time = DateTime.fromISO(isofy(entry.last_updated), options).toMillis();;
        const qt = roundedDateToIntervalMS(time, interval);
        const lp = lastProgress[key];

        let newProgress = (lp == null) ? entry.progress : (entry.progress - lp);
        newProgress = round(newProgress);
        
        const t = totals.get(qt);
        totals.set(qt, t == undefined ? newProgress : (t! + newProgress));
        lastProgress[key] = entry.progress;

        // console.log('\tNewProgress =', newProgress);
    }

    // Convert the totalMap into readable format
    let lastTotalForQuantizedTime = 0;
    for (const [qTime, total] of totals){
        const roundedTotal = round(total);
        const targetTotal = round(total + lastTotalForQuantizedTime);
        data.labels.push(qTime);
        data.data.push(targetTotal);
        lastTotalForQuantizedTime = data.data[data.data.length - 1];
    }

    return Promise.resolve(data);
}