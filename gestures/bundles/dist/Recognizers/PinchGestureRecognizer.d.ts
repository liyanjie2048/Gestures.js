import { IRecognizer } from "../IRecognizer";
import { GestureEventArgs } from "../EventArgs/GestureEventArgs";
export declare class PinchGestureRecognizer implements IRecognizer {
    minScale: number;
    constructor(minScale?: number);
    private _startDistance;
    private _scale;
    private _pinchStart;
    gestureStart(e: GestureEventArgs): Promise<void>;
    gestureMove(e: GestureEventArgs): Promise<void>;
    gestureEnd(e: GestureEventArgs): Promise<void>;
    gestureLeave(e: GestureEventArgs): Promise<void>;
    private _clear;
    private _awarePinch;
    private _awarePinchEnd;
    private _createEventArgs;
}
