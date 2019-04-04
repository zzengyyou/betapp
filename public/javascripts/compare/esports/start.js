let beplay = require('./pla/beplay/beplay');
let bet365 = require('./pla/bet365/bet365');
let bet9 = require('./pla/bet9/bet9');
let ope = require('./pla/ope/ope');
let ydj = require('./pla/ydj/ydj');
let im = require('./pla/im/im');
let uwin = require('./pla/uwin/uwin');
let compareUtil = require('./compare');
let config = require('../../../../config');
let mailUtil = require('../../emailUtil');
let ggbet = require('./pla/ggbet/getInfo');

let bet365Data = {plaName: "bet365", data: []};
let beplayData = {plaName: "manx", data: []};

let bet9Data = {plaName: "九州", data: []};
let opeData = {plaName: "ope", data: []};
let ggbetData =  {plaName: "ggbetData", data: []};
let ydjData =  {plaName: "亿电竞", data: []};
let uwinData =  {plaName: "U赢", data: []};
let imData =  {plaName: "IM", data: []};
let clearCount = 0;
let colors = require('colors');


let me =this;
module.exports.onDataRetuned = function (data) {
    compareUtil.compareTwoData(data, bet365Data);
    compareUtil.compareTwoData(data, beplayData);
    compareUtil.compareTwoData(data, opeData);
    compareUtil.compareTwoData(data, bet9Data);
    compareUtil.compareTwoData(data, ggbetData);
    compareUtil.compareTwoData(data, ydjData);
    compareUtil.compareTwoData(data, uwinData);
    compareUtil.compareTwoData(data, imData);
    if (beplayData.data.length > 0   && ydjData.data.length>0  ) {

        clearCount++;
        opeData.data = [];
        beplayData.data = [];
        bet365Data.data = [];
        bet9Data.data = [];
        ggbetData.data = [];
        ydjData.data = [];
        uwinData.data = [];
        imData.data = [];
    }


}

module.exports.runEsportsOnce = function () {
    beplay.getESportsData(function (data) {
        console.log("万博 电子竞技 数据获取完毕 比赛场次".red, data.length);
        beplayData.data = data;
        me.onDataRetuned(beplayData);
    })

    ydj.getJson(function (data) {

        console.log("ydj 电子竞技 数据获取完毕 比赛场次".red, data.length);
        ydjData.data = data;
        me.onDataRetuned(ydjData);

    })
    // im.getJson(function (data) {
    //
    //     console.log("im 电子竞技 数据获取完毕 比赛场次".red, data.length);
    //     imData.data = data;
    //     me.onDataRetuned(imData);
    //
    // })

    // uwin.getJson(function (data) {
    //
    //     console.log("uwin 电子竞技 数据获取完毕 比赛场次".red, data.length);
    //     uwinData.data = data;
    //     me.onDataRetuned(uwinData);
    //
    // })

    // bet365.getESportsData(function (data) {
    //
    //     console.log("bet365 电子竞技 数据获取完毕 比赛场次".red, data.length);
    //     bet365Data.data = data;
    //     me.onDataRetuned(bet365Data);
    //
    // })

    // bet9.getBet9Data(function (data) {
    //     console.log("bet9 数据获取完毕 比赛场次", data.length);
    //     bet9Data.data = data;
    //     me.onDataRetuned(bet9Data);
    // })

    // ope.getOPEData(function (data) {
    //
    //
    //     console.log("ope 数据获取完毕 比赛场次", data.length);
    //     opeData.data = data;
    //     me.onDataRetuned(opeData);
    // })
}







