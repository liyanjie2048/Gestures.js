import { GestureEventArgs } from "./GestureEventArgs";

export class RotateGestureEventArgs extends GestureEventArgs
{
    constructor(type: string, e: GestureEventArgs, public angleChange: number)
    {
        super(type, e.target, e.startTime, e.startPoints, e.movePoints);
    }
}
