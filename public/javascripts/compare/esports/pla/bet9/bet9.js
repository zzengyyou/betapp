let request = require("request");
let bet9Util = require('./getJsonBet9');

let options = {
    method: 'GET',
    timeout: 20000,
    url: 'https://ball.wf777.net/memberball_new1/Page/BallGame/Ashx_New/TS_BallGameDoubleRow_Ajax.ashx',

    qs:
        {
            vv: '1544168113844',
            BallType: 'b_dzjj',
            BallId: '238',
            Scene: 'gameall_country',
            CountryId: '0',
            IsOlympic: 'false',
            IsWorldCup: '0',
            SortOrder: 'hotsort',
            PageIndex: '1'
        },
    headers:
        {

            'cache-control': 'no-cache',
            cookie: 'IsHttpsStart=1; ASP.NET_SessionId=muksmwwwsd4ytflpwu5sp1or; ClearFAVORITES=1; refrerVal26=https://ts.bef11.com; MemberLiveChatUrl26=/memberball_Live//Index/Pd.aspx?user=LDLDLD&site=26&gamenum=3&verify=41FE354B57C2A2BA2B913F810EF3E103; account26=LDLDLD; LoginOutType=; Language=zh-cn; cookieFavSet26={"UserFavSetCookieName":"cookieFavSet26","UserDefulatBall":"0","UserSortMode":"0","Pmdmode":"true","UserGameFreshTime":"30","UserAutoGetBestPL":"true","UserAtutoGetAnyPL":"false","UserDefulatBetWay":"Bet","UserDefaultBetMoney":"false","UserDefaultDsBetMoney":"0","UserDefaultDsBetMoney2":"0","UserDefaultGGBetMoney":"0","UserDefaultGGBetMoney2":"0","UserDefaultDsWinMoney":"0","UserDefaultDsWinMoney2":"0","UserDefaultGGWinMoney":"0","UserDefaultGGWinMoney2":"0","UserBetSureInfo":"true","UserBetSucessInfo":"true","UserGameExpansion":"true","UserFastBetStatus":"0","UserFastBetMoney":"0"}; betCookies={"chipSetting":[],"isSetting":false}; LiveCoos=ballSortByUserChoose::###ChooseFreshTime::###',
            referer: 'https://ball.wf777.net/memberball_new1/Page/Index/Index.aspx',
            'content-type': 'application/json;charset=utf8',
            'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
            'x-requested-with': 'XMLHttpRequest',
            'x-devtools-emulate-network-conditions-client-id': '30B4BD1AF3D1CC205B001F10DD78A0B8',
            accept: 'text/plain, */*; q=0.01'
        }
};


module.exports.getBet9Data = function (callback) {
    request(options, function (error, response, body) {
        if (error) {
            console.error(error)
        }

        try {
            let data = [];
            console.log(body);
            let bet9data = JSON.parse(bet9Util.getJson(body)).BallData;
            bet9data.map(function (item, index) {
                if(item.dbl_DY_Y_PL_1&& item.dbl_DY_Z_PL_1){
                    data.push({
                        name: item.s_Alliance.split("||")[0],
                        time: item.dtm_GameDate,
                        dy: [{
                            teamName: item.s_TeamA.split("||")[0],
                            pei: item.dbl_DY_Z_PL_1+1
                        },
                            {
                                teamName: item.s_TeamB.split("||")[0],
                                pei: item.dbl_DY_Y_PL_1+1
                            }],
                    })
                }



            })
            callback(data);
        }catch (e) {
            console.error(e);
        }

    });
}

