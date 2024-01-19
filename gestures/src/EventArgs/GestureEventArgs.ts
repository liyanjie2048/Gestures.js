import { calcAngle, calcDistance } from "../Extensions";
import { GestureDirection } from "../GestureDirection";
import { GestureEdge } from "../GestureEdge";
import { GestureRecognizer } from "../Recognizers/GestureRecognizer";

export class GestureEventArgs
{
    constructor(
        public type: string | undefined,
        public target: EventTarget,
        public startTime: number,
        public startPoints: PointerEvent[],
        public movePoints: PointerEvent[],
        public edgeDistance: number)
    {
        const _target = this.target as HTMLElement;
        this.width = _target.offsetWidth;
        this.height = _target.offsetHeight;
    }

    protected width: number;
    protected height: number;

    public get currentPoints()
    {
        return this.movePoints
            .map(_ => ({ movePoint: _, startPoint: this.startPoints.find(__ => __.pointerId === _.pointerId) }))
            .filter(_ => _.startPoint !== undefined);
    }
    public get startPrimaryPoint(): PointerEvent | undefined
    {
        return this.startPoints.find(_ => _.isPrimary);
    }
    public get movePrimaryPoint(): PointerEvent | undefined
    {
        return this.movePoints.find(_ => _.isPrimary);
    }
    public get pointerCount(): number
    {
        return this.movePoints.length;
    }
    public get duration(): number
    {
        return new Date().getTime() - this.startTime;
    }
    public get distanceX(): number
    {
        return this.currentPoints.length > 0
            ? this.currentPoints
                .map(_ => _.movePoint.screenX - _.startPoint.screenX)
                .reduce((prev, curr) => prev + curr) / this.currentPoints.length
            : 0;
    }
    public get distanceY(): number
    {
        return this.currentPoints.length > 0
            ? this.currentPoints
                .map(_ => _.movePoint.screenY - _.startPoint.screenY)
                .reduce((prev, curr) => prev + curr) / this.currentPoints.length
            : 0;
    }
    public get distance(): number
    {
        return Math.sqrt((this.distanceX * this.distanceX) + (this.distanceY * this.distanceY));
    }
    public get angle(): number
    {
        return this.currentPoints.length > 0
            ? this.currentPoints
                .map(_ => calcAngle(_.startPoint, _.movePoint))
                .reduce((prev, curr) => prev + curr) / this.currentPoints.length
            : 0;
    }
    public get direction(): GestureDirection
    {
        if (this.angle < -45 && this.angle >= -135)
            return GestureDirection.up;
        else if (this.angle < -135 || this.angle >= 135)
            return GestureDirection.left;
        else if (this.angle < 135 && this.angle >= 45)
            return GestureDirection.down;
        else if (this.angle < 45 && this.angle >= -45)
            return GestureDirection.right;
        else
            return GestureDirection.right;
    }
    public get startEdge(): GestureEdge | undefined
    {
        if (!this.edgeDistance || !this.startPrimaryPoint)
            return;

        let edge = GestureEdge.none;
        if (this.startPrimaryPoint.offsetX < this.edgeDistance)
            edge |= GestureEdge.left;
        if (this.startPrimaryPoint.offsetY < this.edgeDistance)
            edge |= GestureEdge.top;
        if (this.width - this.startPrimaryPoint.offsetX < this.edgeDistance)
            edge |= GestureEdge.right;
        if (this.height - this.startPrimaryPoint.offsetY < this.edgeDistance)
            edge |= GestureEdge.bottom;
        return edge;
    }
    public get moveEdge(): GestureEdge | undefined
    {
        if (!this.edgeDistance || !this.movePrimaryPoint)
            return;

        let edge = GestureEdge.none;
        if (this.movePrimaryPoint.offsetX < this.edgeDistance)
            edge |= GestureEdge.left;
        if (this.movePrimaryPoint.offsetY < this.edgeDistance)
            edge |= GestureEdge.top;
        if (this.width - this.movePrimaryPoint.offsetX < this.edgeDistance)
            edge |= GestureEdge.right;
        if (this.height - this.movePrimaryPoint.offsetY < this.edgeDistance)
            edge |= GestureEdge.bottom;
        return edge;
    }
}
