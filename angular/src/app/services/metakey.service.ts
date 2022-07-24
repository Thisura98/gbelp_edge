import { Injectable } from "@angular/core";
import * as Bowser from "bowser";

/**
 * Correctly consider Command or Ctrl key
 * depending on the host os
 */
@Injectable({
  providedIn: 'root'
})
export class MetaKeyService {

  private isMacOs = false;

  constructor(){
    let bowser = Bowser.getParser(window.navigator.userAgent, true);
    this.isMacOs = bowser.getOSName(true)?.includes('mac') ?? false;
  }

  /**
   * Return true if event is clicking Command key (on macos),
   * or Ctrl (for all other platforms)
   */
  public isMetaKey(event: Event): boolean{
    if (event != null && event as KeyboardEvent){
      const kbEvent = event as KeyboardEvent;
      return this.isMacOs ? kbEvent.metaKey : kbEvent.ctrlKey;
    }
    return false;
  }

}