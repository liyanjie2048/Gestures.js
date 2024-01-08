import { IRecognizer } from "./IRecognizer";
import { GestureRecognizer } from "./Recognizers/GestureRecognizer";
export declare class GestureRecognizerWrapper {
    element: Element;
    recognizers: IRecognizer[];
    enable: boolean;
    preventDefault: boolean;
    stopPropagation: boolean;
    gestureRecognizer: GestureRecognizer;
    constructor(element: Element, recognizers: IRecognizer[], enable?: boolean, preventDefault?: boolean, stopPropagation?: boolean);
}
