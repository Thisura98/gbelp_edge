import { Component, EventEmitter, HostListener, Input, NgZone, OnInit, Output } from "@angular/core";
import { GameListing } from "src/app/models/game/game";
import { SceneObject } from "../../../../../../../../../../commons/src/models/game/levels/scene";
import { GameProjectResource } from "../../../../../../../../../../commons/src/models/game/resources";

class Point{
    constructor(
        public x: number,
        public y: number
    ){}
}

@Component({
    selector: 'app-scene-map',
    templateUrl: './scenemap.component.html',
    styleUrls: [
        './scenemap.component.css'
    ]
})
export class SceneMapComponent implements OnInit{

    @Input()
    gameListing: GameListing | undefined;

    @Input()
    sceneObjects: SceneObject[] = [];

    @Input()
    selectedSceneObjIndex: number | undefined;

    @Output()
    selectedSceneObjIndexChange = new EventEmitter<number>();

    private currentDraggingObj: SceneObject | undefined;
    private currentDraggingObjIndex: number | undefined;
    private currentDraggingOffset: Point | undefined

    constructor(
        private zone: NgZone
    ){
        
    }

    ngOnInit(){
        // addEventListener('mousedown', (e) => {
        //     this.childMouseDown(e);
        // });
    }

    /**
     * Gets the project resource from a resource id.
     * @param resId Resource ID
     */
    getResource(resId: string | null | undefined): GameProjectResource | undefined{
        if (typeof resId == 'undefined' || resId == null)
            return undefined;
        if (this.gameListing == undefined)
            return undefined;

        const resources = this.gameListing.project.resources;
        for (let res of resources){
            if (res._id == resId)
                return res;
        }
        return undefined;
    }

    getSelectedObject(): SceneObject | undefined{
        if (this.selectedSceneObjIndex == undefined)
            return undefined;

        return this.sceneObjects[this.selectedSceneObjIndex!];
    }

    selectObject(obj: SceneObject){
        const index = this.getIndexOfObject(obj);
        this.selectedSceneObjIndex = index;
        this.selectedSceneObjIndexChange.emit(index);
    }

    /* Child move handling */

    @HostListener('mousedown', ['$event'])
    childMouseDown(event: Event){
        const mouseEvent = event as MouseEvent;
        const element = event.target as HTMLElement;
        const elementRect = (element).getBoundingClientRect()
        console.log('Mouse Down', mouseEvent.clientX, mouseEvent.clientY, event.target);
    }

    @HostListener('mousemove', ['$event'])
    childMouseMoveText(event: Event){
        // event.preventDefault();
        if (this.sceneObjects.length < 1)
            return;
        this.zone.run(() => {
            const mouseEvent = event as MouseEvent;
            this.sceneObjects[0].frame.x = mouseEvent.clientX;
        });
    }

    // childMouseDown(event: Event, obj: SceneObject){
    //     // console.log("Mouse down Test fired!", Date.now());
    //     this.currentDraggingObjIndex = this.getIndexOfObject(obj);
    //     this.currentDraggingObj = obj;

    //     const mouseEvent = event as MouseEvent;
    //     const elementRect = (event.target as HTMLElement).getBoundingClientRect()
    //     console.log('Mouse Down', mouseEvent.clientX, mouseEvent.clientY);

    //     this.currentDraggingOffset = new Point(
    //         elementRect.x,
    //         elementRect.y,
    //     );
    // }

    childMouseMove(event: Event, obj: SceneObject){
        if (this.currentDraggingObjIndex == undefined)
            return;
        this.logScene();
        
        const mouseEvent = event as MouseEvent;

        if (mouseEvent.buttons != 1){
            // Cancel the mouse event if Left Mouse button is not pressed.
            this.childMouseUp(event, obj);
            return;
        }

        const newAbsoluteX = mouseEvent.clientX - this.currentDraggingOffset!.x;
        const newAbsoluteY = mouseEvent.clientY - this.currentDraggingOffset!.y;

        obj.frame.x = newAbsoluteX;
        obj.frame.y = newAbsoluteY;

        // this.getSelectedObject()!.frame.x = newAbsoluteX;
        // this.getSelectedObject()!.frame.y = newAbsoluteY;

        console.log("Moving Mouse", newAbsoluteX, newAbsoluteY, mouseEvent.buttons, obj.frame.x, obj.frame.y);

    }

    childMouseUp(event: Event, obj: SceneObject){
        this.currentDraggingObjIndex = undefined;
        this.currentDraggingObj = undefined;

        console.log("Mouse Up!");
    }


    /* private methods */

    /**
     * Returns the index of this object in the sceneObjects array
     * @param obj An object inthe scenemap
     */
    private getIndexOfObject(obj: SceneObject): number{
        return this.sceneObjects.findIndex((v) => {
            v._id == obj._id
        });
    }


    private logScene(){
        for (let obj of this.sceneObjects){
            console.log(obj._id, obj.frame)
        }
    }

}