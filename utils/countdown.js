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
    function CountDown(time, timeArr) {
        this.time = time;
        this.timeArr = timeArr;
        this.limitTime = time;
        this.limitTimes = timeArr;
    }
    CountDown.prototype.setCountDown = function () {
        //console.log('moment',moment)
        console.log('limitTime', this.limitTime);
    };
    CountDown.prototype.singleCountDown = function (limitTime) {
        var theLimitTime = limitTime ? limitTime : this.limitTime;
        var duration = theLimitTime * 1000 - new Date().getTime();
        duration = duration > 0 ? duration : 0;
        var toNow = moment.duration(duration);
        return {
            hours: this.formatNumber(Math.floor(toNow.as('hours'))),
            minutes: this.formatNumber(toNow.get('minutes')),
            seconds: this.formatNumber(toNow.get('seconds'))
        };
    };
    CountDown.prototype.manyCountDown = function () {
        var _this = this;
        var nowTimes = [];
        this.limitTimes.forEach(function (item) {
            nowTimes.push(_this.singleCountDown(item));
        });
        return nowTimes;
    };
    CountDown.prototype.formatNumber = function (num) {
        var n = num.toString();
        return n[1] ? n : '0' + n;
    };
    return CountDown;
}());
exports.CountDown = CountDown;
