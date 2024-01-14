import { calcAngle } from "../Extensions";
import { GestureDirection } from "../GestureDirection";
import { GestureEdge } from "../GestureEdge";
var GestureEventArgs = /** @class */ (function () {
    function GestureEventArgs(type, target, startTime, startPoints, movePoints, edgeDistance) {
        this.type = type;
        this.target = target;
        this.startTime = startTime;
        this.startPoints = startPoints;
        this.movePoints = movePoints;
        this.edgeDistance = edgeDistance;
        var _target = this.target;
        this.width = _target.offsetWidth;
        this.height = _target.offsetHeight;
    }
    Object.defineProperty(GestureEventArgs.prototype, "currentPoints", {
        get: function () {
            var _this = this;
            return this.movePoints
                .map(function (_) { return ({ movePoint: _, startPoint: _this.startPoints.find(function (__) { return __.pointerId === _.pointerId; }) }); })
                .filter(function (_) { return _.startPoint !== undefined; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GestureEventArgs.prototype, "startPrimaryPoint", {
        get: function () {
            return this.startPoints.find(function (_) { return _.isPrimary; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GestureEventArgs.prototype, "movePrimaryPoint", {
        get: function () {
            return this.movePoints.find(function (_) { return _.isPrimary; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GestureEventArgs.prototype, "pointerCount", {
        get: function () {
            return this.movePoints.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GestureEventArgs.prototype, "duration", {
        get: function () {
            return new Date().getTime() - this.startTime.getTime();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GestureEventArgs.prototype, "distanceX", {
        get: function () {
            return this.currentPoints.length > 0
                ? this.currentPoints
                    .map(function (_) { return _.movePoint.screenX - _.startPoint.screenX; })
                    .reduce(function (prev, curr) { return prev + curr; }) / this.currentPoints.length
                : 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GestureEventArgs.prototype, "distanceY", {
        get: function () {
            return this.currentPoints.length > 0
                ? this.currentPoints
                    .map(function (_) { return _.movePoint.screenY - _.startPoint.screenY; })
                    .reduce(function (prev, curr) { return prev + curr; }) / this.currentPoints.length
                : 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GestureEventArgs.prototype, "distance", {
        get: function () {
            return Math.sqrt((this.distanceX * this.distanceX) + (this.distanceY * this.distanceY));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GestureEventArgs.prototype, "angle", {
        get: function () {
            return this.currentPoints.length > 0
                ? this.currentPoints
                    .map(function (_) { return calcAngle(_.startPoint, _.movePoint); })
                    .reduce(function (prev, curr) { return prev + curr; }) / this.currentPoints.length
                : 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GestureEventArgs.prototype, "direction", {
        get: function () {
            if (this.angle < -45 && this.angle >= -135)
                return GestureDirection.up;
            else if (this.angle < -135 || this.angle >= 135)
                return GestureDirection.left;
            else if (this.angle < 135 && this.angle >= 45)
                return GestureDirection.down;
            else if (this.angle < 45 && this.angle >= -45)
                return GestureDirection.right;
            else
                return GestureDirection.right;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GestureEventArgs.prototype, "startEdge", {
        get: function () {
            if (!this.edgeDistance || !this.startPrimaryPoint)
                return;
            var edge = GestureEdge.none;
            if (this.startPrimaryPoint.offsetX < this.edgeDistance)
                edge |= GestureEdge.left;
            if (this.startPrimaryPoint.offsetY < this.edgeDistance)
                edge |= GestureEdge.top;
            if (this.width - this.startPrimaryPoint.offsetX < this.edgeDistance)
                edge |= GestureEdge.right;
            if (this.height - this.startPrimaryPoint.offsetY < this.edgeDistance)
                edge |= GestureEdge.bottom;
            return edge;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GestureEventArgs.prototype, "moveEdge", {
        get: function () {
            if (!this.edgeDistance || !this.movePrimaryPoint)
                return;
            var edge = GestureEdge.none;
            if (this.movePrimaryPoint.offsetX < this.edgeDistance)
                edge |= GestureEdge.left;
            if (this.movePrimaryPoint.offsetY < this.edgeDistance)
                edge |= GestureEdge.top;
            if (this.width - this.movePrimaryPoint.offsetX < this.edgeDistance)
                edge |= GestureEdge.right;
            if (this.height - this.movePrimaryPoint.offsetY < this.edgeDistance)
                edge |= GestureEdge.bottom;
            return edge;
        },
        enumerable: false,
        configurable: true
    });
    return GestureEventArgs;
}());
export { GestureEventArgs };
//# sourceMappingURL=GestureEventArgs.js.map