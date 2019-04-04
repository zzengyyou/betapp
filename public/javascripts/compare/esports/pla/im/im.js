let request = require("request");
const fs = require("fs");

module.exports.getJson = function (callback) {

    let options = {
        method: 'POST',
        url: 'https://imes-opebet.roshan88.com/Sportsbook/GetOddsData',
        headers:
            {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
            },

        form: {
        }
    };

    request(options, function (error, response, body) {
        if (error) {

            console.error(error)
        };

        try {
            let list = JSON.parse(body).d;
            //
            // fs.writeFile("./ray.txt", JSON.stringify(list), error => {
            //     if (error) return console.log("写入文件失败,原因是" + error.message);
            //     console.log("写入成功");
            // });

            let matchList = [];
            list.map(function (item) {
                item[10].map(function (match) {
                    matchList.push(match);

                })

            })
            let duyingMatchList = [];
            let rfMatchListZhu = [];
            let rfMatchListKe  = [];
            matchList.map(function (item) {

                if(item[4][1]=='2'){
                    duyingMatchList.push(item);
                }

            })
            let array = [];
            let rfArrayZhu = [];
            let rfArrayKe = [];



            duyingMatchList.map(function (item) {
                let teamA = item[5][0];
                let teamB = item[6][0];

                let date = new Date(parseInt(item[7].substr(6, 13)));
                let ts = date.getTime();
                if(new Date().getTime()-ts <-1000000)
                array.push({
                    name:item[46],
                    time:date2str(date),
                    ts:date.getTime(),
                    dy: [
                        {
                            teamName:teamA,
                            pei: item[10][6][4]
                        },
                        {
                            teamName: teamB,
                            pei: item[10][6][7]
                        }
                    ],
                    rf:[],
                })


                
            })


            rfMatchListZhu.map(function (item) {
                let teamA = item[5][0];
                let teamB = item[6][0];
                let date = new Date(parseInt(item[7].substr(6, 13)));
                let ts = date.getTime();
                if(new Date().getTime()-ts <-1000000)
                    rfArrayZhu.push({
                        name:item[46],
                        time:date2str(date),
                        ts:date.getTime(),
                        rf: [[
                            {
                                teamName:teamA,
                                rang:true,
                                pei: item[10][6][4]
                            },
                            {
                                teamName: teamB,
                                rang:false,
                                pei: item[10][6][7]
                            }]
                        ]
                    })



            })

            rfMatchListKe.map(function (item) {
                let teamA = item[5][0];
                let teamB = item[6][0];
                let date = new Date(parseInt(item[7]));
                let ts = date.getTime();
                if(new Date().getTime()-ts <-1000000)
                    rfArrayKe.push({
                        name:item[46],
                        time:date2str(date),
                        ts:date.getTime(),
                        rf: [[
                            {
                                teamName:teamA,
                                rang:true,
                                pei: item[10][6][4]
                            },
                            {
                                teamName: teamB,
                                rang:false,
                                pei: item[10][6][7]
                            }
                        ]]
                    })



            })

            console.log(array.length)

            for(let keIndex = 0 ; keIndex<rfArrayKe.length;keIndex++){
                let rfKe = rfArrayKe[keIndex];
                for(let m = 0 ; m<array.length ; m++){
                     let item = array[m];
                    if(rfKe.ts == item.ts &&item.dy&&(rfKe.rf[0].teamName == item.dy[0].teamName||rfKe.rf[0].teamName == item.dy[1].teamName)){
                        item.rf.push(rfKe.rf[0])
                        break;
                    }
                     if(m == array.length-1){

                         array.push(rfKe)
                         break;
                     }
                }
            }


            console.log(array.length)

            for(let zhuIndex = 0 ; zhuIndex<rfArrayZhu.length;zhuIndex++){
                let rfZhu = rfArrayZhu[zhuIndex];
                for(let m2 = 0 ; m2<array.length ; m2++){
                    let item = array[m2];
                    if(rfZhu.ts == item.ts &&item.dy&&(rfZhu.rf[0].teamName == item.dy[0].teamName||rfZhu.rf[0].teamName == item.dy[1].teamName)){
                        item.rf.push(rfZhu.rf[0])
                        break;
                    }

                    if(rfZhu.ts == item.ts &&item.rf&&item.rf[0]&&item.rf[1]){
                         console.log(item)
                        item.rf.push(rfZhu.rf[0])
                        break;
                    }
                    if(m2 == array.length-1){

                        array.push(rfZhu)
                        break;
                    }
                }
            }


            console.log(array.length)

            callback(array)



          //  callback(array);
        } catch (e) {
            console.error(e)
        }


    });

}


function date2str(x,y) {
    y = "yyyy-MM-d hh:mm:ss";
    let z ={y:x.getFullYear(),M:x.getMonth()+1,d:x.getDate(),h:x.getHours(),m:x.getMinutes(),s:x.getSeconds()};
    return y.replace(/(y+|M+|d+|h+|m+|s+)/g,function(v) {return ((v.length>1?"0":"")+eval('z.'+v.slice(-1))).slice(-(v.length>2?v.length:2))});
}