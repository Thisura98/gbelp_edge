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
    // let lastProgress = 0;
    // let lastQuantizedTime = 0;
    // let map: { [key: number]: number } = {};
    // let map: { [key: number]: { [key: string] : number } } = {};
    // let map: Map<number, { [key: string] : number }> = new Map();
    let lastProgress: { [key: string]: number } = {};
    let lastUpdateTime: { [key: string]: number } = {};
    let totals: Map<number, number> = new Map();
    // let totals: { [key: number]: number } = {};

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

    for (let entry of input){
        const key = `${entry.user_id}-${entry.objective_id}`;
        const time = DateTime.fromISO(isofy(entry.last_updated), options).toMillis();;

        /**
         * Quantized Time
         */
        const qt = roundedDateToIntervalMS(time, interval);
        /**
         * Last updated time for this userId-objectiveId key
         */
        const lastUpdatedTime = lastUpdateTime[key];
        /**
         * Last progress for this userId-objectiveId key
         */
        const lp = lastProgress[key];

        let newProgress = 0;

        if (lastUpdatedTime != null){
            const diff = qt - lastUpdatedTime;

            if (diff > interval){
                // Perform filling in interval gaps
                let fTime = lastUpdatedTime;
                do{
                    fTime += interval;
                    // totals[fTime] = (totals[fTime] == null) ? lp : (totals[fTime] + lp);
                    const t = totals.get(fTime);
                    totals.set(fTime, t == undefined ? lp : (t! + lp));
                }
                while(fTime < qt);
            }

            // Update progress
            if (lp > entry.progress){
                newProgress = entry.progress;
                lastProgress[key] = newProgress;
            }
            else if (lp == entry.progress){
                newProgress = lp;
            }
            else{
                newProgress = entry.progress - lp;
                lastProgress[key] = entry.progress;
            }
        }
        else{
            // First progress for userId-objectiveId combined key
            newProgress = entry.progress;
            lastProgress[key] = newProgress;
        }

        // totals[qt] = (totals[qt] == null) ? newProgress : (totals[qt] + newProgress);

        const t = totals.get(qt);
        totals.set(qt, t == undefined ? newProgress : (t! + newProgress));
        lastUpdateTime[key] = qt;
    }

    // Convert the totalMap into readable format
    let lastTotalForQuantizedTime = 0;
    for (const [qTime, total] of totals){
        // const timestamp = Number.parseInt(label)
        data.labels.push(qTime);
        data.data.push(lastTotalForQuantizedTime + total);
        console.log("\t\t PUSHED", qTime, data.data[data.data.length - 1]);
        lastTotalForQuantizedTime = data.data[data.data.length - 1];
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