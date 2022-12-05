import { GameLevel } from "../../../../../../commons/src/models/game/levels";
import { GameProjectResource } from "../../../../../../commons/src/models/game/resources";
import { TemplateManager } from "../../../templatemanager";
import * as pc from '../../../../Util/config';
import * as l from '../../../../Util/logger';
import * as util from '../../../../Util/utils';
import { SceneObjectType } from "../../../../../../commons/src/models/game/levels/scene";

const EDGTOKEN_CREATE = 'EDGTOKEN_CREATE';

export function generateCreateCode(
    code: string,
    level: GameLevel,
): Promise<string>{

    if (code == undefined || code == null || code.trim().length == 0){
        return Promise.resolve(code);
    }

    let commands: string[] = [];
    let i = 1;

    // No need to indent the 'scaleX' line
    commands.push(`let scaleX = 0, scaleY = 0;`);
    commands.push(`\t\tthis.spriteReferences = {}`);

    for (let so of level.scene.objects){

        // Don't create camera object as a sprite
        if (so.type == SceneObjectType.camera){
            continue;
        }

        const x = so.frame.x + so.frame.w / 2;
        const y = so.frame.y + so.frame.h / 2;

        const c1 = `const sprite_${i} = this.add.sprite(${x}, ${y}, '${so.name}').setInteractive();`;
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

    commands.push(createSetCameraCode());
    commands.push('\n');

    return Promise.resolve(code)
    .then(t => {
        const createLines = commands.join('\n');
        return TemplateManager.replacePlaceholder(t, EDGTOKEN_CREATE, false, false, createLines);
    })
    .catch(err => {
        l.logc(err, 'generateCreateCode');
        return Promise.reject(err);
    })
}

function createSetCameraCode(): string{
    let lines: string[] = [
        "const objects = this.levelData.objects;",
        "const camera = objects.find((o) => o.type == 'camera');",
        `console.log("Camera width & height", camera.frame.w, camera.frame.h);`,
        `this.scale.setGameSize(camera.frame.w, camera.frame.h);`,
        `this.scale.resize(camera.frame.w, camera.frame.h);`,
        `this.cameras.main.setBounds(camera.frame.x, camera.frame.y, camera.frame.w, camera.frame.h)`
    ];
    lines = lines.map(v => `\t\t${v}`);
    return lines.join('\n');
}