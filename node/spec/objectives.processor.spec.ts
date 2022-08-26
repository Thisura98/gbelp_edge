import { GameSessionUserObjective } from '../../commons/src/models/session/user.objective';
import { ReportGraphDataUserObjectiveProgressByTime } from '../../commons/src/models/reports/user.objective';
import { processObjectivesByTime } from '../src/model/processors/objectives.processor';
import { toMilliseconds } from './utils/utils';

const yAxesLabel = 'Cumulative Sessions';

function createObjective(progress: number, time: string, objectiveId: string = '1', userId: string = '1', id: string = '1', sessionId: string = '1', nonce: string = 'a'): GameSessionUserObjective{
    return new GameSessionUserObjective(id, sessionId, objectiveId, userId, progress, nonce, time);
}

describe('Objective Processor Tests', () => {

    it('Empty Input Test', async () => {
        const input: GameSessionUserObjective[] = [];
        const expectedOutput = new ReportGraphDataUserObjectiveProgressByTime([], [], 'Seconds', yAxesLabel)
        expect(await processObjectivesByTime(input)).toEqual(expectedOutput);
    });

    it('2 progress updates for same objective', async () => {
        const input: GameSessionUserObjective[] = [
            createObjective(0.5, '2022-01-01 10:00:00', '1'),
            createObjective(1.0, '2022-01-01 10:10:01', '1')
        ];
        const expectedOutput = new ReportGraphDataUserObjectiveProgressByTime(
            [
                toMilliseconds('2022-01-01 10:00:00'),
                toMilliseconds('2022-01-01 10:10:00')
            ],
            [0.5, 1.0], 'Minutes', yAxesLabel
        );
        expect(await processObjectivesByTime(input)).toEqual(expectedOutput);
    });

    it('2 progress updates for different objectives', async () => {
        const input: GameSessionUserObjective[] = [
            createObjective(0.5, '2022-01-01 10:00:00', '1'),
            createObjective(1.0, '2022-01-01 10:10:01', '2')
        ];
        const expectedOutput = new ReportGraphDataUserObjectiveProgressByTime(
            [
                toMilliseconds('2022-01-01 10:00:00'),
                toMilliseconds('2022-01-01 10:10:00')
            ],
            [0.5, 1.5], 'Minutes', yAxesLabel
        );
        expect(await processObjectivesByTime(input)).toEqual(expectedOutput);
    });

    // it('2 progress updates for same objective (with 20 minute break)', async () => {
    //     const input: GameSessionUserObjective[] = [
    //         createObjective(0.5, '2022-01-01 10:00:00'),
    //         createObjective(1.0, '2022-01-01 10:21:00')
    //     ];
    //     const expectedOutput = new ReportGraphDataUserObjectiveProgressByTime(
    //         [
    //             toMilliseconds('2022-01-01 10:00:00'),
    //             toMilliseconds('2022-01-01 10:10:00'),
    //             toMilliseconds('2022-01-01 10:20:00')
    //         ],
    //         [0.5, 0.5, 1.0], 'Minutes', yAxesLabel
    //     );
    //     expect(await processObjectivesByTime(input)).toEqual(expectedOutput);
    // });

});