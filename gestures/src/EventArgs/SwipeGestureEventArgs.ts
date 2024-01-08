import { GestureEventArgs } from "./GestureEventArgs";

export class SwipeGestureEventArgs extends GestureEventArgs
{
    constructor(type: string, e: GestureEventArgs)
    {
        super(type, e.target, e.startTime, e.startPoints, e.movePoints);
    }
}
