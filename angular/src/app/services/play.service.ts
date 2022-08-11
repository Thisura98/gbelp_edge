import { Injectable } from "@angular/core";
import { ProgressfulGameObjective } from "../../../../commons/src/models/game/objectives";
import { ProgressfulGameGuidanceTracker } from "../../../../commons/src/models/game/trackers";
import { IEdgeInternals } from "../../../../commons/src/models/play/edgeinternals.interface";
import { ApiService } from "./api.service";
import { DialogService } from "./dialog.service";
import { UserService } from "./user.service";

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
  public injectWindowEdgeInternals(){
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
      _on_updateGuidance: (name, progress) => {
        console.log("Hello Guidance Update from Angular!");
      },
      _on_updateObjective: (name, progressPoints) => {
        this.updateObjective(name, progressPoints);
      }
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
    objective.progress += progress;

    const objectiveStr = (objective.objective_id ?? 0).toString();
    const progressStr = objective.progress.toString();

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
      console.debug('Server level error updating objectives: ', err);
      this.dialogService.showSnackbar('Error while updating objective (0x1)');
    })
  }
}