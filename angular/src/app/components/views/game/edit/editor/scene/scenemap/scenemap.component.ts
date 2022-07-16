import { Component, ElementRef, EventEmitter, HostListener, Input, NgZone, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { GameListing } from "src/app/models/game/game";
import { SceneObject, SceneObjectFrame, SceneObjectType } from "../../../../../../../../../../commons/src/models/game/levels/scene";
import { GameProjectResource } from "../../../../../../../../../../commons/src/models/game/resources";
import { fabric } from 'fabric';
import { ResourceUrlTransformPipe } from "src/app/pipes/resource-url-transform.pipe";
import { EditorDataService } from "src/app/services/editor.data.service";
import { debounceTime } from "rxjs/operators";

export class SceneMapDataPack{
    constructor(
        public sceneObjects: SceneObject[],
        public selectedLevelIndex: number | undefined
    ){}
}

class Point{
    constructor(
        public x: number,
        public y: number
    ){}
}

/**
 * Tracks variables for viewport transform events on Canvas
 */
class CanvasMovement{
    constructor(
        public isDragging: boolean,
        public lastPosX: number,
        public lastPosY: number
    ){}
}

@Component({
    selector: 'app-scene-map',
    templateUrl: './scenemap.component.html',
    styleUrls: [
        './scenemap.component.css'
    ],
    // Resolve from the parent component's ElementInjector
    // providers: [
    //     {provide: EditorDataService, useClass: EditorDataService}
    // ]
})
export class SceneMapComponent implements OnInit{

    @Input()
    gameListing: GameListing | undefined;

    private selectedSceneObjIndex: number | undefined;
    private canvasMovement = new CanvasMovement(false, 0, 0);
    private canvas: fabric.Canvas | undefined;
    // private canvasObjects: fabric.Object[] = [];
    private sceneObjects: SceneObject[] = [];
    private selectedLevelIndex: number | undefined;

    readonly kIgnoreSelectionEvent = 'scenemap:ignorSelectionEvent';

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

    selectObject(index: number | undefined){
        if (typeof index == 'undefined'){
            this.selectedSceneObjIndex = undefined;
            this.dataService.setSceneObjectSelection(undefined);
        }
        else{
            this.selectedSceneObjIndex = index;
            this.dataService.setSceneObjectSelection(index);
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

    private setupData(){
        // Listen to setting all scene objects
        this.dataService.getSceneMapData().pipe(debounceTime(100)).subscribe(pack => {
            this.sceneObjects = pack.sceneObjects;
            this.selectedLevelIndex = pack.selectedLevelIndex;
            while(this.canvas!._objects.length > 0){
                this.canvas!.remove(this.canvas!._objects[0]);
            }
            // this.canvas?.requestRenderAll();
            this.updateCanvas();
        });

        // Listen to adding invidual scene objects
        this.dataService.onAddSceneObject().subscribe((obj) => {
            this.addImageToCanvas(obj);
        });

        // Listen to selection changes
        this.dataService.getSceneObjectSelection().subscribe((sel) => {
            this.selectedSceneObjIndex = sel;
            this.updateCanvasSelection()
        });
    }

    // MARK: Canvas Methods

    private setupCanvas(){
        const element = this.hostRef.nativeElement! as HTMLElement
        const width = element.clientWidth;
        const height = element.clientHeight
        this.canvas = new fabric.Canvas('scenemap-canvas', {
            backgroundColor: "#FFFFFF",
            selection: true,
            width: width,
            height: height,
        });
        this.addCanvasEvents();
    }

    private updateCanvas(){
        console.log(this.sceneObjects);
        this.sceneObjects.forEach((obj) => {
            if (obj.type == SceneObjectType.sprite){
                this.addImageToCanvas(obj);
            }
            else if (obj.type == SceneObjectType.camera){
                this.addCameraToCanvas(obj);
            }
        });
    }

    private updateCanvasSelection(){
        console.log("SceneMap: updateCanvasSelection");
        if (this.selectedSceneObjIndex == undefined)
            this.canvas?.discardActiveObject();
        else{
            const nextActiveObj = this.canvas!._objects[this.selectedSceneObjIndex!];
            this.canvas?.setActiveObject(nextActiveObj, new Event(this.kIgnoreSelectionEvent));
            this.canvas?.requestRenderAll();
        }
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

            img.borderColor = "#009EFF";
            img.borderScaleFactor = 2;
            img.data = obj._id;

            this.canvas?.add(img);
            this.hookFabricImageEvents(img, obj);
        });
    }

    private addCameraToCanvas(obj: SceneObject){
        const frame = obj.frame;
        const labelHeight = 24;
        const labelFontSize = 13.0;

        const cameraRect = new fabric.Rect({
            width: frame.w,
            height: frame.h,
            fill: undefined,
            stroke: '#B1B1B1',
            strokeDashArray: [3], 
            strokeWidth: 2
        });

        const cameraLabel = new fabric.Text("Camera", {
            left: 30,
            top: -labelHeight + labelFontSize / 2,
            fontSize: labelFontSize,
            fill: "#FFFFFF",
            fontFamily: 'Roboto'
        });

        const cameraLabelBackground = new fabric.Path("M0 18C0 9.51472 0 5.27208 2.63604 2.63604C5.27208 0 9.51472 0 18 0H82.1408C90.6261 0 94.8687 0 97.5047 2.63604C100.141 5.27208 100.141 9.51472 100.141 18V24H0V18Z", {
            left: 0,
            top: -labelHeight,
            fill: "#B1B1B1",
        });

        const cameraIcon = new fabric.Path("M0.0678711 2.93994C0.0678711 1.71592 0.821114 0.899902 1.95098 0.899902H9.48341C10.6133 0.899902 11.3665 1.71592 11.3665 2.93994V3.95995L14.1912 0.899902V11.1001L11.3665 8.04002V9.06004C11.3665 10.2841 10.6133 11.1001 9.48341 11.1001H1.95098C0.821114 11.1001 0.0678711 10.2841 0.0678711 9.06004V2.93994Z", {
            left: 10,
            top: -labelHeight + labelFontSize / 2 + 1.0,
            fill: "#FFFFFF",
        });

        const group = new fabric.Group([cameraRect, cameraLabelBackground, cameraIcon, cameraLabel], {
            left: frame.x,
            top: frame.y,
            lockRotation: true,
        });

        this.canvas?.add(group);
        this.hookFabricCameraEvents(group, cameraRect, obj);
    }

    private hookFabricImageEvents(obj: fabric.Image, sObj: SceneObject){
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

    private hookFabricCameraEvents(group: fabric.Group, cameraRect: fabric.Object, sObj: SceneObject){
        group.on('moved', (e) => {
            const target = e.target!;
            console.log('camera', 'moved!')
            sObj.frame.x = target.left!;
            sObj.frame.y = target.top!;
        });
        group.on('scaled', (e) => {
            const target = e.target!;
            console.log('camera', 'scaled!')

            // Prevent scaling camera rect
            group.width = target.width! * target.scaleX!;
            group.height = target.height! * target.scaleY!;
            group.scaleX = 1;
            group.scaleY = 1;

            sObj.frame.x = target.left!;
            sObj.frame.y = target.top!;
            sObj.frame.w = group.width;
            sObj.frame.h = group.height;
        });
    }

    /**
     * (Ctrl + Left Click) || (Middle Mouse Click   ) to move the canvas
     * todo: zoom
     */
    private addCanvasEvents(){
        // mouse:down (internal fabric version) didn't capture middle mouse click
        this.canvas!.on('mouse:down:before', (opt) => {
            let evt = opt.e;
            console.log("Mouse Down Event Button =", evt.button);
            if ((evt.metaKey === true && evt.button == 0) || evt.button == 1) {
                this.canvasMovement.isDragging = true;
                this.canvasMovement.lastPosX = evt.clientX;
                this.canvasMovement.lastPosY = evt.clientY;
                // disable object selection in canvas
                this.canvas!.selection = false; 
            }
        });
        this.canvas!.on('mouse:move', (opt) => {
            if (!this.canvasMovement.isDragging)
                return;
                
            var e = opt.e;
            var vpt = this.canvas!.viewportTransform!;
            vpt[4] += e.clientX - this.canvasMovement.lastPosX;
            vpt[5] += e.clientY - this.canvasMovement.lastPosY;
            this.canvas!.requestRenderAll();
            this.canvasMovement.lastPosX = e.clientX;
            this.canvasMovement.lastPosY = e.clientY;
        });
        // mouse:up (internal fabric version) didn't capture middle mouse click
        this.canvas!.on('mouse:up:before', (opt) => {
            this.canvas!.setViewportTransform(this.canvas!.viewportTransform!);
            this.canvasMovement!.isDragging = false;
            // enable object selection in canvas
            this.canvas!.selection = true;
        });
        this.canvas!.on('selection:created', (opt) => {
            if (opt.e.type == this.kIgnoreSelectionEvent)
                return;

            const objId = opt.target!.data!;
            const matchedIndex = this.sceneObjects.findIndex((o) => {
                return o._id == objId;
            });
            console.log('selection:created', objId, matchedIndex);
            this.selectObject(matchedIndex);
        });
        this.canvas!.on('selection:updated', (opt) => {
            if (opt.e.type == this.kIgnoreSelectionEvent)
                return;

            const objId = opt.target!.data!;
            const matchedIndex = this.sceneObjects.findIndex((o) => {
                return o._id == objId;
            });
            console.log('selection:updated', objId, matchedIndex, opt.e);
            this.selectObject(matchedIndex);
        });
        this.canvas!.on('selection:cleared', (opt) => {
            if (opt.e.type == this.kIgnoreSelectionEvent)
                return;
                
            console.log('selection:cleared', undefined);
            this.selectObject(undefined);
        });
    }

}