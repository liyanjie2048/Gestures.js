import { IRecognizer } from "../IRecognizer";
import { GestureEventArgs } from "../EventArgs/GestureEventArgs";
export declare class LongPressGestureRecognizer implements IRecognizer {
    minDuration: number;
    maxDistance: number;
    constructor(minDuration?: number, maxDistance?: number);
    private _timeout;
    gestureStart(e: GestureEventArgs): Promise<void>;
    gestureMove(e: GestureEventArgs): Promise<void>;
    gestureEnd(e: GestureEventArgs): Promise<void>;
    gestureLeave(e: GestureEventArgs): Promise<void>;
    private _awareLongPress;
    private _createEventArgs;
}
