import { GestureDirection } from "../GestureDirection";
import { GestureEdge } from "../GestureEdge";
export declare class GestureEventArgs {
    type: string | undefined;
    target: EventTarget;
    startTime: Date;
    startPoints: PointerEvent[];
    movePoints: PointerEvent[];
    edgeDistance: number;
    constructor(type: string | undefined, target: EventTarget, startTime: Date, startPoints: PointerEvent[], movePoints: PointerEvent[], edgeDistance: number);
    protected width: number;
    protected height: number;
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
    get startEdge(): GestureEdge | undefined;
    get moveEdge(): GestureEdge | undefined;
}
