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
import { SwipeGestureEventArgs } from "../EventArgs/SwipeGestureEventArgs";
import { GestureDirection } from "../GestureDirection";
var SwipeGestureRecognizer = /** @class */ (function () {
    function SwipeGestureRecognizer(direction, maxDuration, minDistance) {
        if (direction === void 0) { direction = GestureDirection.horizontal; }
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
                    case GestureDirection.up:
                        e.target.dispatchEvent(this._createEventArgs("swipeup", e));
                        break;
                    case GestureDirection.down:
                        e.target.dispatchEvent(this._createEventArgs("swipedown", e));
                        break;
                    default:
                }
            }
            if (Math.abs(e.distanceX) >= this.minDistance) {
                switch (e.direction) {
                    case GestureDirection.left:
                        e.target.dispatchEvent(this._createEventArgs("swipeleft", e));
                        break;
                    case GestureDirection.right:
                        e.target.dispatchEvent(this._createEventArgs("swiperight", e));
                        break;
                    default:
                }
            }
        }
    };
    SwipeGestureRecognizer.prototype._createEventArgs = function (type, e) {
        return new CustomEvent(type, { detail: new SwipeGestureEventArgs(type, e) });
    };
    return SwipeGestureRecognizer;
}());
export { SwipeGestureRecognizer };
//# sourceMappingURL=SwipeGestureRecognizer.js.map