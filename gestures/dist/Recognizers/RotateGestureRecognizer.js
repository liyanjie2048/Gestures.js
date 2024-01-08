var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
import { RotateGestureEventArgs } from "../EventArgs/RotateGestureEventArgs";
import { calcAngle } from "../Extensions";
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
export { RotateGestureRecognizer };
//# sourceMappingURL=RotateGestureRecognizer.js.map