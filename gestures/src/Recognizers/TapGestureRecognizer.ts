import { IRecognizer } from "../IRecognizer";
import { GestureEventArgs } from "../EventArgs/GestureEventArgs";
import { TapGestureEventArgs } from "../EventArgs/TapGestureEventArgs";
import { calcDistance } from "../Extensions";

export class TapGestureRecognizer implements IRecognizer
{
    constructor(
        public maxDuration: number = 200,
        public maxDistance: number = 10,
        public allowDoubleTap: boolean = true,
        public maxDoubleTapDistance: number = 20) { }

    private _lastTapTime: Date = new Date();
    private _lastTapPoint?: PointerEvent;
    private _timeout: any;

    public async gestureStart(e: GestureEventArgs)
    {
        clearTimeout(this._timeout);
    }
    public async gestureMove(e: GestureEventArgs)
    {
        if (e.distance >= this.maxDistance)
        {
            clearTimeout(this._timeout);
        }
    }
    public async gestureEnd(e: GestureEventArgs)
    {
        clearTimeout(this._timeout);

        this._awareTap(e);
    }
    public async gestureLeave(e: GestureEventArgs)
    {
        clearTimeout(this._timeout);
    }

    private _awareTap(e: GestureEventArgs)
    {
        if (e.distance > this.maxDistance)
            return;

        if (this.allowDoubleTap
            && (e.startTime - this._lastTapTime.getTime()) < this.maxDuration
            && this._lastTapPoint
            && calcDistance(this._lastTapPoint, e.movePoints[0]) < this.maxDoubleTapDistance)
        {
            e.target.dispatchEvent(this._createEventArgs("doubletap", e));
            delete this._lastTapPoint;
        }
        else if (e.duration < this.maxDuration)
        {
            this._lastTapTime = new Date();
            this._lastTapPoint = e.movePoints[0];
            this._timeout = setTimeout(() =>
            {
                clearTimeout(this._timeout);

                e.target.dispatchEvent(this._createEventArgs("tap", e));
                delete this._lastTapPoint;
            }, this.maxDuration);
        }
    }

    private _createEventArgs(
        type: string,
        e: GestureEventArgs)
    {
        return new CustomEvent(type, { detail: new TapGestureEventArgs(type, e) });
    }
}
