import { GameSessionUserUsage } from '../../../../commons/src/models/session/user.usage';
import { ReportGraphDataUserUsage } from '../../../../commons/src/models/reports/user.usage';

export function processUsage(input: GameSessionUserUsage[]): Promise<ReportGraphDataUserUsage>{
    const data = new ReportGraphDataUserUsage([], [], '', '');

    return Promise.resolve(data);
}