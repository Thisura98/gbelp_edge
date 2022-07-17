import { GameLevel } from "../../../../../../commons/src/models/game/levels";
import { GameProjectResource } from "../../../../../../commons/src/models/game/resources";
import { TemplateManager } from "../../../templatemanager";
import * as pc from '../../../../util/parseconfig';
import * as l from '../../../../util/logger';
import * as util from '../../../../util/utils';
import { SceneObjectType } from "../../../../../../commons/src/models/game/levels/scene";

export function generateCreateCode(
    code: string,
    level: GameLevel,
): Promise<string>{

    let commands: string[] = [];
    let i = 1;

    commands.push(`let scaleX = 0, scaleY = 0;`);

    for (let so of level.scene.objects){
        const x = so.frame.x + so.frame.w / 2;
        const y = so.frame.y + so.frame.h / 2;

        const c1 = `const sprite_${i} = this.add.sprite(${x}, ${y}, '${so.name}');`;
        const c2 = `sprite_${i}.name = "${so.name}";`;
        const c3 = `scaleX = ${so.frame.w} / sprite_${i}.displayWidth;`
        const c4 = `scaleY = ${so.frame.h} / sprite_${i}.displayHeight;`
        const c5 = `sprite_${i}.setScale(scaleX, scaleY);`;
        const c6 = `this.spriteReferences['${so.name}'] = sprite_${i};`;

        const lines = [c1, c2, c3, c4, c5, c6].map(v => `\t\t${v}`);

        commands.push(`\t\t// --- scene object ${so.name} ---`)
        commands.push(...lines);
        commands.push('\n')

        i++;
    }

    return Promise.resolve(code)
    .then(t => {
        const createLines = commands.join('\n');
        return TemplateManager.replacePlaceholder(t, 'EDGTOKEN_CREATE', false, false, createLines);
    })
    .catch(err => {
        l.logc(err, 'generateCreateCode');
        return Promise.reject(err);
    })
}