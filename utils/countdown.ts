// const moment = require('../asset/js/moment.min.js')
// import { Moment } from '../asset/js/moment.min'
import * as moment from '../asset/js/moment.min';

class CountDown {
    limitTime:number
    limitTimes:number[]
    constructor(public time:number,public timeArr:Array<number>){
        this.limitTime = time
        this.limitTimes = timeArr
    }
    setCountDown(){
        //console.log('moment',moment)
        console.log('limitTime',this.limitTime)
    }
    singleCountDown(limitTime?:number):object{
        let theLimitTime = limitTime?limitTime:this.limitTime
        let duration = theLimitTime*1000 - new Date().getTime()
        duration = duration>0 ? duration : 0
        let toNow = moment.duration(duration)
        return {
            hours: this.formatNumber(Math.floor(toNow.as('hours'))),
            minutes: this.formatNumber(toNow.get('minutes')),
            seconds: this.formatNumber(toNow.get('seconds'))
        }
    }
    manyCountDown():object[]{
        let nowTimes:object[] = []
        this.limitTimes.forEach(item => {
            nowTimes.push(this.singleCountDown(item))
        })
        return nowTimes
    }
    formatNumber(num:number):string{
        let n = num.toString()
        return n[1] ? n : '0' + n
      }
}
export { CountDown }