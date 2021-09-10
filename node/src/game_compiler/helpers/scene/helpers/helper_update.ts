import { GameLevel } from "../../../../../../commons/src/models/game/levels";
import { GameProjectResource } from "../../../../../../commons/src/models/game/resources";
import { Template } from "../../common/templateloader";
import * as pc from '../../../../util/parseconfig';
import * as l from '../../../../util/logger';
import * as util from '../../../../util/utils';
import { SceneObjectType } from "../../../../../../commons/src/models/game/levels/scene";

export function generateUpdateCode(
    code: string,
    level: GameLevel,
): Promise<string>{
    return Promise.resolve(
        code
    )
    .then(t => {
        const base64Code = level.logic.script.perframe;
        const decoded = util.decodeGameScript(base64Code);
        return Template.replacePlaceholder(t, 'EDGTOKEN_GAMESCRIPT_EACH_FRAME', false, decoded);
    })
    .catch(err => {
        l.logc(err, 'generateCreateCode');
        return Promise.reject(err);
    })
}