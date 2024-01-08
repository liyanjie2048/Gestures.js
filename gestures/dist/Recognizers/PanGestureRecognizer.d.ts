import { IRecognizer } from "../IRecognizer";
import { GestureEventArgs } from "../EventArgs/GestureEventArgs";
export declare class PanGestureRecognizer implements IRecognizer {
    constructor();
    private _panStart;
    gestureStart(e: GestureEventArgs): Promise<void>;
    gestureMove(e: GestureEventArgs): Promise<void>;
    gestureEnd(e: GestureEventArgs): Promise<void>;
    gestureLeave(e: GestureEventArgs): Promise<void>;
    private _clear;
    private _awarePan;
    private _awarePanEnd;
    private _createEventArgs;
}
