var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { GestureEventArgs } from "./GestureEventArgs";
var LongPressGestureEventArgs = /** @class */ (function (_super) {
    __extends(LongPressGestureEventArgs, _super);
    function LongPressGestureEventArgs(type, e) {
        return _super.call(this, type, e.target, e.startTime, e.startPoints, e.movePoints) || this;
    }
    return LongPressGestureEventArgs;
}(GestureEventArgs));
export { LongPressGestureEventArgs };
//# sourceMappingURL=LongPressGestureEventArgs.js.map