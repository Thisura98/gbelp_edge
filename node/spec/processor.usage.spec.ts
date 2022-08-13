import { ReportGraphDataUserUsage } from "../../commons/src/models/reports/user.usage";
import { GameSessionUserUsage } from "../../commons/src/models/session/user.usage";
import { processUsage } from '../src/model/processors/usage.processor';

describe('User Usage Processor', () => {
    it('Empty Input Test', async () => {
        const input: GameSessionUserUsage[] = [];
        const expectedOutput = new ReportGraphDataUserUsage([], [], '', '');
        const output = await processUsage(input);
        expect(output).toEqual(expectedOutput);
    })
});