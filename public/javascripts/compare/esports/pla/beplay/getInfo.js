let request = require("request");


module.exports.getInfoByCid = function (cid, cb) {
    let options = {
        method: 'POST',
        timeout: 30000,
        url: 'https://xj-mbs-manx.prdasbbwla1.com/zh-cn/Service/CentralService',
        qs: {GetData: '', ts: new Date().getTime()},
        headers:
            { 'postman-token': '01bf5c19-6be3-2e69-c154-99ec944f7998',
                'cache-control': 'no-cache',
                cookie: 'ASP.NET_SessionId=33y1fimkj5zaiu0nl3wwl2qg; mc=; sbmwl3-manx=2366639882.20480.0000; historyUrl=%2Fm%2Fzh-cn%2Fsports%2Fe-sports%2Fselect-competition%2Fdefault%3Fsc%3DABGBEB%26theme%3DKZing; timeZone=480; settingProfile=OddsType=2&NoOfLinePerEvent=1&SortBy=1&AutoRefreshBetslip=True; opCode=XJ0001; lobbyUrl=localhost; logoutUrl=localhost; ASP.NET_SessionId=33y1fimkj5zaiu0nl3wwl2qg; mc=; sbmwl3-manx=2366639882.20480.0000; timeZone=480; settingProfile=OddsType=2&NoOfLinePerEvent=1&SortBy=1&AutoRefreshBetslip=True; opCode=XJ0001; lobbyUrl=localhost; logoutUrl=localhost; historyUrl=%2Fm%2Fzh-cn%2Fsports%2Fe-sports%2Fselect-competition%2Fdefault%3Fsc%3DABGBEB%26theme%3DKZing%7C%2Fm%2Fzh-cn%2Fsports%2F%7C%2Fm%2Fzh-cn%2Fsports%2Fe-sports%2Fselect-competition%2Fdefault%3Fsc%3DABGAHA%7C%2Fm%2Fzh-cn%2Fsports%2Fe-sports%2Fcompetition%2Ffull-time-asian-handicap-and-over-under%3Fsc%3DABGBEB%26competitionids%3D51527',
                'accept-language': 'zh-CN,zh;q=0.9',
                referer: 'https://xj-mbs-manx.prdasbbwla1.com/m/zh-cn/sports/e-sports/competition/full-time-asian-handicap-and-over-under?sc=ABGBEB&competitionids=51527',
                'content-type': 'application/x-www-form-urlencoded',
                'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
                'x-requested-with': 'XMLHttpRequest',
                origin: 'https://xj-mbs-manx.prdasbbwla1.com',
                accept: '*/*' },
        form: {
            CompetitionID: -1,
            IsEventMenu: false,
            IsFirstLoad: false,
            IsMobile: true,
            LiveCenterEventId: 0,
            LiveCenterSportId: 1,
            SportID: 1,
            VersionH: '1:0,2:0,7:0,8:0,9:0,13:0,16:0,21:0,23:0,26:0',
            oCompetitionId: cid,
            oEventIds: 0,
            oIsFirstLoad: false,
            oPageNo: 0,
            oSortBy: 1,
            reqUrl: '/m/zh-cn/sports/e-sports/competition/full-time-asian-handicap-and-over-under?competitionids=' + cid,
        },

    };

    request(options, function (error, response, body) {
        try {
           // console.log(body)
            if (error)
            {

                console.log("manx 系列赛"+cid+"获取失败");
                console.error(error.code);
                cb();
            }
            else {
                let panKous = [];
                let data = JSON.parse(body);
                let series = data.mod.d.c;

                for (let i in series) {

                    let matches = series[i].e;

                    let matchName = series[i].n;
                    for (let j in matches) {
                        let ts = new Date(matches[j].edt).getTime();
                        let duYingPanKou = matches&&matches[j]&&matches[j].o&&matches[j].o.ml;
                        if (duYingPanKou) {

                            let hTeamPeiLv = duYingPanKou[1];
                            let vTeamPeiLv = duYingPanKou[3];
                            let hTeamName = matches[j].i[0];
                            let vTeamName = matches[j].i[1];

                            panKous.push({
                                name:matchName,
                                ts:ts,
                                dy: [
                                    {
                                        teamName: hTeamName,
                                        pei: hTeamPeiLv
                                    },
                                    {
                                        teamName: vTeamName,
                                        pei: vTeamPeiLv
                                    }
                                ]
                            })
                        }


                    }

                }

                //console.log(JSON.stringify(panKous))

                cb(panKous);

            }

        }catch (e) {
            console.error(e)
        }


    });

}

module.exports.getESportsCids = function (callback) {

    let options = {
        method: 'POST',
        timeout: 50000,
        url: 'https://xj-mbs-manx.prdasbbwla1.com/zh-cn/Service/CentralService',
        qs: {GetData: '', ts:new Date().getTime()},
        headers:
            { 'postman-token': '9a52669f-be6a-e1e3-e4e1-a923861574be',
                'cache-control': 'no-cache',
                cookie: 'ASP.NET_SessionId=33y1fimkj5zaiu0nl3wwl2qg; mc=; sbmwl3-manx=2366639882.20480.0000; historyUrl=%2Fm%2Fzh-cn%2Fsports%2Fe-sports%2Fselect-competition%2Fdefault%3Fsc%3DABGBEB%26theme%3DKZing; timeZone=480; settingProfile=OddsType=2&NoOfLinePerEvent=1&SortBy=1&AutoRefreshBetslip=True; opCode=XJ0001; lobbyUrl=localhost; logoutUrl=localhost',
                'accept-language': 'zh-CN,zh;q=0.9',
                referer: 'https://xj-mbs-manx.prdasbbwla1.com/m/zh-cn/sports/e-sports/select-competition/default?sc=ABGBEB&theme=KZing',
                'content-type': 'application/x-www-form-urlencoded',
                'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
                'x-requested-with': 'XMLHttpRequest',
                'x-devtools-emulate-network-conditions-client-id': '232963AB857EAB78AB85C8B0BBA9DA7F',
                origin: 'https://xj-mbs-manx.prdasbbwla1.com',
                accept: '*/*' },
        form: {
            CompetitionID: -1,
            IsEventMenu: false,
            IsFirstLoad: true,
            IsMobile: true,
            LiveCenterEventId: 0,
            LiveCenterSportId: 1,
            SportID: 1,
            VersionH: '1:0,2:0,7:0,8:0,9:0,13:0,16:0,21:0,23:0,26:0',
            oCompetitionId: 0,
            oEventIds: 0,
            oIsFirstLoad: true,
            oPageNo: 0,
            oSortBy: 1,
            reqUrl: '/m/zh-cn/sports/e-sports/select-competition/default?sc=ABGAHA',
        },
    };

    request(options, function (error, response, body) {
        try {
            if (error) {
                console.error(error);
                return;

            }

            let ids = [];
            let data;
            try {
                data = JSON.parse(body);

            } catch (e) {
                console.error(e);
                return;
            }


            for (let i in data.mod.cm) {
                let series = data.mod.cm[i];
                let matches = series.c;
                for (let j in matches) {
                    ids.push(matches[j].id);
                }
            }

            callback(ids);
        }catch (e) {
            console.error(e)
        }


    });

}

