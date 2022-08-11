import { Injectable } from "@angular/core";
import { IEdgeInternals } from "../../../../commons/src/models/play/edgeinternals.interface";

@Injectable({
  providedIn: 'root'
})
export class PlayService{

  public constructore(){}

  /**
   * Set the window properties for the Edge Game library
   */
  public injectWindowEdgeInternals(){
    (window as any).EdgeInternals = this.getEdgeInternalsObject();
  }

  private getEdgeInternalsObject(): IEdgeInternals{
    return {
      _on_updateGuidance: (name, progress) => {
        console.log("Hello Guidance Update from Angular!");
      },
      _on_updateObjective: (name, progress) => {
        console.log("Hello Objective Update from Angular!");
      }
    }
  }
}