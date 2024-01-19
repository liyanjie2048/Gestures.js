import { GestureDirection } from "./GestureDirection";
import { GestureEdge } from "./GestureEdge";
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
export { GestureDirection, GestureEdge, GestureEventArgs, GestureRecognizer, LongPressGestureEventArgs, LongPressGestureRecognizer, PanGestureEventArgs, PanGestureRecognizer, PinchGestureEventArgs, PinchGestureRecognizer, RotateGestureEventArgs, RotateGestureRecognizer, SwipeGestureEventArgs, SwipeGestureRecognizer, TapGestureEventArgs, TapGestureRecognizer, };
export function registerGestures(elementOrSelectors, recognizersOrOptions, edgeDistance, enable, preventDefault, stopPropagation) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    if (edgeDistance === void 0) { edgeDistance = 75; }
    if (enable === void 0) { enable = true; }
    if (preventDefault === void 0) { preventDefault = true; }
    if (stopPropagation === void 0) { stopPropagation = true; }
    var gestureElement;
    if (elementOrSelectors instanceof Element)
        gestureElement = elementOrSelectors;
    else if (typeof elementOrSelectors === 'string')
        gestureElement = document.querySelector(elementOrSelectors);
    if (!gestureElement)
        return;
    var gestureRecognizers;
    if (Array.isArray(recognizersOrOptions)) {
        gestureRecognizers = recognizersOrOptions;
    }
    else {
        gestureRecognizers = [];
        recognizersOrOptions.tap && gestureRecognizers.push(new TapGestureRecognizer((_a = recognizersOrOptions.tap.maxDuration) !== null && _a !== void 0 ? _a : 200, (_b = recognizersOrOptions.tap.maxDistance) !== null && _b !== void 0 ? _b : 10, (_c = recognizersOrOptions.tap.allowDoubleTap) !== null && _c !== void 0 ? _c : true, (_d = recognizersOrOptions.tap.maxDoubleTapDistance) !== null && _d !== void 0 ? _d : 20));
        recognizersOrOptions.longPress && gestureRecognizers.push(new LongPressGestureRecognizer((_e = recognizersOrOptions.longPress.minDuration) !== null && _e !== void 0 ? _e : 500, (_f = recognizersOrOptions.longPress.maxDistance) !== null && _f !== void 0 ? _f : 10));
        recognizersOrOptions.pan && gestureRecognizers.push(new PanGestureRecognizer());
        recognizersOrOptions.swipe && gestureRecognizers.push(new SwipeGestureRecognizer((_g = recognizersOrOptions.swipe.direction) !== null && _g !== void 0 ? _g : GestureDirection.horizontal, (_h = recognizersOrOptions.swipe.maxDuration) !== null && _h !== void 0 ? _h : 300, (_j = recognizersOrOptions.swipe.minDistance) !== null && _j !== void 0 ? _j : 20));
        recognizersOrOptions.rotate && gestureRecognizers.push(new RotateGestureRecognizer((_k = recognizersOrOptions.rotate.minAngle) !== null && _k !== void 0 ? _k : 10));
        recognizersOrOptions.pinch && gestureRecognizers.push(new PinchGestureRecognizer((_l = recognizersOrOptions.pinch.minScale) !== null && _l !== void 0 ? _l : 0));
    }
    var gestureRecognizer = new GestureRecognizer(gestureElement, gestureRecognizers, edgeDistance, enable, preventDefault, stopPropagation);
    document.addEventListener("pointerdown", function (e) { return gestureElement.contains(e.target) && gestureRecognizer.pointerDown(e); });
    document.addEventListener("pointermove", function (e) { return gestureElement.contains(e.target) ? gestureRecognizer.pointerMove(e) : gestureRecognizer.pointerLeave(e); });
    document.addEventListener("pointerup", function (e) { return gestureElement.contains(e.target) && gestureRecognizer.pointerUp(e); });
    return gestureRecognizer;
}
;
//# sourceMappingURL=index.js.map