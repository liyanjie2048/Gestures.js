import { GestureEventArgs } from "../EventArgs/GestureEventArgs";
var GestureRecognizer = /** @class */ (function () {
    function GestureRecognizer(recognizers, enable, preventDefault, stopPropagation) {
        if (enable === void 0) { enable = true; }
        if (preventDefault === void 0) { preventDefault = true; }
        if (stopPropagation === void 0) { stopPropagation = true; }
        this.recognizers = recognizers;
        this.enable = enable;
        this.preventDefault = preventDefault;
        this.stopPropagation = stopPropagation;
        this._startPoints = new Map();
        this._movePoints = new Map();
    }
    Object.defineProperty(GestureRecognizer.prototype, "_hasPrimaryPoint", {
        get: function () { return Array.from(this._movePoints.values()).some(function (_) { return _.isPrimary; }); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GestureRecognizer.prototype, "active", {
        get: function () { return this._active; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GestureRecognizer.prototype, "startTime", {
        get: function () { return this._startTime; },
        enumerable: false,
        configurable: true
    });
    GestureRecognizer.prototype.pointerDown = function (e) {
        this.preventDefault && e.preventDefault();
        this.stopPropagation && e.stopPropagation();
        if (!this.enable)
            return;
        this._active = true;
        this._startTime = new Date();
        this._startPoints.set(e.pointerId, e);
        this._movePoints.set(e.pointerId, e);
        var event = this._createEventArgs("gesturestart", e);
        this.recognizers.forEach(function (recognizer) { return recognizer.gestureStart(event); });
    };
    GestureRecognizer.prototype.pointerMove = function (e) {
        this.preventDefault && e.preventDefault();
        this.stopPropagation && e.stopPropagation();
        if (!this.enable)
            return;
        if (this._active)
            this._movePoints.set(e.pointerId, e);
        if (this._active && this._hasPrimaryPoint) {
            var event_1 = this._createEventArgs("gesturemove", e);
            this.recognizers.forEach(function (recognizer) { return recognizer.gestureMove(event_1); });
        }
    };
    GestureRecognizer.prototype.pointerUp = function (e) {
        this.preventDefault && e.preventDefault();
        this.stopPropagation && e.stopPropagation();
        if (!this.enable)
            return;
        if (this._active && this._hasPrimaryPoint) {
            var event_2 = this._createEventArgs("gestureup", e);
            this.recognizers.forEach(function (recognizer) { return recognizer.gestureEnd(event_2); });
        }
        this._clear(e);
    };
    GestureRecognizer.prototype.pointerLeave = function (e) {
        this.preventDefault && e.preventDefault();
        this.stopPropagation && e.stopPropagation();
        if (!this.enable)
            return;
        if (this._active && this._hasPrimaryPoint) {
            var event_3 = this._createEventArgs("gestureleave", e);
            this.recognizers.forEach(function (recognizer) { return recognizer.gestureLeave(event_3); });
        }
        this._clear(e);
    };
    GestureRecognizer.prototype._clear = function (e) {
        if (e.isPrimary) {
            this._active = false;
            delete this._startTime;
        }
        this._startPoints.delete(e.pointerId);
        this._movePoints.delete(e.pointerId);
    };
    GestureRecognizer.prototype._createEventArgs = function (type, e) {
        return new GestureEventArgs(type, e.target, this.startTime, Array.from(this._startPoints.values()).sort(function (_) { return _.pointerId; }), Array.from(this._movePoints.values()).sort(function (_) { return _.pointerId; }));
    };
    return GestureRecognizer;
}());
export { GestureRecognizer };
//# sourceMappingURL=GestureRecognizer.js.map