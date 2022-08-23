import { ReportGraphDataUserObjectives } from '../../../../commons/src/models/reports/user.objective';
import { DateTime } from 'luxon';
import { GameSessionUserObjective } from '../../../../commons/src/models/session/user.objective';
import { isofy, determineTimeQuantizationInterval, roundedDateToIntervalMS, createEmptyQuantizedIntervalMap } from './processor.utils';

/**
 * Generates Graph Data for User Objectives progress by Time.
 * 
 * @param input Must be sorted in ascending last_updated order
 */
export function processObjectivesByTime(input: GameSessionUserObjective[]){
    const yAxes = 'Seconds';
    const xAxes = 'Cumulative Progress';
    const options = { zone: 'UTC', setZone: true }; // Stop luxon from thinking our timestamps are already in +0530
    let data = new ReportGraphDataUserObjectives([], [], xAxes, yAxes);

    if (input.length == 0){
        return Promise.resolve(data);
    }

    const firstSessionTime = DateTime.fromISO(isofy(input[0].last_updated), options).toMillis(); 
    let lastSessionTime = firstSessionTime;
    let interval = 0;
    let lastProgress = 0;
    let map: { [key: number]: number } = {};

    if (input.length > 1){
        lastSessionTime = DateTime.fromISO(isofy(input[input.length - 1].last_updated), options).toMillis();
    }

    // Determine interval
    const quantization = determineTimeQuantizationInterval(firstSessionTime, lastSessionTime)
    interval = quantization.interval;
    data.xAxesLabel = quantization.intervalName;

    // Create labels
    // const intervalMap = createEmptyQuantizedIntervalMap(firstSessionTime, lastSessionTime, interval);
    // map = intervalMap.map;

    // Add one time point for each objective progress update
    for (let entry of input){
        let time = DateTime.fromISO(isofy(entry.last_updated), options).toMillis();
        const label = roundedDateToIntervalMS(time, interval);
        map[label] = lastProgress + entry.progress;
        lastProgress = map[label];
    }

    // Convert the map into readable format
    for (let label in map){
        const timestamp = Number.parseInt(label)
        data.labels.push(timestamp);
        data.data.push(map[label]);
    }

    return Promise.resolve(data);
}