let request = require("request");
const fs = require("fs");

module.exports.getJson = function (callback) {

    let options = {
        method: 'POST',
        url: '' +
            '' +
            '' +
            '',
        headers:
            {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
            },

        form: {
        }
    };

    request(options, function (error, response, body) {

            let list = JSON.parse(body);
            let matchList = [];
            list.map(function (item) {
                item[10].map(function (match) {
                    matchList.push(match);

                })

            })
            let duyingMatchList = [];
            let rfMatchListZhu = [];
            let array = [];
            let rfArrayZhu = [];
            let rfArrayKe = [];



            duyingMatchList.map(function (item) {
                let teamA = item[5][0];
                let teamB = item[6][0];


                array.push({
                    name:item[33],
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

                    rfArrayZhu.push({
                        name:item[33],
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







          //  callback(array);



    });

}


