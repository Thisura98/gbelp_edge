import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { SceneObject } from "../../../../../../../../../../commons/src/models/game/levels/scene";

@Component({
  selector: 'scene-transform-box',
  templateUrl: './transformbox.component.html'
})
export class SceneObjectTransformBoxComponent {

  @Input('object')
  public sceneObject: SceneObject | undefined;

  @Output('changed')
  public objectChanged = new EventEmitter<SceneObject>();

  @ViewChild('w')
  width!: ElementRef<HTMLInputElement>;

  @ViewChild('h')
  height!: ElementRef<HTMLInputElement>;

  @ViewChild('rotation')
  rotation!: ElementRef<HTMLInputElement>;

  @ViewChild('x')
  left!: ElementRef<HTMLInputElement>;

  @ViewChild('y')
  top!: ElementRef<HTMLInputElement>;

  public triggerChange() {
    let changeRequired = false;

    if (this.sceneObject!.frame.x != this.left.nativeElement.valueAsNumber) {
      changeRequired = true;
      this.sceneObject!.frame.x = this.left.nativeElement.valueAsNumber;
    }

    if (this.sceneObject!.frame.y != this.top.nativeElement.valueAsNumber) {
      changeRequired = true;
      this.sceneObject!.frame.y = this.top.nativeElement.valueAsNumber;
    }

    if (this.sceneObject!.frame.w != this.width.nativeElement.valueAsNumber) {
      changeRequired = true;
      this.sceneObject!.frame.w = this.width.nativeElement.valueAsNumber
    }

    if (this.sceneObject!.frame.h != this.height.nativeElement.valueAsNumber) {
      changeRequired = true;
      this.sceneObject!.frame.h = this.height.nativeElement.valueAsNumber;
    }

    if (this.sceneObject!.rotation != this.rotation.nativeElement.valueAsNumber) {
      changeRequired = true;
      this.sceneObject!.rotation = this.rotation.nativeElement.valueAsNumber;
    }

    if (changeRequired){
      console.log("Emiting object change event...");
      this.objectChanged.next(this.sceneObject);
    }
    else{
      console.log("Not emiting change event because values haven't changed");
    }
  }
}