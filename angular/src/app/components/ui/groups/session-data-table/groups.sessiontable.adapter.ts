import { GameType } from "../../../../../../../commons/src/models/game/game";
import { GameSessionState, GameSessionWithExtensions } from "../../../../../../../commons/src/models/session";
import { Actions, GroupsSessionRow } from "./groups.sessiontable";

/**
 * Convert Database Rows to Table Rows
 */
export class GroupsSessionDataAdapter{
  constructor(){}

  adapt(data: GameSessionWithExtensions[], hideActions: boolean): GroupsSessionRow[]{

    const actionsForStates = this.getActionsForStates();

    return data.map(s => {

      let actions: Actions[] = [];
      let gameType = '';

      if (s.game_type == GameType.Singleplayer)
        gameType = 'Single Player';
      else
        gameType = 'Multi Player';

      if (!hideActions){
        actions = actionsForStates.get(s.state)!;
      }

      const obj: GroupsSessionRow = {
        start_time: s.start_time,
        end_time: s.end_time,
        state: s.state,
        game_name: s.game_entry_name,
        type: gameType,
        actions: actions
      }
      return obj;
    });
  }

  private getActionsForStates(): Map<number, Actions[]>{
    const actionsForStates: Map<number, Actions[]> = new Map();

    actionsForStates.set(GameSessionState.scheduled, [
      Actions.duplicate,
      Actions.edit,
      Actions.delete
    ]);

    actionsForStates.set(GameSessionState.live, [
      Actions.duplicate,
      Actions.stop,
      Actions.delete,
      Actions.reports
    ]);

    actionsForStates.set(
      GameSessionState.multiplayerStaging, 
      actionsForStates.get(GameSessionState.live)!
    );

    actionsForStates.set(
      GameSessionState.multiplayerReady, 
      actionsForStates.get(GameSessionState.live)!
    );

    actionsForStates.set(GameSessionState.complete, [
      Actions.duplicate,
      Actions.delete,
      Actions.reports
    ]);

    actionsForStates.set(
      GameSessionState.canceled, 
      actionsForStates.get(GameSessionState.complete)!
    );

    return actionsForStates;
  }
}