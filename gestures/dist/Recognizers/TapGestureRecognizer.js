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
import { TapGestureEventArgs } from "../EventArgs/TapGestureEventArgs";
import { calcDistance } from "../Extensions";
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
export { TapGestureRecognizer };
//# sourceMappingURL=TapGestureRecognizer.js.map