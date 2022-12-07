import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, NgZone, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { SceneObject, SceneObjectFrame, SceneObjectType } from "../../../../../../../../../../commons/src/models/game/levels/scene";
import { GameProjectResource } from "../../../../../../../../../../commons/src/models/game/resources";
import { fabric } from 'fabric';
import { ResourceUrlTransformPipe } from "src/app/pipes/resource-url-transform.pipe";
import { EditorDataService, ReorderPack } from "src/app/services/editor.data.service";
import { debounceTime, takeUntil } from "rxjs/operators";
import { CameraBoundingBox } from "./cameragroup.scenemap";
import { GameListing } from "../../../../../../../../../../commons/src/models/game/game";
import { Subject } from "rxjs";

export class SceneMapDataPack{
    constructor(
        public sceneObjects: SceneObject[],
        public selectedLevelIndex: number | undefined
    ){}
}

export class SceneObjectDataPack{
    constructor(
        public object: SceneObject,
        public active: boolean
    ){}
}

class CameraBoxElements{
    constructor(
        public group: fabric.Group,
        public staticElements: fabric.Group,
        public cameraRect: fabric.Rect,
        public cameraObject: SceneObject
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
export class SceneMapComponent implements OnInit, AfterViewInit, OnDestroy{

    @Input()
    gameListing: GameListing | undefined;

    // private selectedSceneObjIndex: number | undefined;
    private selectedObjectId: string | undefined;

    private canvasMovement = new CanvasMovement(false, 0, 0);
    private canvas: fabric.Canvas | undefined;
    private cameraBoxElements: CameraBoxElements | undefined;
    // private canvasObjects: fabric.Object[] = [];
    private sceneObjects: SceneObject[] = [];
    private selectedLevelIndex: number | undefined;
    private notifier$ = new Subject();

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

    ngAfterViewInit(): void {
        // Refresh canvas size 
        // after dyn-anim-fadein-delayed CSS animation.
        setTimeout(() => {
            this.updateCanvasSize();
        }, 400);
    }

    ngOnDestroy(): void {
        console.log('On Destroy called for scenemap!');

        this.notifier$.next();
        this.notifier$.complete();

        this.canvas?.on('after:render', () => {
            this.canvas?.dispose();
        })
        // TODO
        /**
         * We are currently using FabricJS 4.6.0 (August 28, 2021)
         * 
         * This issue was fixed by PR: https://github.com/fabricjs/fabric.js/pull/7885#event-6451082330
         * on April 19, 2022.
         * 
         * So we should probably update to a release after that.
         * 
         * 
         */
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
        // if (this.selectedSceneObjIndex == undefined)
        //     return undefined;

        // return this.sceneObjects[this.selectedSceneObjIndex!];

        return this.getSceneObjectWithId(this.selectedObjectId);
    }

    selectObject(objectId: string | undefined){
        if (typeof objectId == 'undefined'){
            this.selectedObjectId = undefined;
            this.dataService.setSceneObjectSelection(undefined);
        }
        else{
            this.selectedObjectId = objectId;
            this.dataService.setSceneObjectSelection(objectId);
        }
    }

    @HostListener('window:resize', ['$event'])
    windowResize(event: Event){
        this.updateCanvasSize();
    }

    /* private methods */

    private updateCanvasSize(){
        const element = this.hostRef.nativeElement! as HTMLElement

        this.canvas?.setWidth(element.clientWidth);
        this.canvas?.setHeight(element.clientHeight);
        this.canvas?.calcOffset();
    }

    /**
     * Returns the index of this object in the sceneObjects array
     * @param obj An object inthe scenemap
     */
    // private getIndexOfObject(obj: SceneObject): number{
    //     return this.sceneObjects.findIndex((v) => {
    //         return v._id == obj._id
    //     });
    // }


    // private logScene(){
    //     for (let obj of this.sceneObjects){
    //         console.log(obj._id, obj.frame)
    //     }
    // }

    /**
     * Returns true if (x,y) is inside frame
     * @returns boolean
     */
    // private checkFrameContains(frame: SceneObjectFrame, x: number, y: number): boolean{
    //     const c1 = frame.x <= x && frame.y <= y;
    //     const c2 = (frame.x + frame.w) >= x;
    //     const c3 = (frame.y + frame.h) >= y;

    //     return c1 && c2 && c3;
    // }

    /**
     * Returns the DOM rect for the scene map
     * @returns DOMRect
     */
    // private getSceneMapDOMRect(): DOMRect{
    //     const host = this.hostRef.nativeElement as HTMLElement;
    //     return host.getBoundingClientRect()
    // }

    /**
     * Return DOMRect only containing the widht and height
     * and origin is (0,0)
     */
    // private moveRectToOrigin(rect: DOMRect): DOMRect{
    //     return new DOMRect(
    //         0, 0,
    //         rect.width, rect.height
    //     );
    // }

    /**
     * Get objects from the Fabric Canvas
     */
    private getCanvasObjectWithId(objectId: string | null | undefined): fabric.Object | undefined{
        if (objectId == undefined || objectId == null){
            return undefined;
        }
        return this.canvas?._objects.find((obj) => obj.data! == objectId);
    }

    /**
     * Get objects from the SceneObjects Array
     */
    private getSceneObjectWithId(objectId: string | null | undefined): SceneObject | undefined{
        if (objectId == undefined || objectId == null){
            return undefined;
        }
        return this.sceneObjects.find(obj => obj._id == objectId);
    }

    private setupData(){
        // Listen to setting all scene objects
        this.dataService.getSceneMapData()
        .pipe(takeUntil(this.notifier$))
        .pipe(debounceTime(100))
        .subscribe(pack => {
            this.sceneObjects = pack.sceneObjects;
            this.selectedLevelIndex = pack.selectedLevelIndex;
            while(this.canvas!._objects.length > 0){
                this.canvas!.remove(this.canvas!._objects[0]);
            }
            // this.canvas?.requestRenderAll();
            this.updateCanvasFromSceneObjects();
        });

        // Listen to adding invidual scene objects
        this.dataService.onAddSceneObject()
        .pipe(takeUntil(this.notifier$))
        .subscribe((obj) => {
            this.addImageToCanvas(obj);
        });

        // Listen to selection changes
        this.dataService.getSceneObjectSelection()
        .pipe(takeUntil(this.notifier$))
        .subscribe((sel) => {
            this.selectedObjectId = sel;
            this.updateCanvasSelection()
        });

        // Listen to object state (active state, frame changes, etc.)
        this.dataService.getSceneObjectState()
        .pipe(takeUntil(this.notifier$))
        .subscribe((obj) => {
            this.handleObjectState(obj);
        });

        // Listen to re-order
        this.dataService.getReorder()
        .pipe(takeUntil(this.notifier$))
        .subscribe(pack => {
            if (pack == undefined){
                return;
            }
            this.handleReorder(pack);
        })
    }

    // MARK: Canvas Methods

    private setupCanvas(){
        const element = this.hostRef.nativeElement! as HTMLElement
        const width = element.clientWidth;
        const height = element.clientHeight
        console.log('Recreating canvas!');
        this.canvas = new fabric.Canvas('scenemap-canvas', {
            backgroundColor: "#FFFFFF",
            selection: true,
            width: width,
            height: height,
        });
        this.addCanvasEvents();
    }

    private updateCanvasFromSceneObjects(){
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
        const ignoreEvent = new Event(this.kIgnoreSelectionEvent);
        if (this.selectedObjectId == undefined)
            this.canvas?.discardActiveObject(ignoreEvent);
        else{
            // const nextActiveObj = this.canvas!._objects[this.selectedSceneObjIndex!];
            const nextActiveObj = this.getCanvasObjectWithId(this.selectedObjectId)!;
            this.canvas?.setActiveObject(nextActiveObj, ignoreEvent);
        }
        this.canvas?.requestRenderAll();
    }

    /**
     * 
     * @param obj The Scene Object
     * @param image fabric.Object cast as an fabric.Image
     */
    private setFabricTransformFrameFrom(obj: SceneObject, image: fabric.Image){
        image.left = obj.frame.x;
        image.top = obj.frame.y;

        const scaleX = obj.frame.w / image.getOriginalSize().width;
        const scaleY = obj.frame.h / image.getOriginalSize().height;
        image.scaleX = scaleX;
        image.scaleY = scaleY;

        image.angle = obj.rotation;
    }

    private addImageToCanvas(obj: SceneObject){
        const fileName = this.getResource(obj.spriteResourceId)?.filename;
        if (fileName == undefined)
            return;
        const url = this.resTransformPipe.transform(fileName);
        console.log('updatingCanvas with', url);

        fabric.Image.fromURL(url, (img) => {
            this.setFabricTransformFrameFrom(obj, img);

            img.borderColor = "#009EFF";
            img.borderScaleFactor = 2;
            img.data = obj._id;                 // IMPORTANT! Object ID.

            this.canvas?.add(img);
            this.hookFabricImageEvents(img, obj);
        });
    }

    private addCameraToCanvas(obj: SceneObject){
        const frame = obj.frame;
        const labelHeight = 24;
        const labelFontSize = 13.0;
        const roundedRectSvgPath = "M0 18C0 9.51472 0 5.27208 2.63604 2.63604C5.27208 0 9.51472 0 18 0H82.1408C90.6261 0 94.8687 0 97.5047 2.63604C100.141 5.27208 100.141 9.51472 100.141 18V24H0V18Z";
        const cameraSvgPath = "M0.0678711 2.93994C0.0678711 1.71592 0.821114 0.899902 1.95098 0.899902H9.48341C10.6133 0.899902 11.3665 1.71592 11.3665 2.93994V3.95995L14.1912 0.899902V11.1001L11.3665 8.04002V9.06004C11.3665 10.2841 10.6133 11.1001 9.48341 11.1001H1.95098C0.821114 11.1001 0.0678711 10.2841 0.0678711 9.06004V2.93994Z";

        const cameraRect = new fabric.Rect({
            width: frame.w,
            height: frame.h,
            fill: undefined,
            stroke: '#B1B1B1',
            strokeDashArray: [3], 
            strokeWidth: 2,
        });

        const cameraLabel = new fabric.Text("Camera", {
            left: 30,
            top: -labelHeight + labelFontSize / 2,
            fontSize: labelFontSize,
            fill: "#FFFFFF",
            fontFamily: 'Roboto'
        });

        const cameraLabelBackground = new fabric.Path(roundedRectSvgPath, {
            left: 0,
            top: -labelHeight,
            fill: "#B1B1B1",
        });

        const cameraIcon = new fabric.Path(cameraSvgPath, {
            left: 10,
            top: -labelHeight + labelFontSize / 2 + 1.0,
            fill: "#FFFFFF",
        });

        const staticElements = new fabric.Group([cameraLabelBackground, cameraIcon, cameraLabel], {});

        const group = new CameraBoundingBox([cameraRect, staticElements], {
            left: frame.x,
            top: frame.y,
            lockRotation: true,
            data: obj._id!                 // IMPORTANT! Object ID.
        });

        this.canvas?.add(group);
        this.cameraBoxElements = new CameraBoxElements(group, staticElements, cameraRect, obj);
        this.hookFabricCameraEvents(group, cameraRect, staticElements, obj);
    }

    private hookFabricImageEvents(obj: fabric.Image, sObj: SceneObject){
        obj.on('moved', (e) => {
            console.log(sObj.name, 'moved!')
            sObj.frame.x = e.target!.left!;
            sObj.frame.y = e.target!.top!;
            this.dataService.setHasUnsavedChanges(true);
        });
        obj.on('scaled', (e) => {
            console.log(sObj.name, 'scaled!')
            sObj.frame.x = e.target!.left!;
            sObj.frame.y = e.target!.top!;
            sObj.frame.w = obj.getOriginalSize()!.width * obj.scaleX!;
            sObj.frame.h = obj.getOriginalSize()!.height * obj.scaleY!;
            this.dataService.setHasUnsavedChanges(true);
        });
        obj.on('rotated', (e) => {
            console.log(sObj.name, 'rotated!', e.target!.angle)
            sObj.frame.x = e.target!.left!;
            sObj.frame.y = e.target!.top!;
            sObj.rotation = e.target!.angle ?? 0.0;
            this.dataService.setHasUnsavedChanges(true);
        });
    }

    private hookFabricCameraEvents(group: fabric.Group, cameraRect: fabric.Object, staticElements: fabric.Group, sObj: SceneObject){
        group.on('moved', (e) => {
            const target = e.target!;
            console.log('camera', 'moved!')
            sObj.frame.x = target.left!;
            sObj.frame.y = target.top!;
            this.dataService.setHasUnsavedChanges(true);
        });
        group.on('scaled', (e) => {
            const target = e.target!;
            console.log('camera', 'scaled!')

            this.dataService.setHasUnsavedChanges(true);
            this.handleCameraTransform(
                target.left!,
                target.top!,
                target.width! * target.scaleX!,
                target.height! * target.scaleY!
            );
        });
    }

    private handleCameraTransform(left: number, top: number, width: number, height: number, updateSceneObject: boolean = true){
        let box = this.cameraBoxElements!;

        // Prevent scaling group
        box.group.width = width;
        box.group.height = height;
        box.group.scaleX = 1;
        box.group.scaleY = 1;

        // Reposition 'Camera' label
        box.staticElements.left = -box.group.width! / 2;
        box.staticElements.top = -box.group.height! / 2;

        // Reposition camera box
        box.cameraRect.left = box.staticElements.left;
        box.cameraRect.top = box.staticElements.top! + box.staticElements.height!;
        box.cameraRect.width = box.group.width;
        box.cameraRect.height = box.group.height - box.staticElements.height!;

        if (updateSceneObject){
            // Update SceneObject
            box.cameraObject.frame.x = left;
            box.cameraObject.frame.y = top;
            box.cameraObject.frame.w = box.group.width;
            box.cameraObject.frame.h = box.group.height;
        }
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
            console.log('selection:created', objId);
            this.selectObject(objId);
        });
        this.canvas!.on('selection:updated', (opt) => {
            if (opt.e.type == this.kIgnoreSelectionEvent)
                return;

            const objId = opt.target!.data!;
            console.log('selection:updated', objId, opt.e);
            this.selectObject(objId);
        });
        this.canvas!.on('selection:cleared', (opt) => {
            if (opt.e != undefined && opt.e.type == this.kIgnoreSelectionEvent)
                return;
                
            console.log('selection:cleared', undefined);
            this.selectObject(undefined);
        });
    }

    private handleObjectState(pack: SceneObjectDataPack){
        const objectId = pack.object._id;
        // const object = this.canvas?._objects.find((obj) => obj.data! == objectId);
        const object = this.getCanvasObjectWithId(objectId);
        if (object == undefined){
            console.log("Could not change active state of object", JSON.stringify(pack.object));
            return;
        }

        console.log("Handle Object state called", JSON.stringify(pack.object));
        const image = object as fabric.Image;
        if (pack.object.type == SceneObjectType.sprite){
            this.setFabricTransformFrameFrom(pack.object, image);
        }
        else if(pack.object.type == SceneObjectType.camera){
            this.handleCameraTransform(
                pack.object.frame.x, 
                pack.object.frame.y, 
                pack.object.frame.w, 
                pack.object.frame.h,
                false 
            );
        }

        if (!pack.active){
            this.canvas?.discardActiveObject(new Event(this.kIgnoreSelectionEvent));
        }

        this.dataService.setHasUnsavedChanges(true);
        this.canvas?.requestRenderAll();
    }

    private handleReorder(pack: ReorderPack){
        const objectId = pack.object._id;
        // const object = this.canvas?._objects.find((obj) => obj.data! == objectId);
        const object = this.getCanvasObjectWithId(objectId);

        if (object){
            if (pack.toFront){
                object.bringForward();
            }
            else{
                object.sendBackwards();
            }
        }
    }

}