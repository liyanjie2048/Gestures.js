import { GestureDirection } from "../GestureDirection";
export declare class GestureEventArgs {
    type: string | undefined;
    target: EventTarget;
    startTime: Date;
    startPoints: PointerEvent[];
    movePoints: PointerEvent[];
    constructor(type: string | undefined, target: EventTarget, startTime: Date, startPoints: PointerEvent[], movePoints: PointerEvent[]);
    get currentPoints(): {
        movePoint: PointerEvent;
        startPoint: PointerEvent;
    }[];
    get startPrimaryPoint(): PointerEvent | undefined;
    get movePrimaryPoint(): PointerEvent | undefined;
    get pointerCount(): number;
    get duration(): number;
    get distanceX(): number;
    get distanceY(): number;
    get distance(): number;
    get angle(): number;
    get direction(): GestureDirection;
}
