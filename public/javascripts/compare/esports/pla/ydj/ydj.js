let request = require("request");
const fs = require("fs");
let util = require('../../../../../../util');
module.exports.getJson = function (callback) {

    let options = {
        method: 'POST',
        url: 'https://api.hces888.com/api/game/races',
        headers:
            {

                'cache-control': 'no-cache',
                'accept-language': 'zh-CN,zh;q=0.9',
                referer: 'https://www.hces888.com/',
                'content-type': 'application/x-www-form-urlencoded',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
                origin: 'https://www.hces888.com',
                accept: 'application/json, text/plain, */*'
            },
        form: {
            gameID: 0,
            lang: "zh-CN",
            raceID: "",
            raceStatus: 0,
            raceType: 1,
            round: 0,
            token: "",
        }
    };

    request(options, function (error, response, body) {
        if (error) {

            console.error(error)
        }

        try {
            let list = JSON.parse(body).data;
            let array = [];


            // fs.writeFile("./ray.txt", JSON.stringify(list), error => {
            //     if (error) return console.log("写入文件失败,原因是" + error.message);
            //     console.log("写入成功");
            // });


            let count = 0;
            list.map(function (item, index) {


                let ts = new Date(item.opentime).getTime();
                let pan = {
                    name: item.match_name,
                    time: item.opentime,
                    ts: ts,

                };
                let oddsInfoFirst =  item.handicaps[0] &&  item.handicaps[0].handicapOdds;
                if (oddsInfoFirst && oddsInfoFirst[0] && oddsInfoFirst[1] && (oddsInfoFirst[0].part_name == "[a]" || oddsInfoFirst[0].part_name == "[b]")){
                    pan.dy = [
                        {
                            teamName: item.team1.name,
                            pei: oddsInfoFirst[0].part_odds / 1000
                        },
                        {
                            teamName: item.team2.name,
                            pei: oddsInfoFirst[1].part_odds / 1000
                        }
                    ];

                }


                item.handicaps && item.handicaps.map(function (pankou) {
                    let oddsInfo = pankou && pankou.handicapOdds;

                    // if(pankou.name == "比赛让分盘"&&oddsInfo&&oddsInfo[0]&&oddsInfo[1]&&(oddsInfo[0].part_name.indexOf("-1.5")>-1||oddsInfo[0].part_name.indexOf("-0.5")>-1||oddsInfo[1].part_name.indexOf("-1.5")>-1||oddsInfo[1].part_name.indexOf("-0.5")>-1)){
                    //
                    //     pan.rf = [{
                    //         teamName: item.team1.name,
                    //         pei: oddsInfo[0].part_odds/1000,
                    //         rang: oddsInfo[0].part_name.indexOf("-1.5")>-1?true:false
                    //          },
                    //         {
                    //             teamName: item.team2.name,
                    //             pei: oddsInfo[1].part_odds/1000,
                    //             rang: oddsInfo[1].part_name.indexOf("-1.5")>-1?true:false
                    //         }]
                    //
                    // }


                    if ((pankou.name.indexOf("比赛获胜方") > -1) && oddsInfo && oddsInfo[0] && oddsInfo[1]) {

                        pan.dy = [
                            {
                                teamName: item.team1.name,
                                pei: oddsInfo[0].part_odds / 1000
                            },
                            {
                                teamName: item.team2.name,
                                pei: oddsInfo[1].part_odds / 1000
                            }
                        ];
                    }


                })
                if (pan.dy) {
                    array.push(pan)
                }


            })
            console.log(count);

            callback(array);
        } catch (e) {
            console.error(e)
        }


    });

}


getRoundOpps = function (index, round, info, cbf) {

    let options = {
        method: 'POST',
        url: 'https://api.hces888.com/api/game/race',
        headers:
            {
                'postman-token': '04ab8465-766e-6056-d3ce-28f14e44e5ed',
                'cache-control': 'no-cache',
                'accept-language': 'zh-CN,zh;q=0.9',
                referer: 'https://www.hces888.com',
                'content-type': 'application/x-www-form-urlencoded',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
                origin: 'https://www.hces888.com',
                accept: 'application/json, text/plain, */*'
            },
        form: {
            lang: "zh-CN",
            raceID: info.raceId,
            raceType: info.raceType,
            round: round,
            token: "",
        }
    };

    request(options, function (error, response, body) {


        if (error) {

            console.error(error)
        }


        try {
            let res = JSON.parse(body);
            console.log("----", res.data.handicaps.length)
            if (res.data.handicaps.length > 0) {

                res.data.handicaps.map(function (item) {
                    if (item.name == "单局获胜方") {
                        let oddData = item.handicapOdds;
                        cbf([{
                            teamName: res.data.team1.name,
                            pei: oddData[1].part_odds / 1000,
                        }, {
                            teamName: res.data.team2.name,
                            pei: oddData[0].part_odds / 1000,
                        }]);
                    }

                })


            } else {
                cbf();
            }

        } catch (e) {
            console.error(e)
        }


    });


}


getRoundData = function (data) {


    let index = 0;
    let round = 1;
    let cb = function (roundData) {
        console.log(roundData)
        util.sleep(1000);
        if (index >= data.length) {
            callback(data)
        } else if ((round < data[index].info.raceType) && roundData) {
            round++;
            data[index].dc.push(roundData)
            getRoundOpps(index, round, data[index].info, cb)
        } else {
            data[index].dc.push(roundData)
            index++;
            round = 1;
            getRoundOpps(index, round, data[index].info, cb)

        }

    }
    getRoundOpps(index, round, data[index].info, cb)


}