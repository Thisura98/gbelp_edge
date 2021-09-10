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

    for (let so of level.scene.objects){
        const x = so.frame.x;
        const y = so.frame.y;
        const w = so.frame.w;
        const h = so.frame.h;

        const i = commands.length + 1;
        const c1 = `const sprite_${i} = this.add.sprite(${x}, ${y}, '${so.name}');`;
        const c2 = `sprite_${i}.name = "${so.name}";`;
        const c3 = `this.spriteReferences.push(sprite_${i});`;

        commands.push(`// --- scene object ${so.name} ---`)
        commands.push(c1);
        commands.push(c2);
        commands.push(c3);
        commands.push('\n')
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