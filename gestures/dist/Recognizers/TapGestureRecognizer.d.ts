import { IRecognizer } from "../IRecognizer";
import { GestureEventArgs } from "../EventArgs/GestureEventArgs";
export declare class TapGestureRecognizer implements IRecognizer {
    maxDuration: number;
    maxDistance: number;
    allowDoubleTap: boolean;
    maxDoubleTapDistance: number;
    constructor(maxDuration?: number, maxDistance?: number, allowDoubleTap?: boolean, maxDoubleTapDistance?: number);
    private _lastTapTime;
    private _lastTapPoint?;
    private _timeout;
    gestureStart(e: GestureEventArgs): Promise<void>;
    gestureMove(e: GestureEventArgs): Promise<void>;
    gestureEnd(e: GestureEventArgs): Promise<void>;
    gestureLeave(e: GestureEventArgs): Promise<void>;
    private _awareTap;
    private _createEventArgs;
}
