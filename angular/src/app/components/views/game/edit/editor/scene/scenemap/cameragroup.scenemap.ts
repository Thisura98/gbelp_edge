import { fabric } from 'fabric';
import { Group, Point } from "fabric/fabric-impl";

/**
 * Subclass of fabric.Group to allow only 
 * selection at the camera label and boundbox edges
 */
export class CameraBoundingBox extends fabric.Group {

  private cachedCameraGroup: fabric.Group | undefined;
  private cachedRect: fabric.Rect | undefined;
  private readonly strokeMagnitude: number = 5.0;

  containsPoint(point: Point, lines?: any, absolute?: boolean, calculate?: boolean) {

    if (!this.selectable)
      return false;

    if (this._objects.length > 0 && (this.cachedCameraGroup == undefined || this.cachedRect == undefined)) {

      if (this._objects.length != 2) {
        console.log("Camera Bounding Box contains too many children. Did something change, it should only have two elements?");
        return false;
      }

      if (this._objects[0].type == 'group') {
        this.cachedCameraGroup = this._objects[0] as fabric.Group;
        this.cachedRect = this._objects[1] as fabric.Rect;
      }
      else if (this._objects[1].type == 'group') {
        this.cachedCameraGroup = this._objects[1] as fabric.Group;
        this.cachedRect = this._objects[0] as fabric.Rect;
      }
      else {
        console.log("Something is wrong. Could not find camera label group.");
      }
    }

    const strokeWidth = this.cachedRect!.strokeWidth! * this.strokeMagnitude;
    const leftEdge = this.left!;
    const rightEdge = this.left! + this.cachedRect!.width!;
    const topEdge = this.top! + this.cachedCameraGroup!.height!;
    const bottomEdge = this.top! + this.cachedCameraGroup!.height! + this.cachedRect!.height!;

    // left of left edge | right of right edge
    if (point.x < leftEdge - strokeWidth || point.x > rightEdge + strokeWidth)
      return false

    // above top edge
    if (point.y < topEdge){

      // inside camera label group
      if (point.y > this.top! && point.x < (this.left! + this.cachedCameraGroup!.width!))
        return true;

      if (point.y < topEdge - strokeWidth)
        return false;
    }

    // below bottom edge
    if (point.y > bottomEdge + strokeWidth)
      return false

    // inside left or right edge
    if (point.y > topEdge && point.y < bottomEdge){
      if (point.x > leftEdge - strokeWidth && point.x < leftEdge + strokeWidth)
        return true;

      if (point.x > rightEdge - strokeWidth && point.x < rightEdge + strokeWidth)
        return true;
    }

    // inside top or bottom edge
    if (point.x > leftEdge && point.x < rightEdge){
      if (point.y > topEdge - strokeWidth && point.y < topEdge + strokeWidth)
        return true;

      if (point.y > bottomEdge - strokeWidth && point.y < bottomEdge + strokeWidth)
        return true;
    }

    // inside the bounding box
    return false;
  }
}