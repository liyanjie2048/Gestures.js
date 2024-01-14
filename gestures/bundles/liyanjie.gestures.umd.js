(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.liyanjie = global.liyanjie || {}, global.liyanjie.gestures = {})));
})(this, (function (exports) { 'use strict';

    function calcDistance(p1, p2) {
        var x = p2.screenX - p1.screenX;
        var y = p2.screenY - p1.screenY;
        return Math.sqrt((x * x) + (y * y));
    }
    function calcAngle(p1, p2) {
        return Math.atan2(p2.screenY - p1.screenY, p2.screenX - p1.screenX) * 180 / Math.PI;
    }

    exports.GestureDirection = void 0;
    (function (GestureDirection) {
        GestureDirection[GestureDirection["up"] = 1] = "up";
        GestureDirection[GestureDirection["down"] = 2] = "down";
        GestureDirection[GestureDirection["left"] = 4] = "left";
        GestureDirection[GestureDirection["right"] = 8] = "right";
        GestureDirection[GestureDirection["vertical"] = 3] = "vertical";
        GestureDirection[GestureDirection["horizontal"] = 12] = "horizontal";
    })(exports.GestureDirection || (exports.GestureDirection = {}));

    var GestureEdge;
    (function (GestureEdge) {
        GestureEdge[GestureEdge["none"] = 0] = "none";
        GestureEdge[GestureEdge["top"] = 1] = "top";
        GestureEdge[GestureEdge["bottom"] = 2] = "bottom";
        GestureEdge[GestureEdge["left"] = 4] = "left";
        GestureEdge[GestureEdge["right"] = 8] = "right";
        GestureEdge[GestureEdge["topLeft"] = 3] = "topLeft";
        GestureEdge[GestureEdge["topRight"] = 9] = "topRight";
        GestureEdge[GestureEdge["bottomLeft"] = 6] = "bottomLeft";
        GestureEdge[GestureEdge["bottomRight"] = 10] = "bottomRight";
    })(GestureEdge || (GestureEdge = {}));

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
                    return exports.GestureDirection.up;
                else if (this.angle < -135 || this.angle >= 135)
                    return exports.GestureDirection.left;
                else if (this.angle < 135 && this.angle >= 45)
                    return exports.GestureDirection.down;
                else if (this.angle < 45 && this.angle >= -45)
                    return exports.GestureDirection.right;
                else
                    return exports.GestureDirection.right;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GestureEventArgs.prototype, "startEdge", {
            get: function () {
                if (!this.edgeDistance)
                    return;
                var edge = 0;
                if (this.startPrimaryPoint.offsetX < this.edgeDistance)
                    edge = edge | GestureEdge.left;
                if (this.startPrimaryPoint.offsetY < this.edgeDistance)
                    edge = edge | GestureEdge.top;
                if (this.width - this.startPrimaryPoint.offsetX < this.edgeDistance)
                    edge = edge | GestureEdge.right;
                if (this.height - this.startPrimaryPoint.offsetY < this.edgeDistance)
                    edge = edge | GestureEdge.bottom;
                return edge;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GestureEventArgs.prototype, "moveEdge", {
            get: function () {
                if (!this.edgeDistance)
                    return;
                var edge = 0;
                if (this.movePrimaryPoint.offsetX < this.edgeDistance)
                    edge = edge | GestureEdge.left;
                if (this.movePrimaryPoint.offsetY < this.edgeDistance)
                    edge = edge | GestureEdge.top;
                if (this.width - this.movePrimaryPoint.offsetX < this.edgeDistance)
                    edge = edge | GestureEdge.right;
                if (this.height - this.movePrimaryPoint.offsetY < this.edgeDistance)
                    edge = edge | GestureEdge.bottom;
                return edge;
            },
            enumerable: false,
            configurable: true
        });
        return GestureEventArgs;
    }());

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    var LongPressGestureEventArgs = /** @class */ (function (_super) {
        __extends(LongPressGestureEventArgs, _super);
        function LongPressGestureEventArgs(type, e) {
            return _super.call(this, type, e.target, e.startTime, e.startPoints, e.movePoints, e.edgeDistance) || this;
        }
        return LongPressGestureEventArgs;
    }(GestureEventArgs));

    var LongPressGestureRecognizer = /** @class */ (function () {
        function LongPressGestureRecognizer(minDuration, maxDistance) {
            if (minDuration === void 0) { minDuration = 500; }
            if (maxDistance === void 0) { maxDistance = 10; }
            this.minDuration = minDuration;
            this.maxDistance = maxDistance;
        }
        LongPressGestureRecognizer.prototype.gestureStart = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    clearTimeout(this._timeout);
                    this._awareLongPress(e);
                    return [2 /*return*/];
                });
            });
        };
        LongPressGestureRecognizer.prototype.gestureMove = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (e.distance > this.maxDistance) {
                        clearTimeout(this._timeout);
                    }
                    return [2 /*return*/];
                });
            });
        };
        LongPressGestureRecognizer.prototype.gestureEnd = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    clearTimeout(this._timeout);
                    return [2 /*return*/];
                });
            });
        };
        LongPressGestureRecognizer.prototype.gestureLeave = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    clearTimeout(this._timeout);
                    return [2 /*return*/];
                });
            });
        };
        LongPressGestureRecognizer.prototype._awareLongPress = function (e) {
            var _this = this;
            this._timeout = setTimeout(function () {
                clearTimeout(_this._timeout);
                if (e.distance <= _this.maxDistance) {
                    e.target.dispatchEvent(_this._createEventArgs("longpress", e));
                }
            }, this.minDuration);
        };
        LongPressGestureRecognizer.prototype._createEventArgs = function (type, e) {
            return new CustomEvent(type, { detail: new LongPressGestureEventArgs(type, e) });
        };
        return LongPressGestureRecognizer;
    }());

    var PanGestureEventArgs = /** @class */ (function (_super) {
        __extends(PanGestureEventArgs, _super);
        function PanGestureEventArgs(type, e) {
            return _super.call(this, type, e.target, e.startTime, e.startPoints, e.movePoints, e.edgeDistance) || this;
        }
        return PanGestureEventArgs;
    }(GestureEventArgs));

    var PanGestureRecognizer = /** @class */ (function () {
        function PanGestureRecognizer() {
        }
        PanGestureRecognizer.prototype.gestureStart = function (e) {
            return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); });
        };
        PanGestureRecognizer.prototype.gestureMove = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this._awarePan(e);
                    return [2 /*return*/];
                });
            });
        };
        PanGestureRecognizer.prototype.gestureEnd = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (this._panStart)
                        this._awarePanEnd(e);
                    this._clear(e);
                    return [2 /*return*/];
                });
            });
        };
        PanGestureRecognizer.prototype.gestureLeave = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (this._panStart)
                        this._awarePanEnd(e);
                    this._clear(e);
                    return [2 /*return*/];
                });
            });
        };
        PanGestureRecognizer.prototype._clear = function (e) {
            this._panStart = false;
        };
        PanGestureRecognizer.prototype._awarePan = function (e) {
            this._panStart = true;
            e.target.dispatchEvent(this._createEventArgs("pan", e));
        };
        PanGestureRecognizer.prototype._awarePanEnd = function (e) {
            e.target.dispatchEvent(this._createEventArgs("panend", e));
        };
        PanGestureRecognizer.prototype._createEventArgs = function (type, e) {
            return new CustomEvent(type, { detail: new PanGestureEventArgs(type, e) });
        };
        return PanGestureRecognizer;
    }());

    var PinchGestureEventArgs = /** @class */ (function (_super) {
        __extends(PinchGestureEventArgs, _super);
        function PinchGestureEventArgs(type, e, scale) {
            var _this = _super.call(this, type, e.target, e.startTime, e.startPoints, e.movePoints, e.edgeDistance) || this;
            _this.scale = scale;
            return _this;
        }
        return PinchGestureEventArgs;
    }(GestureEventArgs));

    var PinchGestureRecognizer = /** @class */ (function () {
        function PinchGestureRecognizer(minScale) {
            if (minScale === void 0) { minScale = 0; }
            this.minScale = minScale;
            this._scale = 1;
        }
        PinchGestureRecognizer.prototype.gestureStart = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (e.startPoints.length < 2)
                        return [2 /*return*/];
                    this._startDistance = calcDistance(e.startPoints[0], e.startPoints[1]);
                    this._pinchStart = true;
                    return [2 /*return*/];
                });
            });
        };
        PinchGestureRecognizer.prototype.gestureMove = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (e.movePoints.length < 2)
                        return [2 /*return*/];
                    if (this._pinchStart)
                        this._awarePinch(e);
                    return [2 /*return*/];
                });
            });
        };
        PinchGestureRecognizer.prototype.gestureEnd = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (e.movePoints.length < 2) {
                        this._clear(e);
                        return [2 /*return*/];
                    }
                    if (this._pinchStart)
                        this._awarePinchEnd(e);
                    this._clear(e);
                    return [2 /*return*/];
                });
            });
        };
        PinchGestureRecognizer.prototype.gestureLeave = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (e.movePoints.length < 2) {
                        this._clear(e);
                        return [2 /*return*/];
                    }
                    if (this._pinchStart)
                        this._awarePinchEnd(e);
                    this._clear(e);
                    return [2 /*return*/];
                });
            });
        };
        PinchGestureRecognizer.prototype._clear = function (e) {
            this._pinchStart = false;
            this._startDistance = 0;
        };
        PinchGestureRecognizer.prototype._awarePinch = function (e) {
            this._scale = calcDistance(e.movePoints[0], e.movePoints[1]) / this._startDistance;
            e.target.dispatchEvent(this._createEventArgs("pinch", e));
        };
        PinchGestureRecognizer.prototype._awarePinchEnd = function (e) {
            this._scale = calcDistance(e.movePoints[0], e.movePoints[1]) / this._startDistance;
            e.target.dispatchEvent(this._createEventArgs("pinchend", e));
            if (Math.abs(1 - this._scale) > this.minScale) {
                if (this._scale > 1) //手势放大, 触发pinchout事件
                 {
                    e.target.dispatchEvent(this._createEventArgs("pinchout", e));
                }
                else if (this._scale < 1) //手势缩小,触发pinchin事件
                 {
                    e.target.dispatchEvent(this._createEventArgs("pinchin", e));
                }
            }
        };
        PinchGestureRecognizer.prototype._createEventArgs = function (type, e) {
            return new CustomEvent(type, { detail: new PinchGestureEventArgs(type, e, this._scale) });
        };
        return PinchGestureRecognizer;
    }());

    var RotateGestureEventArgs = /** @class */ (function (_super) {
        __extends(RotateGestureEventArgs, _super);
        function RotateGestureEventArgs(type, e, angleChange) {
            var _this = _super.call(this, type, e.target, e.startTime, e.startPoints, e.movePoints, e.edgeDistance) || this;
            _this.angleChange = angleChange;
            return _this;
        }
        return RotateGestureEventArgs;
    }(GestureEventArgs));

    var RotateGestureRecognizer = /** @class */ (function () {
        function RotateGestureRecognizer(minAngle) {
            if (minAngle === void 0) { minAngle = 10; }
            this.minAngle = minAngle;
        }
        RotateGestureRecognizer.prototype.gestureStart = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (e.startPoints.length < 2)
                        return [2 /*return*/];
                    this._lastAngle = calcAngle(e.movePoints[0], e.movePoints[1]);
                    this._rotateStart = true;
                    return [2 /*return*/];
                });
            });
        };
        RotateGestureRecognizer.prototype.gestureMove = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (e.movePoints.length < 2)
                        return [2 /*return*/];
                    if (this._rotateStart)
                        this._awareRotate(e);
                    return [2 /*return*/];
                });
            });
        };
        RotateGestureRecognizer.prototype.gestureEnd = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (e.movePoints.length < 2) {
                        this._clear(e);
                        return [2 /*return*/];
                    }
                    if (this._rotateStart)
                        this._awareRotateEnd(e);
                    this._clear(e);
                    return [2 /*return*/];
                });
            });
        };
        RotateGestureRecognizer.prototype.gestureLeave = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (e.movePoints.length < 2) {
                        this._clear(e);
                        return [2 /*return*/];
                    }
                    if (this._rotateStart)
                        this._awareRotateEnd(e);
                    this._clear(e);
                    return [2 /*return*/];
                });
            });
        };
        RotateGestureRecognizer.prototype._clear = function (e) {
            this._rotateStart = false;
            this._lastAngle = 0;
            this._angleChange = 0;
        };
        RotateGestureRecognizer.prototype._awareRotate = function (e) {
            var moveAngle = calcAngle(e.movePoints[0], e.movePoints[1]);
            this._angleChange += this._getAngleChange(moveAngle);
            e.target.dispatchEvent(this._createEventArgs("rotate", e));
        };
        RotateGestureRecognizer.prototype._awareRotateEnd = function (e) {
            e.target.dispatchEvent(this._createEventArgs("rotateend", e));
            if (Math.abs(this._angleChange) > this.minAngle) {
                if (this._angleChange > 0) {
                    e.target.dispatchEvent(this._createEventArgs("rotatecw", e));
                }
                else {
                    e.target.dispatchEvent(this._createEventArgs("rotateccw", e));
                }
            }
        };
        RotateGestureRecognizer.prototype._getAngleChange = function (moveAngle) {
            var value = moveAngle - this._lastAngle;
            this._lastAngle = moveAngle;
            if (value > 180)
                value = 360 - value;
            else if (value < -180)
                value = 360 + value;
            return value;
        };
        RotateGestureRecognizer.prototype._createEventArgs = function (type, e) {
            return new CustomEvent(type, { detail: new RotateGestureEventArgs(type, e, this._angleChange) });
        };
        return RotateGestureRecognizer;
    }());

    var SwipeGestureEventArgs = /** @class */ (function (_super) {
        __extends(SwipeGestureEventArgs, _super);
        function SwipeGestureEventArgs(type, e) {
            return _super.call(this, type, e.target, e.startTime, e.startPoints, e.movePoints, e.edgeDistance) || this;
        }
        return SwipeGestureEventArgs;
    }(GestureEventArgs));

    var SwipeGestureRecognizer = /** @class */ (function () {
        function SwipeGestureRecognizer(direction, maxDuration, minDistance) {
            if (direction === void 0) { direction = exports.GestureDirection.horizontal; }
            if (maxDuration === void 0) { maxDuration = 300; }
            if (minDistance === void 0) { minDistance = 20; }
            this.direction = direction;
            this.maxDuration = maxDuration;
            this.minDistance = minDistance;
        }
        SwipeGestureRecognizer.prototype.gestureStart = function (e) {
            return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); });
        };
        SwipeGestureRecognizer.prototype.gestureMove = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this._awareSwipe(e);
                    return [2 /*return*/];
                });
            });
        };
        SwipeGestureRecognizer.prototype.gestureEnd = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (this._swipeStart)
                        this._awareSwipeEnd(e);
                    this._clear(e);
                    return [2 /*return*/];
                });
            });
        };
        SwipeGestureRecognizer.prototype.gestureLeave = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (this._swipeStart)
                        this._awareSwipeEnd(e);
                    this._clear(e);
                    return [2 /*return*/];
                });
            });
        };
        SwipeGestureRecognizer.prototype._clear = function (e) {
            this._swipeStart = false;
        };
        SwipeGestureRecognizer.prototype._awareSwipe = function (e) {
            if (e.direction != (this.direction & e.direction))
                return;
            this._swipeStart = true;
            e.target.dispatchEvent(this._createEventArgs("swipe", e));
        };
        SwipeGestureRecognizer.prototype._awareSwipeEnd = function (e) {
            if (e.direction != (this.direction & e.direction))
                return;
            e.target.dispatchEvent(this._createEventArgs("swipeend", e));
            if (e.duration < this.maxDuration) {
                if (Math.abs(e.distanceY) >= this.minDistance) {
                    switch (e.direction) {
                        case exports.GestureDirection.up:
                            e.target.dispatchEvent(this._createEventArgs("swipeup", e));
                            break;
                        case exports.GestureDirection.down:
                            e.target.dispatchEvent(this._createEventArgs("swipedown", e));
                            break;
                    }
                }
                if (Math.abs(e.distanceX) >= this.minDistance) {
                    switch (e.direction) {
                        case exports.GestureDirection.left:
                            e.target.dispatchEvent(this._createEventArgs("swipeleft", e));
                            break;
                        case exports.GestureDirection.right:
                            e.target.dispatchEvent(this._createEventArgs("swiperight", e));
                            break;
                    }
                }
            }
        };
        SwipeGestureRecognizer.prototype._createEventArgs = function (type, e) {
            return new CustomEvent(type, { detail: new SwipeGestureEventArgs(type, e) });
        };
        return SwipeGestureRecognizer;
    }());

    var TapGestureEventArgs = /** @class */ (function (_super) {
        __extends(TapGestureEventArgs, _super);
        function TapGestureEventArgs(type, e) {
            return _super.call(this, type, e.target, e.startTime, e.startPoints, e.movePoints, e.edgeDistance) || this;
        }
        return TapGestureEventArgs;
    }(GestureEventArgs));

    var TapGestureRecognizer = /** @class */ (function () {
        function TapGestureRecognizer(maxDuration, maxDistance, allowDoubleTap, maxDoubleTapDistance) {
            if (maxDuration === void 0) { maxDuration = 200; }
            if (maxDistance === void 0) { maxDistance = 10; }
            if (allowDoubleTap === void 0) { allowDoubleTap = true; }
            if (maxDoubleTapDistance === void 0) { maxDoubleTapDistance = 20; }
            this.maxDuration = maxDuration;
            this.maxDistance = maxDistance;
            this.allowDoubleTap = allowDoubleTap;
            this.maxDoubleTapDistance = maxDoubleTapDistance;
            this._lastTapTime = new Date();
        }
        TapGestureRecognizer.prototype.gestureStart = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    clearTimeout(this._timeout);
                    return [2 /*return*/];
                });
            });
        };
        TapGestureRecognizer.prototype.gestureMove = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (e.distance >= this.maxDistance) {
                        clearTimeout(this._timeout);
                    }
                    return [2 /*return*/];
                });
            });
        };
        TapGestureRecognizer.prototype.gestureEnd = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    clearTimeout(this._timeout);
                    this._awareTap(e);
                    return [2 /*return*/];
                });
            });
        };
        TapGestureRecognizer.prototype.gestureLeave = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    clearTimeout(this._timeout);
                    return [2 /*return*/];
                });
            });
        };
        TapGestureRecognizer.prototype._awareTap = function (e) {
            var _this = this;
            if (e.distance > this.maxDistance)
                return;
            if (this.allowDoubleTap
                && (e.startTime.getTime() - this._lastTapTime.getTime()) < this.maxDuration
                && this._lastTapPoint
                && calcDistance(this._lastTapPoint, e.movePoints[0]) < this.maxDoubleTapDistance) {
                e.target.dispatchEvent(this._createEventArgs("doubletap", e));
                delete this._lastTapPoint;
            }
            else if (e.duration < this.maxDuration) {
                this._lastTapTime = new Date();
                this._lastTapPoint = e.movePoints[0];
                this._timeout = setTimeout(function () {
                    clearTimeout(_this._timeout);
                    e.target.dispatchEvent(_this._createEventArgs("tap", e));
                    delete _this._lastTapPoint;
                }, this.maxDuration);
            }
        };
        TapGestureRecognizer.prototype._createEventArgs = function (type, e) {
            return new CustomEvent(type, { detail: new TapGestureEventArgs(type, e) });
        };
        return TapGestureRecognizer;
    }());

    var GestureRecognizer = /** @class */ (function () {
        function GestureRecognizer(recognizers, edgeDistance, enable, preventDefault, stopPropagation) {
            if (edgeDistance === void 0) { edgeDistance = 96; }
            if (enable === void 0) { enable = true; }
            if (preventDefault === void 0) { preventDefault = true; }
            if (stopPropagation === void 0) { stopPropagation = true; }
            this.recognizers = recognizers;
            this.edgeDistance = edgeDistance;
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
            return new GestureEventArgs(type, e.target, this.startTime, Array.from(this._startPoints.values()).sort(function (_) { return _.pointerId; }), Array.from(this._movePoints.values()).sort(function (_) { return _.pointerId; }), this.edgeDistance);
        };
        return GestureRecognizer;
    }());

    var GestureRecognizerWrapper = /** @class */ (function () {
        function GestureRecognizerWrapper(element, recognizers, edgeDistance, enable, preventDefault, stopPropagation) {
            if (edgeDistance === void 0) { edgeDistance = 96; }
            if (enable === void 0) { enable = true; }
            if (preventDefault === void 0) { preventDefault = true; }
            if (stopPropagation === void 0) { stopPropagation = true; }
            var _this = this;
            this.element = element;
            this.recognizers = recognizers;
            this.edgeDistance = edgeDistance;
            this.enable = enable;
            this.preventDefault = preventDefault;
            this.stopPropagation = stopPropagation;
            this.gestureRecognizer = new GestureRecognizer(recognizers, edgeDistance, enable, preventDefault, stopPropagation);
            element.addEventListener("pointerdown", function (e) { return _this.gestureRecognizer.pointerDown(e); });
            element.addEventListener("pointermove", function (e) { return _this.gestureRecognizer.pointerMove(e); });
            element.addEventListener("pointerup", function (e) { return _this.gestureRecognizer.pointerUp(e); });
            element.addEventListener("pointerleave", function (e) { return _this.gestureRecognizer.pointerLeave(e); });
        }
        return GestureRecognizerWrapper;
    }());

    exports.GestureEventArgs = GestureEventArgs;
    exports.GestureRecognizer = GestureRecognizer;
    exports.GestureRecognizerWrapper = GestureRecognizerWrapper;
    exports.LongPressGestureRecognizer = LongPressGestureRecognizer;
    exports.PanGestureRecognizer = PanGestureRecognizer;
    exports.PinchGestureRecognizer = PinchGestureRecognizer;
    exports.RotateGestureRecognizer = RotateGestureRecognizer;
    exports.SwipeGestureRecognizer = SwipeGestureRecognizer;
    exports.TapGestureRecognizer = TapGestureRecognizer;

}));
//# sourceMappingURL=liyanjie.gestures.umd.js.map
