let sum = 0;
let mailUtil = require('../../emailUtil');
let SHUI_LINE = require('../../../../config').SHUI_LINE;
let historyTitles = {};
let config = require('../../../../config');
let email_interval = Math.ceil(config.EMAIL_INTERVAL * config.INTERVAL / 3);
let hostname = require('os').hostname;
let pinyin = require("pinyin");
let lowestShui = 100;
let shuiList = [];
let stringSimilarity = require('string-similarity');
module.exports.compareTwoTeamName = function (name1, name2) {

    let re = /[\u4e00-\u9fa5]/g;
    let str1 = name1.replace(re, "").toLowerCase();
    let str2 = name2.replace(re, "").toLowerCase();
    str1.length > 1 ? str1 = str1.toLowerCase() : str1 = name1.toLowerCase();
    str2.length > 1 ? str2 = str2.toLowerCase() : str2 = name2.toLowerCase();
    let pinyin1 = pinyin(name1, {
        style: pinyin.STYLE_NORMAL, // 设置拼音风格
        heteronym: false
    }).join("");
    let pinyin2 = pinyin(name2, {
        style: pinyin.STYLE_NORMAL, // 设置拼音风格
        heteronym: false
    }).join("");

    return str1 == str2|| stringSimilarity.compareTwoStrings(str1, str2) > 0.7||stringSimilarity.compareTwoStrings(pinyin1, pinyin2) > 0.7

}

module.exports.compareTwoMatchTime = function (time1, time2) {



    return time1.indexOf(time2)>-1|| time2.indexOf(time1)>-1
}


module.exports.compareTwoData = function (dataOne, dataTwo, onCompareSuccess) {
    if (dataOne.data.length < 1 || dataTwo.data.length < 1 || dataOne.plaName == dataTwo.plaName) {
        return
    }
    console.log("比较", dataOne.plaName, "和", dataTwo.plaName, "的数据")
    let data1 = dataOne.data;
    let data2 = dataTwo.data;
    shuiList =[];
    let count = 0;
    let me = this;
    data1 && data1.map(function (item1, index1) {
        data2 && data2.map(function (item2, index2) {
            try {
                if(me.compareTwoMatchTime(item1.time,item2.time)){
                    let item1Length = item1.dy ? item1.dy.length : 0;
                    let item2Length = item2.dy ? item2.dy.length : 0;
                    for (let pankouIndex1 = 0; pankouIndex1 < item1Length; pankouIndex1++) {
                        let pankou1 = item1.dy[pankouIndex1];
                        for (let pankouIndex2 = 0; pankouIndex2 < item2Length; pankouIndex2++) {
                            let pankou2 = item2.dy[pankouIndex2];
                            let drawPei = item1.drawPei>item2.drawPei? item1.drawPei: item2.drawPei;
                            let drawPeiPlaName = item1.drawPei>item2.drawPei? dataOne.plaName: dataTwo.plaName;
                            if (me.compareTwoTeamName(pankou1.teamName, pankou2.teamName)) {
                                let pankouOtherIndex1;
                                let pankouOtherIndex2;
                                pankouIndex1 == 0 ? pankouOtherIndex1 = 1 : pankouOtherIndex1 = 0;
                                pankouIndex2 == 0 ? pankouOtherIndex2 = 1 : pankouOtherIndex2 = 0;
                                let ortherPankou1 = item1.dy[pankouOtherIndex1];
                                let ortherPankou2 = item2.dy[pankouOtherIndex2];
                                if (me.compareTwoTeamName(ortherPankou1.teamName, ortherPankou2.teamName)) {


                                    if(!me.compareTwoTeamName(pankou1.teamName, ortherPankou2.teamName) && !me.compareTwoTeamName(pankou2.teamName,ortherPankou1.teamName)){
                                        let pei1 = pankou1.pei > pankou2.pei ? pankou1.pei : pankou2.pei;
                                        let pei2 = ortherPankou1.pei > ortherPankou2.pei ? ortherPankou1.pei : ortherPankou2.pei;
                                        count++;
                                        pankouIndex1++;
                                        let shuilv = ((1 / pei1 + 1 / pei2 +1/drawPei)-1).toFixed(4);
                                        shuilv<lowestShui?lowestShui = shuilv:null;
                                        shuiList.indexOf(shuilv)>-1?null:shuiList.push(shuilv);
                                        if ((1 / pei1 + 1 / pei2 +1/drawPei)-1 < SHUI_LINE) {

                                            let shui = (1 / pei1 + 1 / pei2 +1/drawPei - 1);
                                            let matchName1 = item1.name ;
                                            let matchName2 = item2.name;
                                            console.log("匹配到",item1);
                                            console.log("匹配到",item2);
                                            console.log(pei1,"-----",pei2,"-----",drawPei)
                                            console.log((1 / pei1 + 1 / pei2 +1/drawPei)-1)

                                            let fupankou365 = {};
                                            let fupankouManx = {};
                                            pankou1.pei > pankou2.pei ? fupankou365 = pankou1 : fupankouManx = pankou2;
                                            ortherPankou1.pei > ortherPankou2.pei ? fupankou365 = ortherPankou1 : fupankouManx = ortherPankou2;

                                            // console.log(dataOne.plaName, '=', fupankouManx);
                                            // console.log(dataTwo.plaName, "=", fupankou365);
                                            // console.log("shui", (1 / pei1 + 1 / pei2 - 1));
                                            let xiazhu365 = 1000;
                                            let xiazhuManx = xiazhu365 * fupankou365.pei / fupankouManx.pei;
                                            let title = ((shui * 100).toFixed(2)) + "%===" + matchName1;
                                            let content = dataOne.plaName +"---"+ matchName1+"---" + fupankou365.teamName + "----赔率----" + fupankou365.pei + '<br/>';
                                            content += dataTwo.plaName+"---" + matchName2+ "---" + fupankouManx.teamName + "----赔率----" + fupankouManx.pei + '<br/>';
                                            content += drawPeiPlaName +"----平局赔率----" + drawPei + '<br/>';
                                            if (!historyTitles[title]) {
                                                    mailUtil.sendEmail(title, content);
                                                    historyTitles[title] = true;

                                            } else {
                                                console.log("本条邮件已发送过 本次不发送了");
                                            }
                                        }
                                    }


                                } else {
                                    //console.log("分析以下两个名字是否一样---",ortherPankou1.teamName,"---",ortherPankou2.teamName);

                                }


                            }
                        }


                    }
                }

            } catch (e) {
                console.error(e);
            }


        })

    })


    if (sum % 60 == 0) {

        console.log("清空历史发送邮件列表");
        historyTitles = {};
    }
    if (sum % 150 == 0) {
        mailUtil.sendEmail("betApp足球", "betApp足球正常运行中...运行环境" + hostname);
    }
    sum++;

    console.log("本次 ", dataOne.plaName, " 和 ", dataTwo.plaName, " 共匹配正确了", shuiList.length, "场" + "---这是第", sum, "轮匹配。最低水率---",lowestShui);
    shuiList= [] ;
    lowestShui = 100;
    console.log(new Date().toLocaleDateString(), "---", new Date().toLocaleTimeString());
}


