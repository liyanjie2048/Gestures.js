import { IRecognizer } from "../IRecognizer";
import { GestureEventArgs } from "../EventArgs/GestureEventArgs";
import { RotateGestureEventArgs } from "../EventArgs/RotateGestureEventArgs";
import { calcAngle } from "../Extensions";

export class RotateGestureRecognizer implements IRecognizer
{
    constructor(
        public minAngle: number = 10) { }

    private _rotateStart: boolean;
    private _lastAngle: number;
    private _angleChange: number;

    public async gestureStart(e: GestureEventArgs)
    {
        if (e.startPoints.length < 2)
            return;

        this._lastAngle = calcAngle(e.movePoints[0], e.movePoints[1]);
        this._rotateStart = true;
    }
    public async gestureMove(e: GestureEventArgs)
    {
        if (e.movePoints.length < 2)
            return;

        if (this._rotateStart)
            this._awareRotate(e);
    }
    public async gestureEnd(e: GestureEventArgs)
    {
        if (e.movePoints.length < 2)
        {
            this._clear(e);
            return;
        }

        if (this._rotateStart)
            this._awareRotateEnd(e);

        this._clear(e);
    }
    public async gestureLeave(e: GestureEventArgs)
    {
        if (e.movePoints.length < 2)
        {
            this._clear(e);
            return;
        }

        if (this._rotateStart)
            this._awareRotateEnd(e);

        this._clear(e);
    }
    private _clear(e: GestureEventArgs)
    {
        this._rotateStart = false;
        this._lastAngle = 0;
        this._angleChange = 0;
    }

    private _awareRotate(e: GestureEventArgs)
    {
        var moveAngle = calcAngle(e.movePoints[0], e.movePoints[1]);
        this._angleChange += this._getAngleChange(moveAngle);

        e.target.dispatchEvent(this._createEventArgs("rotate", e));
    }
    private _awareRotateEnd(e: GestureEventArgs)
    {
        e.target.dispatchEvent(this._createEventArgs("rotateend", e));

        if (Math.abs(this._angleChange) > this.minAngle)
        {
            if (this._angleChange > 0)
            {
                e.target.dispatchEvent(this._createEventArgs("rotatecw", e));
            }
            else
            {
                e.target.dispatchEvent(this._createEventArgs("rotateccw", e));
            }
        }
    }

    private _getAngleChange(moveAngle: number): number
    {
        let value = moveAngle - this._lastAngle;
        this._lastAngle = moveAngle;

        if (value > 180)
            value = 360 - value;
        else if (value < -180)
            value = 360 + value;
        return value;
    }

    private _createEventArgs(
        type: string,
        e: GestureEventArgs)
    {
        return new CustomEvent(type, { detail: new RotateGestureEventArgs(type, e, this._angleChange) });
    }
}
