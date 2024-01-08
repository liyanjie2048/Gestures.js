import { IRecognizer } from "../IRecognizer";
import { GestureEventArgs } from "../EventArgs/GestureEventArgs";
import { SwipeGestureEventArgs } from "../EventArgs/SwipeGestureEventArgs";
import { GestureDirection } from "../GestureDirection";

export class SwipeGestureRecognizer implements IRecognizer
{
    constructor(
        public direction: GestureDirection = GestureDirection.horizontal,
        public maxDuration: number = 300,
        public minDistance: number = 20) { }

    private _swipeStart: boolean;

    public async gestureStart(e: GestureEventArgs) { }
    public async gestureMove(e: GestureEventArgs)
    {
        this._awareSwipe(e);
    }
    public async gestureEnd(e: GestureEventArgs)
    {
        if (this._swipeStart)
            this._awareSwipeEnd(e);

        this._clear(e);
    }
    public async gestureLeave(e: GestureEventArgs)
    {
        if (this._swipeStart)
            this._awareSwipeEnd(e);

        this._clear(e);
    }
    private _clear(e: GestureEventArgs)
    {
        this._swipeStart = false;
    }

    private _awareSwipe(e: GestureEventArgs)
    {
        if (e.direction != (this.direction & e.direction))
            return;

        this._swipeStart = true;

        e.target.dispatchEvent(this._createEventArgs("swipe", e));
    }
    private _awareSwipeEnd(e: GestureEventArgs)
    {
        if (e.direction != (this.direction & e.direction))
            return;

        e.target.dispatchEvent(this._createEventArgs("swipeend", e));

        if (e.duration < this.maxDuration)
        {
            if (Math.abs(e.distanceY) >= this.minDistance)
            {
                switch (e.direction)
                {
                    case GestureDirection.up:
                        e.target.dispatchEvent(this._createEventArgs("swipeup", e));
                        break;
                    case GestureDirection.down:
                        e.target.dispatchEvent(this._createEventArgs("swipedown", e));
                        break;
                    default:
                }
            }
            if (Math.abs(e.distanceX) >= this.minDistance)
            {
                switch (e.direction)
                {
                    case GestureDirection.left:
                        e.target.dispatchEvent(this._createEventArgs("swipeleft", e));
                        break;
                    case GestureDirection.right:
                        e.target.dispatchEvent(this._createEventArgs("swiperight", e));
                        break;
                    default:
                }
            }
        }
    }

    private _createEventArgs(
        type: string,
        e: GestureEventArgs)
    {
        return new CustomEvent(type, { detail: new SwipeGestureEventArgs(type, e) });
    }
}
