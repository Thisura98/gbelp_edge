import { DateTime } from "luxon";
import { isofy } from "../../src/model/processors/processor.utils";

import * as testDAO from '../../src/model/dao/test';
import * as sql from '../../src/util/connections/sql/sql_connection';
import * as pc from '../../src/util/parseconfig';
import * as utils from '../../src/util/utils';

export const oneHour = 1 * 60 * 60 * 1000;
export const tenMinutes = 10 * 60 * 1000;
export const oneSecond = 1 * 1000;

const luxonOptions = { zone: 'UTC', setZone: true };

export function toMilliseconds(input: string): number{
    return DateTime.fromISO(isofy(input), luxonOptions).toMillis()
}

/**
 * Performs the Database initialization setup
 * with test mode enabled, and provides
 * you a clean slate to test stuff.
 * 
 * __NOTE:__ This is an `async` function. Use await.
 */
export async function initializeTestDB(){
    const config = pc.parseConfig('config.json');
    utils.setTestMode(true);
    sql.initialize(config);
    
    const clearStatus = await testDAO.clearTestDatabase();
    expect(clearStatus).toBeTrue();
}