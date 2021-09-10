import { GameLevel } from "../../../../../../commons/src/models/game/levels";
import { GameProjectResource } from "../../../../../../commons/src/models/game/resources";
import { Template } from "../../common/templateloader";
import * as pc from '../../../../util/parseconfig';
import * as l from '../../../../util/logger';
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
        const c6 = `this.spriteReferences.push(sprite_${i});`;

        commands.push(`// --- scene object ${so.name} ---`)
        commands.push(c1);
        commands.push(c2);
        commands.push(c3);
        commands.push(c4);
        commands.push(c5);
        commands.push(c6);
        commands.push('\n')

        i++;
    }

    // return Template.readTemplate(
    //     'scene/helpers/template_create.js'
    // )
    return Promise.resolve(
        code
    )
    .then(t => {
        const createLines = commands.join('\n');
        return Template.replacePlaceholder(t, 'EDGTOKEN_CREATE', false, createLines);
    })
    .catch(err => {
        l.logc(err, 'generateCreateCode');
        return Promise.reject(err);
    })
}