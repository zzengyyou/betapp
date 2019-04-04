let request = require("request");
let originData = [];
module.exports.getInfoByCid = function (cid, cb) {
    let options = {
        method: 'POST',
        timeout: 30000,
        url: 'https://xj-mbs-manx.prdasbbwla1.com/zh-cn/Service/CentralService',
        qs: {GetData: '', ts: new Date().getTime()},
        headers:
            {
                'postman-token': '57705c86-f4d3-aeac-1d29-26ca6d547636',
                'cache-control': 'no-cache',
                cookie: 'sbmwl3-manx=4094693130.20480.0000; ASP.NET_SessionId=lfxrnnhz0y1vlpl0dyi00g1l; mc=; timeZone=480; settingProfile=OddsType=2&NoOfLinePerEvent=1&SortBy=1&AutoRefreshBetslip=True; opCode=XJ0001; lobbyUrl=localhost; logoutUrl=localhost; historyUrl=%2Fm%2Fen-gb%2F%7C%2Fm%2Fzh-cn%7C%2Fm%2Fzh-cn%2Fsports%2Ffootball%2Fselect-competition%2Fdefault%3Fsc%3DABGCEE%7C%2Fm%2Fzh-cn%2Fsports%2Ffootball%2Fcompetition%2Ffull-time-asian-handicap-and-over-under%3Fsc%3DABGCEE%26competitionids%3D26726%7C%2Fm%2Fzh-cn%2Fsports%2Ffootball%2Fselect-competition%2Fdefault%3Fsc%3DABGCEE; sbmwl3-manx=4094693130.20480.0000; ASP.NET_SessionId=lfxrnnhz0y1vlpl0dyi00g1l; mc=; timeZone=480; settingProfile=OddsType=2&NoOfLinePerEvent=1&SortBy=1&AutoRefreshBetslip=True; opCode=XJ0001; lobbyUrl=localhost; logoutUrl=localhost; historyUrl=%2Fm%2Fen-gb%2F%7C%2Fm%2Fzh-cn%7C%2Fm%2Fzh-cn%2Fsports%2Ffootball%2Fselect-competition%2Fdefault%3Fsc%3DABGCEE%7C%2Fm%2Fzh-cn%2Fsports%2Ffootball%2Fcompetition%2Ffull-time-asian-handicap-and-over-under%3Fsc%3DABGCEE%26competitionids%3D26726%7C%2Fm%2Fzh-cn%2Fsports%2Ffootball%2Fselect-competition%2Fdefault%3Fsc%3DABGCEE%7C%2Fm%2Fzh-cn%2Fsports%2Ffootball%2Fcompetition%2Ffull-time-asian-handicap-and-over-under%3Fsc%3DABGCEE%26competitionids%3D26726',
                'accept-language': 'zh-CN,zh;q=0.9',
                referer: 'https://xj-mbs-manx.prdasbbwla1.com/m/zh-cn/sports/football/competition/full-time-asian-handicap-and-over-under?sc=ABGCEE&competitionids=26726',
                'content-type': 'application/x-www-form-urlencoded',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
                'x-requested-with': 'XMLHttpRequest',
                'x-devtools-emulate-network-conditions-client-id': '2C437356FF7E44BD5795E0C5F08C71C9',
                origin: 'https://xj-mbs-manx.prdasbbwla1.com',
                accept: '*/*'
            },
        form: {
            CompetitionID: -1,
            IsEventMenu: false,
            IsFirstLoad: false,
            IsMobile: true,
            LiveCenterEventId: 0,
            LiveCenterSportId: 1,
            SportID: 1,
            VersionH: '0',
            oCompetitionId: cid,
            oEventIds: 0,
            oIsFirstLoad: false,
            oPageNo: 0,
            oSortBy: 1,
            reqUrl: '/m/zh-cn/sports/football/competition/full-time-asian-handicap-and-over-under?competitionids=' + cid,
        },

    };

    request(options, function (error, response, body) {
        try {
            if (error) {

                console.log("manx 系列赛" + cid + "获取失败");
                console.error(error.code);
                cb();
            } else {
                let panKous = [];

                let data = JSON.parse(body);
                let series = data.mod.d.c;


                for (let i in series) {

                    let matches = series[i].e;
                    let matchName = series[i].n;


                    for (let j in matches) {
                        let duYingPanKou = matches[j].o['1x2'];
                        if(matches[j].cei.ctid ==0||matches[j].cei.ctid =='0'){
                            if (duYingPanKou) {
                                let time = matches[j].edt.split('T')[1];
                                let fulltime = matches[j].edt;
                                let hTeamPeiLv = duYingPanKou[1];
                                let vTeamPeiLv = duYingPanKou[3];
                                let drawPei = duYingPanKou[5];
                                let hTeamName = matches[j].i[0];
                                let vTeamName = matches[j].i[1];
                                panKous.push({
                                    drawPei:drawPei,
                                    time:time,
                                    fulltime:fulltime,
                                    name:matchName,
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

                }

                //console.log(JSON.stringify(panKous))
               // console.log(JSON.stringify(panKous));

                cb(panKous);

            }

        } catch (e) {
            console.error(e)
        }


    });

}


module.exports.getFootBallCids = function (callback) {

    let options = {
        method: 'POST',
        timeout: 80000,
        url: 'https://xj-mbs-manx.prdasbbwla1.com/zh-cn/Service/CentralService',
        qs: {GetData: '', ts: new Date().getTime()},
        headers:
            {
                'postman-token': '2915997f-be7a-99c2-581b-94c52176e72c',
                'cache-control': 'no-cache',
                cookie: 'sbmwl3-manx=4094693130.20480.0000; ASP.NET_SessionId=lfxrnnhz0y1vlpl0dyi00g1l; mc=; timeZone=480; settingProfile=OddsType=2&NoOfLinePerEvent=1&SortBy=1&AutoRefreshBetslip=True; opCode=XJ0001; lobbyUrl=localhost; logoutUrl=localhost; historyUrl=%2Fm%2Fen-gb%2F%7C%2Fm%2Fzh-cn%7C%2Fm%2Fzh-cn%2Fsports%2Ffootball%2Fselect-competition%2Fdefault%3Fsc%3DABGCEE%7C%2Fm%2Fzh-cn%2Fsports%2Ffootball%2Fcompetition%2Ffull-time-asian-handicap-and-over-under%3Fsc%3DABGCEE%26competitionids%3D26726%7C%2Fm%2Fzh-cn%2Fsports%2Ffootball%2Fselect-competition%2Fdefault%3Fsc%3DABGCEE',
                'accept-language': 'zh-CN,zh;q=0.9',
                referer: 'https://xj-mbs-manx.prdasbbwla1.com/m/zh-cn/sports/football/select-competition/default?sc=ABGCEE',
                'content-type': 'application/x-www-form-urlencoded',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
                'x-requested-with': 'XMLHttpRequest',
                origin: 'https://xj-mbs-manx.prdasbbwla1.com',
                accept: '*/*'
            },
        form: {
            CompetitionID: -1,
            IsEventMenu: false,
            IsFirstLoad: true,
            IsMobile: true,
            LiveCenterEventId: 0,
            LiveCenterSportId: 1,
            SportID: 1,
            VersionH: 0,
            oCompetitionId: 0,
            oEventIds: 0,
            oIsFirstLoad: true,
            oPageNo: 0,
            oSortBy: 1,
            reqUrl: '/m/zh-cn/sports/football/select-competition/default?sc=ABGCEE',
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
        } catch (e) {
            console.error(e)
        }


    });

}



