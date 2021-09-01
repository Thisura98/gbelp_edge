import { Component, ElementRef, EventEmitter, HostListener, Input, NgZone, OnInit, Output } from "@angular/core";
import { GameListing } from "src/app/models/game/game";
import { SceneObject, SceneObjectFrame } from "../../../../../../../../../../commons/src/models/game/levels/scene";
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

    constructor(
        private zone: NgZone,
        private hostRef: ElementRef
    ){
        
    }

    ngOnInit(){
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

    selectObject(obj: SceneObject | undefined){
        if (typeof obj == 'undefined'){
            this.selectedSceneObjIndex = undefined;
            this.selectedSceneObjIndexChange.emit(undefined);    
        }
        else{
            const index = this.getIndexOfObject(obj);
            this.selectedSceneObjIndex = index;
            this.selectedSceneObjIndexChange.emit(index);
        }
    }

    /* Child move handling */

    @HostListener('mousedown', ['$event'])
    childMouseDown(event: Event){
        const mouseEvent = event as MouseEvent;
        const hostRect = this.getSceneMapDOMRect();
        const relativeX = mouseEvent.x - hostRect.x;
        const relativeY = mouseEvent.y - hostRect.y;
        const clickedObjIndex = this.sceneObjects.findIndex((obj) => {
            return this.checkFrameContains(obj.frame, relativeX, relativeY);
        })

        if (clickedObjIndex == -1){
            this.selectObject(undefined);
            return;
        }

        this.selectObject(this.sceneObjects[clickedObjIndex]);
        this.currentDraggingObj = this.sceneObjects[clickedObjIndex];
        this.currentDraggingObjIndex = clickedObjIndex;
        
    }

    @HostListener('mousemove', ['$event'])
    childMouseMoveText(event: Event){
        const mouseEvent = event as MouseEvent;

        if (this.currentDraggingObjIndex == undefined)
            return;

        if (mouseEvent.buttons != 1){
            this.childMouseUp(event);
            return;
        }

        const hostRect = this.moveRectToOrigin(this.getSceneMapDOMRect());

        // Is Scene Object outside top left edge?
        const newX = this.currentDraggingObj!.frame.x + mouseEvent.movementX;
        const newY = this.currentDraggingObj!.frame.y + mouseEvent.movementY;
        if (hostRect.left > newX || hostRect.top > newY)
            return;
        
        // Is Scene Object outside bottom right edge?
        const newMaxX = newX + this.currentDraggingObj!.frame.w;
        const newMaxY = newY + this.currentDraggingObj!.frame.h;
        if (hostRect.right < newMaxX || hostRect.bottom < newMaxY)
            return;
        
        // Zone is important. Otherwise property change is not reflected.
        this.zone.run(() => {
            this.currentDraggingObj!.frame.x += mouseEvent.movementX;
            this.currentDraggingObj!.frame.y += mouseEvent.movementY;
        });
    }

    @HostListener('mouseup', ['$event'])
    childMouseUp(event: Event){
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
            return v._id == obj._id
        });
    }


    private logScene(){
        for (let obj of this.sceneObjects){
            console.log(obj._id, obj.frame)
        }
    }

    /**
     * Returns true if (x,y) is inside frame
     * @returns boolean
     */
    private checkFrameContains(frame: SceneObjectFrame, x: number, y: number): boolean{
        const c1 = frame.x <= x && frame.y <= y;
        const c2 = (frame.x + frame.w) >= x;
        const c3 = (frame.y + frame.h) >= y;

        return c1 && c2 && c3;
    }

    /**
     * Returns the DOM rect for the scene map
     * @returns DOMRect
     */
    private getSceneMapDOMRect(): DOMRect{
        const host = this.hostRef.nativeElement as HTMLElement;
        return host.getBoundingClientRect()
    }

    /**
     * Return DOMRect only containing the widht and height
     * and origin is (0,0)
     */
    private moveRectToOrigin(rect: DOMRect): DOMRect{
        return new DOMRect(
            0, 0,
            rect.width, rect.height
        );
    }

}