let request = require("request");

module.exports.getOPEData = function (callback) {


    let options = {
        method: 'POST',
        url: 'https://api.dfesg.com/API/Game/RaceListAsync',
        headers:
            {
                Accept:'*/*',
                'Accept-Language':"zh-CN,zh;q=0.9",
               // Authorization:"Bearer AweIarpI4KmoY9jRe_1dfEmc5lVVAj-jfgIZJPVQkAEwARdGrxw1Y5kiNivMEMjzSm2YHfoMOxBY0xsQvm_14kOLpu5aFQkr8IYUel8VGxxf3pdh3eZcbCCwrvCeKnLBB7UOxV9MgFjZXL_JCelOPMNDgV1z-DKLfiHlyo2teeYbNrs9BKV-weOwL6EjerIE0bZFSthS0wh75ZIoXP-huLybSYG_oQi6e63K197Wp4-bOb8tdKjqrbdftfUM6QcTPjPTwre_-d9QiswOY-eXtJDHjVMUpfws7zakSdkDkDGVsKEwqS_wQJhsDUco-GFtkCY3ksfW7ItaDpXN0cP9hten8z0ZUhlRt2lWmd2jqO2TCty8sAnQJlOjjRyJvCe0",
                Connection:"keep-alive",
                "Content-Length":152,
                "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
                Host:"api.dfesg.com",
                Origin:"https://ope.dfesg.com",
                Referer:"https://ope.dfesg.com/Home/Index?status=-1&gid=-1&lid=",
                "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36",
            },
        form:{
            'RequestRaceList[RaceGameID]':-1,
            'RequestRaceList[LeagueID]':"",
            'RequestRaceList[Status]':-1,
            'Pagination[PageIndex]':1,
            'Pagination[PageSize]':50

        }
    };

    request(options, function (error, response, body) {
        try {
           let list = JSON.parse(body).Data;
           let data = [];
           list.map(function (item) {
               data.push({
                   name:item.LeagueName,
                   time:item.RaceDate,
                   dy:[{
                       teamName:item.TeamAName,
                       pei:item.DefItemAOdds
                      },
                       {
                           teamName:item.TeamBName,
                           pei:item.DefItemBOdds
                       } ],
               })
               
           })
            callback(data);
           
        }catch (e) {
            console.error(e);
        }



    });


}

