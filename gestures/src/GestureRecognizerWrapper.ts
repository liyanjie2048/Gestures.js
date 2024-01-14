import { IRecognizer } from "./IRecognizer";
import { GestureRecognizer } from "./Recognizers/GestureRecognizer";

export class GestureRecognizerWrapper
{
    public gestureRecognizer: GestureRecognizer;

    constructor(
        public element: Element,
        public recognizers: IRecognizer[],
        public edgeDistance: number = 96,
        public enable: boolean = true,
        public preventDefault: boolean = true,
        public stopPropagation: boolean = true)
    {
        this.gestureRecognizer = new GestureRecognizer(recognizers, edgeDistance, enable, preventDefault, stopPropagation);
        element.addEventListener("pointerdown", (e) => this.gestureRecognizer.pointerDown(e as PointerEvent));
        element.addEventListener("pointermove", (e) => this.gestureRecognizer.pointerMove(e as PointerEvent));
        element.addEventListener("pointerup", (e) => this.gestureRecognizer.pointerUp(e as PointerEvent));
        element.addEventListener("pointerleave", (e) => this.gestureRecognizer.pointerLeave(e as PointerEvent));
    }
}