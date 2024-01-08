import { IRecognizer } from "../IRecognizer";
import { GestureEventArgs } from "../EventArgs/GestureEventArgs";
export declare class RotateGestureRecognizer implements IRecognizer {
    minAngle: number;
    constructor(minAngle?: number);
    private _rotateStart;
    private _lastAngle;
    private _angleChange;
    gestureStart(e: GestureEventArgs): Promise<void>;
    gestureMove(e: GestureEventArgs): Promise<void>;
    gestureEnd(e: GestureEventArgs): Promise<void>;
    gestureLeave(e: GestureEventArgs): Promise<void>;
    private _clear;
    private _awareRotate;
    private _awareRotateEnd;
    private _getAngleChange;
    private _createEventArgs;
}
