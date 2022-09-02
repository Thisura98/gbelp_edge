import { ReportGraphDataUserObjectiveCompletionProgress, ReportGraphDataUserObjectiveProgressByTime, ReportIntermediateObjectiveCompletionProgress } from '../../../../commons/src/models/reports/user.objective';
import { DateTime } from 'luxon';
import { GameSessionUserObjective } from '../../../../commons/src/models/session/user.objective';
import { isofy, determineTimeQuantizationInterval, roundedDateToIntervalMS, round } from './processor.utils';

/**
 * Generates Graph Data for User Objectives progress by Time.
 * 
 * @param input Must be sorted in ascending last_updated order
 */
export function processObjectivesByTime(input: GameSessionUserObjective[]){
    const yAxes = 'Objective Points';
    const xAxes = 'Seconds';
    const options = { zone: 'UTC', setZone: true }; // Stop luxon from thinking our timestamps are already in +0530
    let data = new ReportGraphDataUserObjectiveProgressByTime([], [], xAxes, yAxes);

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

    // console.log("quantization =", JSON.stringify(quantization));
    // console.log("processObjectivesByTime processing n elements. n =", input.length);

    for (let entry of input){
        const key = `${entry.user_id}-${entry.objective_id}`;
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

/**
 * Generates Graph Data for User Objectives progress by each Objective.
 * [For a Bar graph - unlike the area chart for 'processObjectivesByTime']
 * 
 * @param input Must be sorted in ascending last_updated order
 */
 export function processObjectivesByCompletion(input: ReportIntermediateObjectiveCompletionProgress[]){
    const yAxes = 'Progress';
    const xAxes = 'Objective';
    let data = new ReportGraphDataUserObjectiveCompletionProgress([], [], xAxes, yAxes);

    // if (input.length == 0){
    //     return Promise.resolve(data);
    // }
    
    for (let entry of input){
        // data.labels.push(i.toString());
        data.labels.push(entry.objective_name);
        data.data.push( Number.parseFloat(entry.objective_progress) );
    }

    return Promise.resolve(data);
}