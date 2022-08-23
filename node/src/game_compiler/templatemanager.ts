import fs from 'fs';
import path from 'path';
import * as l from '../util/logger';

export class TemplateManager{
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
                    const stripped = this.stripUnwantedRequires(data);
                    // console.log("STRIPPED = ", stripped);
                    resolve(stripped)
                }
            });
        })
    }

    /**
     * @param source the string to search for the placeholder in.
     * @param placeholder the string which will be replaced
     * @param multiple replace all occurences or just the first?
     * @param boolean if true, missing tokens will not generate errors
     * @param replaceWith content then will replace "placeholder"
     */
    static replacePlaceholder(
        source: string, 
        placeholder: string, 
        multiple: boolean, 
        optional: boolean,
        replaceWith: string
    ): Promise<string>{

        // replace "TOKEN" and "// TOKEN"
        const realToken = `${placeholder}|\/\/ ${placeholder}`
        const search = new RegExp(realToken, multiple ? 'g' : '');

        if (source.search(search) == -1){
            if (optional){
                return Promise.resolve(source);
            }
            else{
                return Promise.reject(
                    `Could not find '${placeholder}' to replace with '${replaceWith}' in source`
                );
            }
        }

        return Promise.resolve(source.replace(search, replaceWith));

    }

    static stripUnwantedRequires(source: string): string{
        const search = new RegExp(/^require.+$/gm);
        const replace = '// removed import';
        return source.replace(search, replace);
    }
}