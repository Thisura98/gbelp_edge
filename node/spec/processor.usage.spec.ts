import { GameSessionUserUsageGroupedByNonce, ReportGraphDataUserUsage } from "../../commons/src/models/reports/user.usage";
import { processUsage } from '../src/model/processors/usage.processor';
import { toMilliseconds } from "./utils/utils";
const yAxesLabel = 'Cumulative Sessions';

function createUsage(times: string[], nonce: string = 'a', sessionId: number = 1, userId: number = 1)
    : GameSessionUserUsageGroupedByNonce{
    return { play_nonce: nonce, session_id: sessionId, user_id: userId, start_time: times[0], end_time: times[1] };
}

describe('User Usage Processor Tests', () => {
    it('Empty Input Test', async () => {
        const input: GameSessionUserUsageGroupedByNonce[] = [];
        const expectedOutput = new ReportGraphDataUserUsage([], [], 'Seconds', yAxesLabel);
        const output = await processUsage(input);
        expect(output).toEqual(expectedOutput);
    })

    it('2 sequential usages', async () => {
        const usageOne: string[] = ['2022-01-01 00:00:00', '2022-01-01 00:10:00'];
        const usageTwo: string[] = ['2022-01-01 00:10:01', '2022-01-01 00:20:00'];

        const input: GameSessionUserUsageGroupedByNonce[] = [ createUsage(usageOne), createUsage(usageTwo) ];
        const expectedOutput = new ReportGraphDataUserUsage(
            [
                toMilliseconds('2022-01-01 00:00:00'),
                toMilliseconds('2022-01-01 00:10:00'),
            ],
            [1, 1], 'Minutes', yAxesLabel
        );
        expect(await processUsage(input)).toEqual(expectedOutput);
    });

    it('2 sequential & 1 concurrent usages', async () => {
        const usageOne: string[]    = ['2022-01-01 00:00:00', '2022-01-01 00:10:00'];
        const usageTwo: string[]    = ['2022-01-01 00:10:01', '2022-01-01 00:20:00'];
        const usageThree: string[]  = ['2022-01-01 00:00:05', '2022-01-01 00:15:00'];

        const input: GameSessionUserUsageGroupedByNonce[] = [
            createUsage(usageOne),
            createUsage(usageTwo),
            createUsage(usageThree)
        ];
        const expectedOutput = new ReportGraphDataUserUsage(
            [
                toMilliseconds('2022-01-01 00:00:00'),
                toMilliseconds('2022-01-01 00:10:00'),
            ],
            [2, 2], 'Minutes', yAxesLabel
        );
        expect(await processUsage(input)).toEqual(expectedOutput);
    });

    it('2 usages with 1 break in the middle', async () => {
        const usageOne: string[] = ['2022-01-01 00:00:00', '2022-01-01 00:10:00'];
        const usageTwo: string[] = ['2022-01-01 00:20:01', '2022-01-01 00:30:00'];

        const input: GameSessionUserUsageGroupedByNonce[] = [ createUsage(usageOne), createUsage(usageTwo) ];
        const expectedOutput = new ReportGraphDataUserUsage(
            [
                toMilliseconds('2022-01-01 00:00:00'),
                toMilliseconds('2022-01-01 00:10:00'),
                toMilliseconds('2022-01-01 00:20:00'),
            ],
            [1, 0, 1], 'Minutes', yAxesLabel
        );
        expect(await processUsage(input)).toEqual(expectedOutput);
    });
});