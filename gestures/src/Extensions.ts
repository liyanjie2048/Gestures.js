    export function calcDistance(p1: PointerEvent, p2: PointerEvent): number
    {
        var x = p2.screenX - p1.screenX;
        var y = p2.screenY - p1.screenY;
        return Math.sqrt((x * x) + (y * y));
    }

    export function calcAngle(p1: PointerEvent, p2: PointerEvent): number
    {
        return Math.atan2(p2.screenY - p1.screenY, p2.screenX - p1.screenX) * 180 / Math.PI;
    }
