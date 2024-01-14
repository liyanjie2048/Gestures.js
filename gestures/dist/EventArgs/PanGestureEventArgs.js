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
var PanGestureEventArgs = /** @class */ (function (_super) {
    __extends(PanGestureEventArgs, _super);
    function PanGestureEventArgs(type, e) {
        return _super.call(this, type, e.target, e.startTime, e.startPoints, e.movePoints, e.edgeDistance) || this;
    }
    return PanGestureEventArgs;
}(GestureEventArgs));
export { PanGestureEventArgs };
//# sourceMappingURL=PanGestureEventArgs.js.map