import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { DialogService } from "src/app/services/dialog.service";
import { UserService } from "src/app/services/user.service";

export class GameBaseComponent{
    constructor(
        protected userService: UserService,
        protected location: Location,
        protected apiService: ApiService,
        protected dialogService: DialogService,
        protected activateRoute: ActivatedRoute,
        protected router: Router,
    ){

    }
}