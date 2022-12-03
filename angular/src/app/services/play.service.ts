import { ChangeDetectorRef, Injectable } from "@angular/core";
import { ProgressfulGameObjective } from "../../../../commons/src/models/game/objectives";
import { ProgressfulGameGuidanceTracker } from "../../../../commons/src/models/game/trackers";
import { IEdgeInternals } from "../../../../commons/src/models/play/edgeinternals.interface";
import { ApiService } from "./api.service";
import { DialogService } from "./dialog.service";
import { UserService } from "./user.service";

export type PlayChangeListener = () => void;
export type PlayGameCompletedListener = (message: string, data: object | null | undefined) => void;

@Injectable({
  providedIn: 'root'
})
export class PlayService{

  /**
   * Cache of objective names, and their IDs
   */
  private objectiveCache: { [key: string] : ProgressfulGameObjective } = {};

  /**
   * Cache of guidance names and their IDs
   */
  private guidanceCache: { [key: string] : ProgressfulGameGuidanceTracker } = {};

  private sessionId: string = '';
  private nonce: string = '';
  private userId: string = '';
  private changeListener: PlayChangeListener | undefined;
  private onGameCompleted: PlayGameCompletedListener | undefined;

  public constructor(
    private apiService: ApiService,
    private dialogService: DialogService,
    private userService: UserService,
  ){
    this.userId = this.userService.getUserAndToken().user.userId ?? '';
  }

  /**
   * Set the window properties for the Edge Game library
   */
  public injectWindowEdgeInternals(changeListener: PlayChangeListener, onGameCompleted: PlayGameCompletedListener){
    this.changeListener = changeListener;
    this.onGameCompleted = onGameCompleted;
    (window as any).EdgeInternals = this.getEdgeInternalsObject();
  }

  /**
   * Internally builds a map of the tracker name and it's ids
   * for easy lookup.
   */
  public buildCache(objectives: ProgressfulGameObjective[], guidance: ProgressfulGameGuidanceTracker[]){
    objectives.forEach(o => this.objectiveCache[o.name] = o);
    guidance.forEach(g => this.guidanceCache[g.name] = g);
  }

  public setNonceAndSession(nonce: string, sessionId: string){
    this.nonce = nonce;
    this.sessionId = sessionId;
  }

  private getEdgeInternalsObject(): IEdgeInternals{
    return {
      _on_updateGuidance: (name, hitPoints) => this.updateGuidanceTracker(name, hitPoints),
      _on_updateObjective: (name, progressPoints) => this.updateObjective(name, progressPoints),
      _on_gameCompleted: (message, data) => this.notifiedGameCompleted(message, data)
    }
  }

  /**
   * Set progress for an objective from its name
   * @param objectiveName The 'name' of the objective (not ID)
   * @param progress Points to add (or subtract) from an objective
   */
  private updateObjective(objectiveName: string, progress: number){
    if (Object.keys(this.objectiveCache).length == 0){
      this.dialogService.showSnackbar("Objective cache not built");
      return;
    }

    const objective = this.objectiveCache[objectiveName];
    if (objective == undefined){
      this.dialogService.showSnackbar(`Objective for, '${objectiveName}' not found`)
      return;
    }

    // Modify progress points
    // todo: Update Play Service as well?
    objective.progress += progress;

    const objectiveStr = (objective.objective_id ?? 0).toString();
    const progressStr = objective.progress.toString();
    
    this.changeListener!();
    this.apiService.play.updateObjective(
      this.nonce,
      this.sessionId,
      objectiveStr,
      progressStr,
    ).subscribe(res => {
      if (res.success){
        console.debug('Objective updated successfully');
      }
      else{
        console.debug('Error updating objective: ', res.description);
        this.dialogService.showSnackbar('Error while updating objective (0x2)');
      }
    }, (err) => {
      console.debug('Server level error updating objective: ', err);
      this.dialogService.showSnackbar('Error while updating objective (0x1)');
    })
  }


  /**
   * Set progress for a guidance tracker from its name
   * @param trackerName The 'name' of the Guidance Tracker (not ID)
   * @param hits Hit points to add (or subtract) from a guidance tracker
   */
  private updateGuidanceTracker(trackerName: string, hits: number){
    if (Object.keys(this.guidanceCache).length == 0){
      this.dialogService.showSnackbar("Guidance cache not built");
      return;
    }

    const guidanceTracker = this.guidanceCache[trackerName];
    if (guidanceTracker == undefined){
      this.dialogService.showSnackbar(`Guidance Tracker for, '${trackerName}' not found`)
      return;
    }

    // Modify progress points
    // todo: Update Play Service as well?
    guidanceTracker.hits += hits;

    const trackerIdStr = (guidanceTracker.tracker_id ?? 0).toString();
    const progressStr = guidanceTracker.hits.toString();

    this.changeListener!();
    this.apiService.play.updateGuidance(
      this.nonce,
      this.sessionId,
      trackerIdStr,
      progressStr,
    ).subscribe(res => {
      if (res.success){
        console.debug('Guidance tracker updated successfully');
      }
      else{
        console.debug('Error updating guidance tracker: ', res.description);
        this.dialogService.showSnackbar('Error while updating guidance tracker (0x2)');
      }
    }, (err) => {
      console.debug('Server level error updating guidance tracker: ', err);
      this.dialogService.showSnackbar('Error while updating guidance tracker (0x1)');
    })
  }

  /**
   * Handle when game is completed by user
   * @param message Message to display
   * @param data Optional Data passed from game
   */
  private notifiedGameCompleted(message: string, data: object | null | undefined){
    this.onGameCompleted!(message, data);
  }
}