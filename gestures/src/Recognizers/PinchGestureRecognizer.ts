import { IRecognizer } from "../IRecognizer";
import { GestureEventArgs } from "../EventArgs/GestureEventArgs";
import { PinchGestureEventArgs } from "../EventArgs/PinchGestureEventArgs";
import { calcDistance } from "../Extensions";

export class PinchGestureRecognizer implements IRecognizer
{
    constructor(
        public minScale: number = 0) { }

    private _startDistance: number;
    private _scale: number = 1;
    private _pinchStart: boolean;

    public async gestureStart(e: GestureEventArgs)
    {
        if (e.startPoints.length < 2)
            return;

        this._startDistance = calcDistance(e.startPoints[0], e.startPoints[1]);
        this._pinchStart = true;
    }
    public async gestureMove(e: GestureEventArgs)
    {
        if (e.movePoints.length < 2)
            return;

        if (this._pinchStart)
            this._awarePinch(e);
    }
    public async gestureEnd(e: GestureEventArgs)
    {
        if (e.movePoints.length < 2)
        {
            this._clear(e);
            return;
        }

        if (this._pinchStart)
            this._awarePinchEnd(e);

        this._clear(e);
    }
    public async gestureLeave(e: GestureEventArgs)
    {
        if (e.movePoints.length < 2)
        {
            this._clear(e);
            return;
        }

        if (this._pinchStart)
            this._awarePinchEnd(e);

        this._clear(e);
    }
    private _clear(e: GestureEventArgs)
    {
        this._pinchStart = false;
        this._startDistance = 0;
    }

    private _awarePinch(e: GestureEventArgs)
    {
        this._scale = calcDistance(e.movePoints[0], e.movePoints[1]) / this._startDistance;

        e.target.dispatchEvent(this._createEventArgs("pinch", e));
    }
    private _awarePinchEnd(e: GestureEventArgs)
    {
        this._scale = calcDistance(e.movePoints[0], e.movePoints[1]) / this._startDistance;

        e.target.dispatchEvent(this._createEventArgs("pinchend", e));

        if (Math.abs(1 - this._scale) > this.minScale)
        {
            if (this._scale > 1) //手势放大, 触发pinchout事件
            {
                e.target.dispatchEvent(this._createEventArgs("pinchout", e));
            }
            else if (this._scale < 1) //手势缩小,触发pinchin事件
            {
                e.target.dispatchEvent(this._createEventArgs("pinchin", e));
            }
        }
    }

    private _createEventArgs(
        type: string,
        e: GestureEventArgs)
    {
        return new CustomEvent(type, { detail: new PinchGestureEventArgs(type, e, this._scale) });
    }
}
