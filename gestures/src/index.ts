import { GestureDirection } from "./GestureDirection";
import { GestureEdge } from "./GestureEdge";
import { IRecognizer } from "./IRecognizer";
import { GestureEventArgs } from "./EventArgs/GestureEventArgs";
import { GestureRecognizer } from "./Recognizers/GestureRecognizer";
import { LongPressGestureEventArgs } from "./EventArgs/LongPressGestureEventArgs";
import { LongPressGestureRecognizer } from "./Recognizers/LongPressGestureRecognizer";
import { PanGestureEventArgs } from "./EventArgs/PanGestureEventArgs";
import { PanGestureRecognizer } from "./Recognizers/PanGestureRecognizer";
import { PinchGestureEventArgs } from "./EventArgs/PinchGestureEventArgs";
import { PinchGestureRecognizer } from "./Recognizers/PinchGestureRecognizer";
import { RotateGestureEventArgs } from "./EventArgs/RotateGestureEventArgs";
import { RotateGestureRecognizer } from "./Recognizers/RotateGestureRecognizer";
import { SwipeGestureEventArgs } from "./EventArgs/SwipeGestureEventArgs";
import { SwipeGestureRecognizer } from "./Recognizers/SwipeGestureRecognizer";
import { TapGestureEventArgs } from "./EventArgs/TapGestureEventArgs";
import { TapGestureRecognizer } from "./Recognizers/TapGestureRecognizer";

export
{
    GestureDirection,
    GestureEdge,
    IRecognizer,
    GestureEventArgs,
    GestureRecognizer,
    LongPressGestureEventArgs,
    LongPressGestureRecognizer,
    PanGestureEventArgs,
    PanGestureRecognizer,
    PinchGestureEventArgs,
    PinchGestureRecognizer,
    RotateGestureEventArgs,
    RotateGestureRecognizer,
    SwipeGestureEventArgs,
    SwipeGestureRecognizer,
    TapGestureEventArgs,
    TapGestureRecognizer,
};
export function registerGestures(
    elementOrSelectors: Element | string,
    recognizersOrOptions: IRecognizer[] | {
        tap: {
            maxDuration?: number;
            maxDistance?: number;
            allowDoubleTap?: boolean;
            maxDoubleTapDistance?: number;
        };
        longPress: {
            minDuration?: number;
            maxDistance?: number;
        };
        pan?: boolean;
        swipe: {
            direction?: GestureDirection;
            maxDuration?: number;
            minDistance?: number;
        };
        rotate: { minAngle?: number; };
        pinch: { minScale?: number; };
    },
    edgeDistance: number = 75,
    enable: boolean = true,
    preventDefault: boolean = true,
    stopPropagation: boolean = true): GestureRecognizer
{
    let gestureElement: Element;
    if (elementOrSelectors instanceof Element)
        gestureElement = elementOrSelectors;
    else if (typeof elementOrSelectors === 'string')
        gestureElement = document.querySelector(elementOrSelectors);
    if (!gestureElement)
        return;

    let gestureRecognizers;
    if (Array.isArray(recognizersOrOptions))
    {
        gestureRecognizers = recognizersOrOptions;
    }
    else
    {
        gestureRecognizers = [];
        recognizersOrOptions.tap && gestureRecognizers.push(new TapGestureRecognizer(recognizersOrOptions.tap.maxDuration ?? 200, recognizersOrOptions.tap.maxDistance ?? 10, recognizersOrOptions.tap.allowDoubleTap ?? true, recognizersOrOptions.tap.maxDoubleTapDistance ?? 20));
        recognizersOrOptions.longPress && gestureRecognizers.push(new LongPressGestureRecognizer(recognizersOrOptions.longPress.minDuration ?? 500, recognizersOrOptions.longPress.maxDistance ?? 10));
        recognizersOrOptions.pan && gestureRecognizers.push(new PanGestureRecognizer());
        recognizersOrOptions.swipe && gestureRecognizers.push(new SwipeGestureRecognizer(recognizersOrOptions.swipe.direction ?? GestureDirection.horizontal, recognizersOrOptions.swipe.maxDuration ?? 300, recognizersOrOptions.swipe.minDistance ?? 20));
        recognizersOrOptions.rotate && gestureRecognizers.push(new RotateGestureRecognizer(recognizersOrOptions.rotate.minAngle ?? 10));
        recognizersOrOptions.pinch && gestureRecognizers.push(new PinchGestureRecognizer(recognizersOrOptions.pinch.minScale ?? 0));
    }
    const gestureRecognizer = new GestureRecognizer(gestureElement, gestureRecognizers, edgeDistance, enable, preventDefault, stopPropagation);

    document.addEventListener("pointerdown", (e) => gestureElement.contains(e.target as Element) && gestureRecognizer.pointerDown(e));
    document.addEventListener("pointermove", (e) => gestureElement.contains(e.target as Element) ? gestureRecognizer.pointerMove(e) : gestureRecognizer.pointerLeave(e));
    document.addEventListener("pointerup", (e) => gestureElement.contains(e.target as Element) && gestureRecognizer.pointerUp(e));

    return gestureRecognizer;
};
