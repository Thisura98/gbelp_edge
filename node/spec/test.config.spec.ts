import * as fs from 'fs/promises';

const configFileLocation = 'config.json';

describe('Config File Tests', () => {
    it('Config File exists', async () => {
        try{
            const file = await fs.readFile(configFileLocation, 'utf-8');
            expect(file).not.toBeNull();
        }
        catch(error){
            fail(error);
        }
    });

    it('Config File has properties', async () => {
        try{
            const file = await fs.readFile(configFileLocation, 'utf-8');
            const config = JSON.parse(file);
            const keys = Object.keys(config);
            const requiredProperties = [
                'environment',
                'port_express', 'port_socketio',
                'fs_res_path', 'fs_res_path_sound', 'fs_res_path_image', 'fs_compiled_games', 'fs_articles',
                'server_base_url',
                'allow_cors_on'
            ];

            for (let prop of requiredProperties){
                const found = keys.find((v) => v == prop);
                expect(found).not.toBeUndefined();
            }
        }
        catch(error){
            fail(error);
        }
    });
});