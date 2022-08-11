import * as fs from 'fs/promises';

const configFileLocation = 'config.json';

describe('Config File Tests', () => {
    it('Config File exists', async () => {
        try{
            const file = await fs.readFile(configFileLocation);
            expect(file).not.toBeNull();
        }
        catch(error){
            fail(error);
        }
    });
});