let beplay = require('./pla/beplay/beplay');
let bet365 = require('./pla/bet365/bet365');
let compareUtil = require('./compare');
let config = require('../../../../config');
let mailUtil = require('../../emailUtil');
let bet365Data = {plaName: "bet365-足球", data: []};
let beplayData = {plaName: "manx-足球", data: []};
let clearCount = 0;
;
let timeInterval = require('../../../../config').INTERVAL * 60 * 1000;
timeInterval < 100000 ? timeInterval = 100000 : null;

const fs = require("fs");

module.exports.onDataRetuned = function (data) {
    compareUtil.compareTwoData(data, bet365Data);
    compareUtil.compareTwoData(data, beplayData);


    if (bet365Data.data.length > 0 && beplayData.data.length > 0) {
        console.log("清空所有数据");
        clearCount++;

        beplayData.data = [];
        bet365Data.data = [];

    }


}
let me =this;
module.exports.runFootBallOnce = function () {
    beplay.getFootballData(function (data) {

        console.log("足球 万博 数据获取完毕 比赛场次", data.length);
        // fs.writeFile("./manx.txt",JSON.stringify(data), error => {
        //     if (error) return console.log("写入文件失败,原因是" + error.message);
        //     console.log("写入成功");
        // });
        beplayData.data = data;
        me.onDataRetuned(beplayData);


    })
    bet365.getFootballData(function (data) {

        console.log("足球 bet365 数据获取完毕 比赛场次", data.length);
        // fs.writeFile("./bet365.txt",JSON.stringify(data), error => {
        //     if (error) return console.log("写入文件失败,原因是" + error.message);
        //     console.log("写入成功");
        // });
        bet365Data.data = data;
        me.onDataRetuned(bet365Data);

    })
}







