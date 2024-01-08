import { GestureEventArgs } from "./GestureEventArgs";
export declare class RotateGestureEventArgs extends GestureEventArgs {
    angleChange: number;
    constructor(type: string, e: GestureEventArgs, angleChange: number);
}
