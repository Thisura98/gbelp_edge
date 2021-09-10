import fs from 'fs';
import path from 'path';
import * as l from '../../../util/logger';

export class Template{
    /**
     * @param path Path relative to the "game_compiler/helpers folder" (e.g. scene/template.js)
     */
    static readTemplate(templatePath: string): Promise<string>{
        return new Promise<string>((resolve, reject) => {
            const relPath = path.join('src/game_compiler/helpers', templatePath);
            fs.readFile(relPath, "utf-8", (error, data) => {
                if (error){
                    const msg = 'Template.readTemplate error ' + error
                    l.logc(msg, '');
                    reject(msg);
                }
                else{
                    const stripped = this.stripUnwantedImports(data);
                    resolve(stripped)
                }
            });
        })
    }

    /**
     * @param source the string to search for the placeholder in.
     * @param placeholder the string which will be replaced
     * @param multiple replace all occurences or just the first?
     * @param replaceWith content then will replace "placeholder"
     */
    static replacePlaceholder(
        source: string, 
        placeholder: string, 
        multiple: boolean, 
        replaceWith: string
    ): Promise<string>{

        const search = new RegExp(`${placeholder}`, multiple ? 'g' : '');

        if (source.search(search) == -1){
            return Promise.reject(
                `Could not find '${placeholder}' to replace with '${replaceWith}' in source`
            );
        }

        return Promise.resolve(source.replace(search, replaceWith));

    }

    private static stripUnwantedImports(source: string): string{
        const search = new RegExp('^require.+', 'g');
        const replace = '// removed import';
        return source.replace(search, replace);
    }
}