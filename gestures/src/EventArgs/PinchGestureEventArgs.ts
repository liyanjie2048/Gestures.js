import { GestureEventArgs } from "./GestureEventArgs";

export class PinchGestureEventArgs extends GestureEventArgs
{
    constructor(type: string, e: GestureEventArgs, public scale: number)
    {
        super(type, e.target, e.startTime, e.startPoints, e.movePoints);
    }
}
