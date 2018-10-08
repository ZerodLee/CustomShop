"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// const moment = require('../asset/js/moment.min.js')
// import { Moment } from '../asset/js/moment.min'
var moment = __importStar(require("../asset/js/moment.min"));
var CountDown = /** @class */ (function () {
    function CountDown() {
    }
    CountDown.prototype.setCountDown = function () {
        console.log('moment', moment);
    };
    return CountDown;
}());
exports.CountDown = CountDown;
