import { GestureEventArgs } from "./GestureEventArgs";
export declare class PinchGestureEventArgs extends GestureEventArgs {
    scale: number;
    constructor(type: string, e: GestureEventArgs, scale: number);
}
