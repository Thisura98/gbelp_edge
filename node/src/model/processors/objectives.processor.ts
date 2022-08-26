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
    let lastQuantizedTime = 0;
    // let map: { [key: number]: number } = {};
    // let map: { [key: number]: { [key: string] : number } } = {};
    let map: Map<number, { [key: string] : number }> = new Map();
    let totalsMap: Map<number, number> = new Map();

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

    // Separate objective progress into quantizedTime and (userId + objectiveId) buckets
    for (let entry of input){
        let time = DateTime.fromISO(isofy(entry.last_updated), options).toMillis();
        const roundedTime = roundedDateToIntervalMS(time, interval);
        
        const userAndObjectiveWiseKey = `${entry.user_id}-${entry.objective_id}`;
        if (map.get(roundedTime) == null){
            map.set(roundedTime, {});
        }

        let tuple: { [key: string] : number } = {};
        tuple[userAndObjectiveWiseKey] = entry.progress;
        map.set(roundedTime, tuple);
    }

    // Fill and spaces between quantizedTime(s) and count totals for previously separated buckets
    for (const [quantizedTime, entries] of map.entries()){
        const diff = quantizedTime - lastQuantizedTime;
        let totalProgressForQuantizedTime = lastProgress;

        if (lastProgress != 0 && diff > interval){
            let time = lastQuantizedTime;
            do{
                time += interval;
                totalsMap.set(time, lastProgress);
            }
            while(time < quantizedTime);
        }

        if (entries != null){
            for (let key in entries){
                totalProgressForQuantizedTime += entries[key];
            }
        }

        totalsMap.set(quantizedTime, totalProgressForQuantizedTime);
        lastQuantizedTime = quantizedTime;
        lastProgress = totalProgressForQuantizedTime;
    }

    // Convert the totalMap into readable format
    for (const [qTime, total] of totalsMap){
        // const timestamp = Number.parseInt(label)
        data.labels.push(qTime);
        data.data.push(total);
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