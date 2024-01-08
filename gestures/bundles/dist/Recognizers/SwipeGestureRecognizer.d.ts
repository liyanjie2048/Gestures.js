import { IRecognizer } from "../IRecognizer";
import { GestureEventArgs } from "../EventArgs/GestureEventArgs";
import { GestureDirection } from "../GestureDirection";
export declare class SwipeGestureRecognizer implements IRecognizer {
    direction: GestureDirection;
    maxDuration: number;
    minDistance: number;
    constructor(direction?: GestureDirection, maxDuration?: number, minDistance?: number);
    private _swipeStart;
    gestureStart(e: GestureEventArgs): Promise<void>;
    gestureMove(e: GestureEventArgs): Promise<void>;
    gestureEnd(e: GestureEventArgs): Promise<void>;
    gestureLeave(e: GestureEventArgs): Promise<void>;
    private _clear;
    private _awareSwipe;
    private _awareSwipeEnd;
    private _createEventArgs;
}
