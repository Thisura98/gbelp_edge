import * as fs from 'fs/promises';
import { IConfig } from '../src/util/parseconfig';

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
            const dummy: IConfig = {
                environment: '',
                port_express: 0,
                port_socketio: 0,
                angular_directory: '',
                allow_cors_on: '',
                fs_res_path: '',
                fs_res_path_sound: '',
                fs_res_path_image: '',
                fs_compiled_games: '',
                fs_articles: '',
                server_base_url: '',
                production_database: '',
                test_database: ''
            };

            const file = await fs.readFile(configFileLocation, 'utf-8');
            const config = JSON.parse(file);
            const requiredKeys = Object.keys(dummy);
            const keys = Object.keys(config);

            expect(keys).toEqual(jasmine.arrayContaining(requiredKeys));
        }
        catch(error){
            fail(error);
        }
    });
});