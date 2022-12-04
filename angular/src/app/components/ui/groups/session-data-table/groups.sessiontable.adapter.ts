import { GameType } from "../../../../../../../commons/src/models/game/game";
import { GameSessionState, GameSessionType, GameSessionWithExtensions } from "../../../../../../../commons/src/models/session";
import { Actions, GroupsSessionTableRow, GroupsSessionTableSection } from "./groups.sessiontable";

/**
 * Convert Database Rows to Table Rows
 */
export class GroupsSessionDataAdapter{
  constructor(){}

  adapt(data: GameSessionWithExtensions[], hideActions: boolean): GroupsSessionTableSection[]{

    const actionsForStates = this.getActionsForStates();

    // Step 1: Convert Input Data model to Target Data model
    const mapped = data.map(s => {

      let actions: Actions[] = [];
      let gameType = '';

      if (s.game_type == GameType.Singleplayer)
        gameType = 'Single Player';
      else
        gameType = 'Multi Player';

      let sessionType = '';
      if (s.type_id == GameSessionType.test){
        sessionType = 'Test Session';
      }
      else{
        // sessionType = 'Scheduled in, "' + s.group_name + '"';
        sessionType = 'Real Session';
      }

      if (!hideActions){
        actions = actionsForStates.get(s.state)!;
      }

      const obj: GroupsSessionTableRow = {
        obj: s,
        start_time: s.start_time,
        end_time: s.end_time ?? 'Unspecified',
        state: s.state,
        game_name: s.game_entry_name,
        // type: gameType,
        type: sessionType,
        actions: actions
      }
      return obj;
    });

    // Step 2: Sort models in descending startTime order
    const sorted = mapped.sort((a, b) => {
      const d1 = this.getDateFromTime(a.start_time);
      const d2 = this.getDateFromTime(b.start_time);
      return d2.getTime() - d1.getTime();
    });

    // Step 3: Group models according to yyyy-MM-dd

    let sections: GroupsSessionTableSection[] = [];
    let lastTimeString: string = '';
    let lastSection: GroupsSessionTableSection = { title: '', rows: [] };

    const today = new Date();
    let tomorrow = new Date();
    let yesterday = new Date();

    tomorrow.setDate(today.getDate() + 1);
    yesterday.setDate(today.getDate() - 1);

    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);

    yesterday.setHours(0);
    yesterday.setMinutes(0);
    yesterday.setSeconds(0);

    tomorrow.setHours(23);
    tomorrow.setMinutes(59);
    tomorrow.setSeconds(59);

    for (let item of sorted){
      const timeString = this.getFormattedStartDate(item.start_time, today, yesterday, tomorrow);
      
      if (lastTimeString != timeString && lastTimeString != ''){
        sections.push(lastSection);
        lastSection = { title: '', rows: [] };
      }

      lastSection.title = timeString;
      lastSection.rows.push(item);
      lastTimeString = timeString;
    }

    // : Append any missed items
    if (lastSection.title != ''){
      sections.push(lastSection);
    }

    return sections;
  }

  private getActionsForStates(): Map<number, Actions[]>{
    const actionsForStates: Map<number, Actions[]> = new Map();

    actionsForStates.set(GameSessionState.scheduled, [
      Actions.join,
      Actions.edit,
      Actions.reports,
      // Actions.duplicate,
      // Actions.delete
    ]);

    actionsForStates.set(GameSessionState.live, [
      Actions.join,
      Actions.edit,
      Actions.reports,
      // Actions.duplicate,
      // Actions.stop,
      // Actions.delete,
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
      Actions.edit,
      Actions.reports,
      // Actions.duplicate,
      // Actions.delete,
    ]);

    actionsForStates.set(
      GameSessionState.canceled, 
      actionsForStates.get(GameSessionState.complete)!
    );

    return actionsForStates;
  }

  private getFormattedStartDate(timeStr: string, today: Date, yesterday: Date, tomorrow: Date): string{
    const date = new Date(timeStr);
    
    if (date.getFullYear() == today.getFullYear()){
      if (date.getMonth() == today.getMonth()){
        if (date.getDate() == today.getDate()){
          return 'Today';
        }
      }
    }

    if (yesterday.getTime() < date.getTime() && date.getTime() < today.getTime())
      return 'Yesterday';
      
    else if (tomorrow.getTime() > date.getTime() && date.getTime() > today.getTime())
      return 'Tomorrow';

    const month = (date.getMonth() + 1)!.toString().padStart(2, '0');
    const day = (date.getDate())!.toString().padStart(2, '0');

    return `${date.getFullYear()}-${month}-${day}`;
  }

  private getDateFromTime(timeStr: string): Date{
    return new Date(timeStr);
  }
}