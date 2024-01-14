import { IRecognizer } from "../IRecognizer";
import { GestureEventArgs } from "../EventArgs/GestureEventArgs";

export class GestureRecognizer
{
    private _startPoints: Map<number, PointerEvent> = new Map<number, PointerEvent>();
    private _movePoints: Map<number, PointerEvent> = new Map<number, PointerEvent>();
    private _active: boolean;
    private _startTime: Date | undefined;

    private get _hasPrimaryPoint(): boolean { return Array.from(this._movePoints.values()).some(_ => _.isPrimary); }

    public get active() { return this._active; }
    public get startTime() { return this._startTime; }

    constructor(
        public recognizers: IRecognizer[],
        public edgeDistance = 75,
        public enable: boolean = true,
        public preventDefault: boolean = true,
        public stopPropagation: boolean = true) { }

    public pointerDown(e: PointerEvent)
    {
        this.preventDefault && e.preventDefault();
        this.stopPropagation && e.stopPropagation();

        if (!this.enable)
            return;

        this._active = true;
        this._startTime = new Date();

        this._startPoints.set(e.pointerId, e);
        this._movePoints.set(e.pointerId, e);

        const event = this._createEventArgs("gesturestart", e);
        this.recognizers.forEach(recognizer => recognizer.gestureStart(event));
    }
    public pointerMove(e: PointerEvent)
    {
        this.preventDefault && e.preventDefault();
        this.stopPropagation && e.stopPropagation();

        if (!this.enable)
            return;

        if (this._active)
            this._movePoints.set(e.pointerId, e);

        if (this._active && this._hasPrimaryPoint)
        {
            const event = this._createEventArgs("gesturemove", e);
            this.recognizers.forEach(recognizer => recognizer.gestureMove(event));
        }
    }
    public pointerUp(e: PointerEvent)
    {
        this.preventDefault && e.preventDefault();
        this.stopPropagation && e.stopPropagation();

        if (!this.enable)
            return;

        if (this._active && this._hasPrimaryPoint)
        {
            const event = this._createEventArgs("gestureup", e);
            this.recognizers.forEach(recognizer => recognizer.gestureEnd(event));
        }

        this._clear(e);
    }
    public pointerLeave(e: PointerEvent)
    {
        this.preventDefault && e.preventDefault();
        this.stopPropagation && e.stopPropagation();

        if (!this.enable)
            return;

        if (this._active && this._hasPrimaryPoint)
        {
            const event = this._createEventArgs("gestureleave", e);
            this.recognizers.forEach(recognizer => recognizer.gestureLeave(event));
        }

        this._clear(e);
    }

    private _clear(e: PointerEvent)
    {
        if (e.isPrimary)
        {
            this._active = false;
            delete this._startTime;
        }
        this._startPoints.delete(e.pointerId);
        this._movePoints.delete(e.pointerId);
    }
    private _createEventArgs(type: string, e: PointerEvent)
    {
        return new GestureEventArgs(
            type,
            e.target,
            this.startTime,
            Array.from(this._startPoints.values()).sort(_ => _.pointerId),
            Array.from(this._movePoints.values()).sort(_ => _.pointerId),
            this.edgeDistance);
    }
}
