let sum = 0;
let mailUtil = require('../../emailUtil');
let SHUI_LINE = require('../../../../config').SHUI_LINE;
let SHUI_LINE_2 =  require('../../../../config').SHUI_LINE_2;
let historyTitles = {};
let config = require('../../../../config');
let email_interval = Math.ceil(config.EMAIL_INTERVAL * config.INTERVAL / 3);
let hostname = require('os').hostname;
let lowestShui = 1000;
let stringSimilarity = require('string-similarity');
module.exports.compareTwoTeamName = function (name1, name2) {

    let re = /[\u4e00-\u9fa5]/g;
    let str1 = name1.replace(re, "").toLowerCase().replace("-", "").replace(".", "").replace(" ", "");
    let str2 = name2.replace(re, "").toLowerCase().replace("-", "").replace(".", "").replace(" ", "");

    str1.length > 1 ? str1 = str1.toLowerCase() : str1 = name1.toLowerCase();
    str2.length > 1 ? str2 = str2.toLowerCase() : str2 = name2.toLowerCase();

    let upperText1 = this.getUpperChar(name1);
    let upperText2 = this.getUpperChar(name2);
    let similarity = false;
    if (upperText1.length > 1 && upperText2.length > 1 && (upperText2.indexOf(upperText1) > -1 || upperText1.indexOf(upperText2) > -1)) {

        similarity = true;
    }
    return str2.indexOf(str1) > -1 || str1.indexOf(str2) > -1 || stringSimilarity.compareTwoStrings(str1, str2) > 0.5 || this.compareTwoShortName(name1, name2)

}
module.exports.compareTwoShortName = function (name1, name2) {
    let strLong = "";
    let strShort = "";

    if (name1.length > name2.length) {
        strLong = name1.toLowerCase();
        strShort = name2.toLowerCase();
    } else {
        strLong = name2.toLowerCase();
        strShort = name1.toLowerCase();
    }

    if (strLong.length > 2 && strShort.length > 1 ) {
        strLong = strLong.replace("-", "").replace(".", "").replace(" ", "");
        strShort = strShort.replace("-", "").replace(".", "").replace(" ", "");
        let currentIndex = -1;
        for (let i = 0; i < strShort.length; i++) {
            let c = strShort.charAt(i);
            if (strLong.indexOf(c) > currentIndex) {
                currentIndex = strLong.indexOf(c);
            } else {
                return false
            }
        }
        return true


    }
    return false;


}
module.exports.getUpperChar = function (str) {
    let text = " ";
    for (let i = 0; i < text.length; i++) {
        let c = str.charAt(i);
        if (c === c.toUpperCase()) {
            text += c;
        }
    }
    return text;

}
module.exports.compareTwoData = function (dataOne, dataTwo, onCompareSuccess) {
    if (dataOne.data.length < 1 || dataTwo.data.length < 1 || dataOne.plaName == dataTwo.plaName) {
        return
    }
    console.log("比较", dataOne.plaName, "和", dataTwo.plaName, "的数据")
    let data1 = dataOne.data;
    let data2 = dataTwo.data;

    let count = 0;
    let me = this;
    data1 && data1.map(function (item1, index1) {
        data2 && data2.map(function (item2, index2) {

            try {
                let item1Length = item1.dy ? item1.dy.length : 0;
                let item2Length = item2.dy ? item2.dy.length : 0;
                for (let pankouIndex1 = 0; pankouIndex1 < item1Length; pankouIndex1++) {
                    let pankou1 = item1.dy[pankouIndex1];
                    for (let pankouIndex2 = 0; pankouIndex2 < item2Length; pankouIndex2++) {
                        let pankou2 = item2.dy[pankouIndex2];
                        if (me.compareTwoTeamName(pankou1.teamName, pankou2.teamName)) {
                            let pankouOtherIndex1;
                            let pankouOtherIndex2;
                            pankouIndex1 == 0 ? pankouOtherIndex1 = 1 : pankouOtherIndex1 = 0;
                            pankouIndex2 == 0 ? pankouOtherIndex2 = 1 : pankouOtherIndex2 = 0;
                            let ortherPankou1 = item1.dy[pankouOtherIndex1];
                            let ortherPankou2 = item2.dy[pankouOtherIndex2];
                            if (me.compareTwoTeamName(ortherPankou1.teamName, ortherPankou2.teamName)) {


                                let pei1 = pankou1.pei > pankou2.pei ? pankou1.pei : pankou2.pei;
                                let pei2 = ortherPankou1.pei > ortherPankou2.pei ? ortherPankou1.pei : ortherPankou2.pei;
                                count++;
                                pankouIndex1++;
                                item1.is = true;
                                item2.is = true;
                                let tsDistance = Math.abs(item1.ts-item2.ts);
                                let todayTsDis = Math.abs(item1.ts - new Date().getTime())
                                // console.log("匹配到",dataOne.plaName,ortherPankou1,"vs",pankou1);
                                // console.log("匹配到",dataTwo.plaName,ortherPankou2,"vs",pankou2)
                                //  console.log((1/pei1+1/pei2-1))
                                let shuiLv = (1 / pei1 + 1 / pei2 - 1);

                                if ((1 / pei1 + 1 / pei2 - 1) < SHUI_LINE && shuiLv > -0.2&&tsDistance<3590000&&todayTsDis<98000000) {
                                    shuiLv < lowestShui  ? lowestShui = shuiLv : null;
                                    console.log("---------------", (1 / pei1 + 1 / pei2 - 1))
                                    let shui = (1 / pei1 + 1 / pei2 - 1);
                                    let matchName = item1.name || item2.name;
                                    let fupankou365 = {};
                                    let fupankouManx = {};
                                    pankou1.pei > pankou2.pei ? fupankou365 = pankou1 : fupankouManx = pankou2;
                                    ortherPankou1.pei > ortherPankou2.pei ? fupankou365 = ortherPankou1 : fupankouManx = ortherPankou2;
                                    console.log(matchName);
                                    console.log(dataOne.plaName, '=', fupankou365);
                                    console.log(dataTwo.plaName, "=", fupankouManx);
                                    console.log("shui", (1 / pei1 + 1 / pei2 - 1));
                                    let xiazhu365 = 1000;
                                    let xiazhuManx = xiazhu365 * fupankou365.pei / fupankouManx.pei;
                                    let title = `(${dataOne.plaName+"||"+dataTwo.plaName})@`+((shui * 100).toFixed(2))+"%  "+((item1.time||item2.time)) + "--" + matchName;
                                    let keyWord = "---" + shui + "---";
                                    let content = dataOne.plaName + "---" + fupankou365.teamName + "----赔率----" + fupankou365.pei + '<br/>';
                                    content += dataTwo.plaName + "---" + fupankouManx.teamName + "----赔率----" + fupankouManx.pei + '<br/>';
                                    content += "比赛日期: "+(item1.time||item2.time);
                                    if (!historyTitles[keyWord]) {
                                        if (fupankou365.teamName != fupankouManx.teamName&&fupankou365.teamName&&fupankouManx.teamName&&!me.compareTwoTeamName(fupankou365.teamName, fupankouManx.teamName)) {
                                            mailUtil.sendEmail(title, content)
                                            historyTitles[keyWord] = true;
                                        }
                                    } else {
                                        console.log("本条邮件已发送过 本次不发送了");
                                    }
                                }
                            } else {
                                //console.log("分析以下两个名字是否一样---",ortherPankou1.teamName,"---",ortherPankou2.teamName);

                            }


                        }
                    }


                }
            } catch (e) {
                console.error(e);
            }


        })

    })



    if (sum % 200 == 0) {

        console.log("清空历史发送邮件列表");
        historyTitles = {};
    }

    if (sum % 400 == 0 && !config.isDev) {


    }
    sum++;
    console.log("本次 ", dataOne.plaName, " 和 ", dataTwo.plaName, " 共匹配正确了", count, "场" + "最低水率:" + lowestShui + "---这是第", sum, "轮匹配");

    console.log(new Date().toLocaleDateString(), "---", new Date().toLocaleTimeString());

}


