import { ReportGraphDataUserObjectiveCompletionProgress, ReportGraphDataUserObjectiveProgressByTime, ReportIntermediateObjectiveCompletionProgress } from '../../../../commons/src/models/reports/user.objective';
import { DateTime } from 'luxon';
import { GameSessionUserObjective } from '../../../../commons/src/models/session/user.objective';
import { isofy, determineTimeQuantizationInterval, roundedDateToIntervalMS, createEmptyQuantizedIntervalMap } from './processor.utils';

/**
 * Generates Graph Data for User Objectives progress by Time.
 * 
 * @param input Must be sorted in ascending last_updated order
 */
export function processObjectivesByTime(input: GameSessionUserObjective[]){
    const yAxes = 'Cumulative Sessions';
    const xAxes = 'Seconds';
    const options = { zone: 'UTC', setZone: true }; // Stop luxon from thinking our timestamps are already in +0530
    let data = new ReportGraphDataUserObjectiveProgressByTime([], [], xAxes, yAxes);

    if (input.length == 0){
        return Promise.resolve(data);
    }

    const firstSessionTime = DateTime.fromISO(isofy(input[0].last_updated), options).toMillis(); 
    let lastSessionTime = firstSessionTime;
    let interval = 0;
    let lastProgress = 0;
    let lastRoundedTime = 0;
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

    console.log("quantization =", JSON.stringify(quantization));
    console.log("processObjectivesByTime processing n elements. n =", input.length);

    // Add one time point for each objective progress update
    for (let entry of input){
        let time = DateTime.fromISO(isofy(entry.last_updated), options).toMillis();
        const roundedTime = roundedDateToIntervalMS(time, interval);
        const diff = roundedTime - lastRoundedTime;

        // Fill in gaps between attempts
        if (lastRoundedTime != 0 && diff > interval){
            let fillTime = lastRoundedTime;
            do{
                fillTime += interval;
                map[fillTime] = lastProgress;
                console.log("fillTime", fillTime, "target", roundedTime);
            }
            while(fillTime < roundedTime);
        }

        // Count progress made in this quantized time interval
        if (map[roundedTime] == null){
            map[roundedTime] = entry.progress
        }
        else{
            map[roundedTime] = map[roundedTime] + entry.progress
        }
        lastProgress = map[roundedTime];
        lastRoundedTime = roundedTime;

        console.log("Consider label with progress", roundedTime, entry.progress, "total =", map[roundedTime]);
    }

    // Convert the map into readable format
    for (let label in map){
        const timestamp = Number.parseInt(label)
        data.labels.push(timestamp);
        data.data.push(map[label]);
    }

    return Promise.resolve(data);
}

/**
 * Generates Graph Data for User Objectives progress by each Objective.
 * [For a Bar graph - unlike the area chart for 'processObjectivesByTime']
 * 
 * @param input Must be sorted in ascending last_updated order
 */
 export function processObjectivesByCompletion(input: ReportIntermediateObjectiveCompletionProgress[]){
    const yAxes = 'Progress';
    const xAxes = 'Objective';
    const options = { zone: 'UTC', setZone: true }; // Stop luxon from thinking our timestamps are already in +0530
    let data = new ReportGraphDataUserObjectiveCompletionProgress([], [], xAxes, yAxes);

    if (input.length == 0){
        return Promise.resolve(data);
    }
    
    for (let entry of input){
        // data.labels.push(i.toString());
        data.labels.push(entry.objective_name);
        data.data.push( Number.parseFloat(entry.objective_progress) );
    }

    return Promise.resolve(data);
}