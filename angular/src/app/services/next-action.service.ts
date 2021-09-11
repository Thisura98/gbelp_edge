import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NextSignInAction } from "../constants/constants";

@Injectable({
  providedIn: 'root'
})
export class NextActionService{

    constructor(
      private router: Router
    ){

    }

    handleNextAction(action: NextSignInAction, key: string | undefined){
      switch(action){
        case NextSignInAction.joinGroupK:
          const path = `/groups/join/${key!}`;
          const query = {
            autoAdd: true
          };
          this.router.navigate([path], {
            queryParams: query
          });

        break;
        default:
          window.alert(`Error! Unknown next action ${action}`);
        break;
      }
    }
}