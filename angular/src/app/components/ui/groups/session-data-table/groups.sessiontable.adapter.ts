import { GameType } from "../../../../../../../commons/src/models/game/game";
import { GameSessionState, GameSessionWithExtensions } from "../../../../../../../commons/src/models/session";
import { Actions, GroupsSessionTableRow, GroupsSessionTableSection } from "./groups.sessiontable";

/**
 * Convert Database Rows to Table Rows
 */
export class GroupsSessionDataAdapter{
  constructor(){}

  adapt(data: GameSessionWithExtensions[], hideActions: boolean): GroupsSessionTableSection[]{

    const actionsForStates = this.getActionsForStates();

    const mapped = data.map(s => {

      let actions: Actions[] = [];
      let gameType = '';

      if (s.game_type == GameType.Singleplayer)
        gameType = 'Single Player';
      else
        gameType = 'Multi Player';

      if (!hideActions){
        actions = actionsForStates.get(s.state)!;
      }

      const obj: GroupsSessionTableRow = {
        start_time: s.start_time,
        end_time: s.end_time,
        state: s.state,
        game_name: s.game_entry_name,
        type: gameType,
        actions: actions
      }
      return obj;
    });

    /**
     * Sorted in descending order
     */
    const sorted = mapped.sort((a, b) => {
      const d1 = this.getDateFromTime(a.start_time);
      const d2 = this.getDateFromTime(b.start_time);
      return d2.getTime() - d1.getTime();
    })

    let sections: GroupsSessionTableSection[] = [];
    let lastTimeString: string = '';
    let lastSection: GroupsSessionTableSection = { title: '', rows: [] };

    for (let item of sorted){
      const timeString = this.getFormattedStartDate(item.start_time);
      if (lastTimeString == '' || timeString == lastTimeString){
        lastSection.title = timeString;
        lastSection.rows.push(item);
      }
      else{
        sections.push(lastSection);
        lastSection = { title: '', rows: [] };
      }
    }

    if (lastSection.title != ''){
      sections.push(lastSection);
    }

    return sections;
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

  private getFormattedStartDate(timeStr: string): string{
    const date = new Date(timeStr);
    const today = new Date();
    // todo
    // return Today, Tomorrow, Yesterday
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  private getDateFromTime(timeStr: string): Date{
    return new Date(timeStr);
  }
}