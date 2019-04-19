let beplay = require('./pla/beplay/beplay');

let ydj = require('./pla/ydj/ydj');

let uwin = require('./pla/uwin/uwin');
let compareUtil = require('./compare');


let bet365Data = {plaName: "bet365", data: []};
let beplayData = {plaName: "manx", data: []};

let bet9Data = {plaName: "九州", data: []};

let ydjData =  {plaName: "亿电竞", data: []};
let uwinData =  {plaName: "U赢", data: []};

let clearCount = 0;
let colors = require('colors');


let me =this;
module.exports.onDataRetuned = function (data) {
    compareUtil.compareTwoData(data, bet365Data);
    compareUtil.compareTwoData(data, beplayData);
    compareUtil.compareTwoData(data, ydjData);
    compareUtil.compareTwoData(data, uwinData);

    if (beplayData.data.length > 0   && ydjData.data.length>0  ) {

        clearCount++;
        beplayData.data = [];
        bet365Data.data = [];
        ydjData.data = [];
        uwinData.data = [];

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
}







