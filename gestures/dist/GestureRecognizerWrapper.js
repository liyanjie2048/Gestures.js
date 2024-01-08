import { GestureRecognizer } from "./Recognizers/GestureRecognizer";
var GestureRecognizerWrapper = /** @class */ (function () {
    function GestureRecognizerWrapper(element, recognizers, enable, preventDefault, stopPropagation) {
        if (enable === void 0) { enable = true; }
        if (preventDefault === void 0) { preventDefault = true; }
        if (stopPropagation === void 0) { stopPropagation = true; }
        var _this = this;
        this.element = element;
        this.recognizers = recognizers;
        this.enable = enable;
        this.preventDefault = preventDefault;
        this.stopPropagation = stopPropagation;
        this.gestureRecognizer = new GestureRecognizer(recognizers, enable, preventDefault, stopPropagation);
        element.addEventListener("pointerdown", function (e) { return _this.gestureRecognizer.pointerDown(e); });
        element.addEventListener("pointermove", function (e) { return _this.gestureRecognizer.pointerMove(e); });
        element.addEventListener("pointerup", function (e) { return _this.gestureRecognizer.pointerUp(e); });
        element.addEventListener("pointerleave", function (e) { return _this.gestureRecognizer.pointerLeave(e); });
    }
    return GestureRecognizerWrapper;
}());
export { GestureRecognizerWrapper };
//# sourceMappingURL=GestureRecognizerWrapper.js.map