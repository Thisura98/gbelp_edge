import { Component, ElementRef, EventEmitter, HostListener, Input, NgZone, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { GameListing } from "src/app/models/game/game";
import { SceneObject, SceneObjectFrame } from "../../../../../../../../../../commons/src/models/game/levels/scene";
import { GameProjectResource } from "../../../../../../../../../../commons/src/models/game/resources";
import { fabric } from 'fabric';
import { ResourceUrlTransformPipe } from "src/app/pipes/resource-url-transform.pipe";
import { EditorDataService } from "src/app/services/editor.data.service";
import { debounceTime } from "rxjs/operators";

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
    selectedSceneObjIndex: number | undefined;

    @Output()
    selectedSceneObjIndexChange = new EventEmitter<number>();

    private canvas: fabric.Canvas | undefined;
    // private canvasObjects: fabric.Object[] = [];
    private sceneObjects: SceneObject[] = [];

    constructor(
        private zone: NgZone,
        private dataService: EditorDataService,
        private hostRef: ElementRef,
        private resTransformPipe: ResourceUrlTransformPipe,
    ){
        
    }

    ngOnInit(){
        this.setupCanvas();
        this.setupData();
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

    @HostListener('window:resize', ['$event'])
    windowResize(event: Event){
        const element = this.hostRef.nativeElement! as HTMLElement

        this.canvas?.setWidth(element.clientWidth);
        this.canvas?.setHeight(element.clientHeight);
        this.canvas?.calcOffset();
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


    // private logScene(){
    //     for (let obj of this.sceneObjects){
    //         console.log(obj._id, obj.frame)
    //     }
    // }

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

    private setupCanvas(){
        const element = this.hostRef.nativeElement! as HTMLElement
        const width = element.clientWidth;
        const height = element.clientHeight
        this.canvas = new fabric.Canvas('scenemap-canvas', {
            backgroundColor: "#EFEFEF",
            selection: true,
            width: width,
            height: height
        });
    }

    private setupData(){
        this.dataService.getSceneObjects().pipe(debounceTime(100)).subscribe(sceneObjects => {
            this.sceneObjects = sceneObjects;
            while(this.canvas!._objects.length > 0){
                this.canvas!.remove(this.canvas!._objects[0]);
            }
            // this.canvas?.requestRenderAll();
            this.updateCanvas();
        });

        this.dataService.onAddSceneObject().subscribe((obj) => {
            this.addImageToCanvas(obj);
        });
    }

    private updateCanvas(){
        console.log(this.sceneObjects);
        this.sceneObjects.forEach((obj) => {
            this.addImageToCanvas(obj);
        });
    }

    private addImageToCanvas(obj: SceneObject){
        const fileName = this.getResource(obj.spriteResourceId)?.filename;
        if (fileName == undefined)
            return;
        const url = this.resTransformPipe.transform(fileName);
        console.log('updatingCanvas with', url);

        fabric.Image.fromURL(url, (img) => {
            img.left = obj.frame.x;
            img.top = obj.frame.y;

            const scaleX = obj.frame.w / img.getOriginalSize().width;
            const scaleY = obj.frame.h / img.getOriginalSize().height;
            img.scaleX = scaleX;
            img.scaleY = scaleY;

            img.angle = obj.rotation;

            this.canvas?.add(img);
            this.hookFabricObjectEvents(img, obj);
        });
    }

    private hookFabricObjectEvents(obj: fabric.Image, sObj: SceneObject){
        obj.on('moved', (e) => {
            console.log(sObj.name, 'moved!')
            sObj.frame.x = e.target!.left!;
            sObj.frame.y = e.target!.top!;
        });
        obj.on('scaled', (e) => {
            console.log(sObj.name, 'scaled!')
            sObj.frame.x = e.target!.left!;
            sObj.frame.y = e.target!.top!;
            sObj.frame.w = obj.getOriginalSize()!.width * obj.scaleX!;
            sObj.frame.h = obj.getOriginalSize()!.height * obj.scaleY!;
        });
        obj.on('rotated', (e) => {
            console.log(sObj.name, 'rotated!', e.target!.angle)
            sObj.frame.x = e.target!.left!;
            sObj.frame.y = e.target!.top!;
            sObj.rotation = e.target!.angle ?? 0.0;

        });
    }

}