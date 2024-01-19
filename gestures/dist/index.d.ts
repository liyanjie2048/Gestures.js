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
export { GestureDirection, GestureEdge, IRecognizer, GestureEventArgs, GestureRecognizer, LongPressGestureEventArgs, LongPressGestureRecognizer, PanGestureEventArgs, PanGestureRecognizer, PinchGestureEventArgs, PinchGestureRecognizer, RotateGestureEventArgs, RotateGestureRecognizer, SwipeGestureEventArgs, SwipeGestureRecognizer, TapGestureEventArgs, TapGestureRecognizer, };
export declare function registerGestures(elementOrSelectors: Element | string, recognizersOrOptions: IRecognizer[] | {
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
    rotate: {
        minAngle?: number;
    };
    pinch: {
        minScale?: number;
    };
}, edgeDistance?: number, enable?: boolean, preventDefault?: boolean, stopPropagation?: boolean): GestureRecognizer;
