import { GameSessionUserUsage } from '../../../../commons/src/models/session/user.usage';
import { ReportGraphDataUserUsage } from '../../../../commons/src/models/reports/user.usage';
import { DateTime } from 'luxon';

export function processUsage(input: GameSessionUserUsage[]): Promise<ReportGraphDataUserUsage>{
    const data = new ReportGraphDataUserUsage([], [], '', '');

    return new Promise<ReportGraphDataUserUsage>((resolve, reject) => {
        let i = 0;
        for (let entry of input){
            const ts = `${entry.timestamp}, ${typeof(entry.timestamp)}`;
            console.log(ts);
            // const entryTime = DateTime.fromISO(entry.timestamp, {
            //     zone: 'utc'
            // });
            // console.log(entry.timestamp, entryTime, 'usage HH:mm = ', entryTime.hour, entryTime.minute);
            i += 1;

            if (i > 5)
                break;
        }

        // Demo code
        resolve(data);
    });
}