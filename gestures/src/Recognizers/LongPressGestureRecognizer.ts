import { IRecognizer } from "../IRecognizer";
import { GestureEventArgs } from "../EventArgs/GestureEventArgs";
import { LongPressGestureEventArgs } from "../EventArgs/LongPressGestureEventArgs";

export class LongPressGestureRecognizer implements IRecognizer
{
    constructor(
        public minDuration: number = 500,
        public maxDistance: number = 10) { }

    private _timeout: any;

    public async gestureStart(e: GestureEventArgs)
    {
        clearTimeout(this._timeout);

        this._awareLongPress(e);
    }
    public async gestureMove(e: GestureEventArgs)
    {
        if (e.distance > this.maxDistance)
        {
            clearTimeout(this._timeout);
        }
    }
    public async gestureEnd(e: GestureEventArgs)
    {
        clearTimeout(this._timeout);
    }
    public async gestureLeave(e: GestureEventArgs)
    {
        clearTimeout(this._timeout);
    }

    private _awareLongPress(e: GestureEventArgs)
    {
        this._timeout = setTimeout(() =>
        {
            clearTimeout(this._timeout);

            if (e.distance <= this.maxDistance)
            {
                e.target.dispatchEvent(this._createEventArgs("longpress", e));
            }
        }, this.minDuration);
    }

    private _createEventArgs(type: string, e: GestureEventArgs)
    {
        return new CustomEvent(type, { detail: new LongPressGestureEventArgs(type, e) });
    }
}
