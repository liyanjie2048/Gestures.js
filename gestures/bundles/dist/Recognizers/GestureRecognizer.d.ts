import { IRecognizer } from "../IRecognizer";
export declare class GestureRecognizer {
    recognizers: IRecognizer[];
    enable: boolean;
    preventDefault: boolean;
    stopPropagation: boolean;
    private _startPoints;
    private _movePoints;
    private _active;
    private _startTime;
    private get _hasPrimaryPoint();
    get active(): boolean;
    get startTime(): Date;
    constructor(recognizers: IRecognizer[], enable?: boolean, preventDefault?: boolean, stopPropagation?: boolean);
    pointerDown(e: PointerEvent): void;
    pointerMove(e: PointerEvent): void;
    pointerUp(e: PointerEvent): void;
    pointerLeave(e: PointerEvent): void;
    private _clear;
    private _createEventArgs;
}
