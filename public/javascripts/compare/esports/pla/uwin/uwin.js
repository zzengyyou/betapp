let request = require("request");
let matches = {};
let ids = [];
let page =1 ;
let result = [];
let idIndex = 0;

module.exports.getMatchInfoByIds = function (callbackFromGetPage) {

    let id = ids[idIndex];
    console.log("1 getMatchInfoByIds---",id)

    let me = this;
    if(id){

        let options = {
            method: 'GET',
            url: 'https://www.uwin168.net/uwin/Bookapp/MarketList',
            qs: {v: 3, id: id},
        };

        request(options, function (error, response, body) {
            try {

                let markets = JSON.parse(body).data.markets;
                let oddList = JSON.parse(body).data.odd_lists;
                for (let key in markets) {
                    if (markets[key].Name == "谁将赢得比赛"&&markets[key].Visible) {
                        let leftId = markets[key].odds.left[0];
                        let rightId = markets[key].odds.right[0];
                        let leftData = oddList[leftId];
                        let rightData = oddList[rightId];
                        if (leftData && rightData) {

                            let matchData = matches[id]||{};
                           // console.log(matchData);
                            try {
                                if ((new Date().getTime() / 1000 - matchData.StartTimeInt < -300)) {


                                    console.log(matchData.LeagueName)

                                    let name = matchData.LeagueName;

                                    let res = {
                                        name: name,
                                        ts: matchData.StartTimeInt*1000,
                                        time:matchData.StartTime,
                                        dy: [

                                            {
                                                teamName: leftData.Title,
                                                pei: leftData.Value
                                            },
                                            {
                                                teamName: rightData.Title,
                                                pei: rightData.Value
                                            }
                                        ]
                                    }


                                    result.push(res);



                                } else {

                                }
                            }catch (e) {
                                console.error("id---",id);
                                console.error("matchdata---")

                            }



                        }

                    }
                }


            } catch (e) {
                console.error(e);
            }
            idIndex++;
            me.getMatchInfoByIds(callbackFromGetPage);

        });

    } else{

        callbackFromGetPage(result);
    }
}

module.exports.getPageData = function (callbackFromGetJson) {

    console.log("1 getPageData")

    let options = {
        method: 'GET',
        url: 'https://www.uwin168.net/uwin/Bookapp/List?v=2&d=1&cid=0&p='+page,
    };
    let matchIndex = 0;
    let me = this;


    request(options, function (error, response, body) {
        try {
            let matchIds = JSON.parse(body).data.records;
            let  matchesData = JSON.parse(body).data.matches;


            if(matchIds.length>0){
                ids = ids.concat(matchIds);
                matches = Object.assign(matches,matchesData);
                page++;
                me.getPageData(callbackFromGetJson)
            }else {
                console.log(ids.length)
                me.getMatchInfoByIds(callbackFromGetJson);
            }



        } catch (e) {
            console.error(e);
        }


    });
}

module.exports.getJson = function (callbackTotal) {
      this.getPageData(function (res) {
          callbackTotal(res)
      })

}