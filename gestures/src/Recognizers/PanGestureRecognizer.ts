import { IRecognizer } from "../IRecognizer";
import { GestureEventArgs } from "../EventArgs/GestureEventArgs";
import { PanGestureEventArgs } from "../EventArgs/PanGestureEventArgs";

export class PanGestureRecognizer implements IRecognizer
{
    constructor() { }

    private _panStart: boolean;

    public async gestureStart(e: GestureEventArgs) { }
    public async gestureMove(e: GestureEventArgs)
    {
        this._awarePan(e);
    }
    public async gestureEnd(e: GestureEventArgs)
    {
        if (this._panStart)
            this._awarePanEnd(e);

        this._clear(e);
    }
    public async gestureLeave(e: GestureEventArgs)
    {
        if (this._panStart)
            this._awarePanEnd(e);

        this._clear(e);
    }
    private _clear(e: GestureEventArgs)
    {
        this._panStart = false;
    }

    private _awarePan(e: GestureEventArgs)
    {
        this._panStart = true;

        e.target.dispatchEvent(this._createEventArgs("pan", e));
    }
    private _awarePanEnd(e: GestureEventArgs)
    {
        e.target.dispatchEvent(this._createEventArgs("panend", e));
    }

    private _createEventArgs(
        type: string,
        e: GestureEventArgs)
    {
        return new CustomEvent(type, { detail: new PanGestureEventArgs(type, e) });
    }
}
