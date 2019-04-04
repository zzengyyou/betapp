let request = require("request");

module.exports.getJson = function(callback) {
  //  console.log("正在调用match_type----",match_type,"page---",page)

    let me =this;
    let nextDate = new Date(new Date().getTime() + 24*60*60*1000);
    let ts = new Date().getTime();
    let nextDateStr = nextDate.toLocaleDateString().split('/').join('-');

    let options = {
        method: 'GET',
        timeout: 20000,
        url: 'https://vsd6dh.tender88.com/sports-service/sv/odds/events',
        qs: {mk: 3, sp: 12,ot: 2, btg:2, o:1, lg:"", ev:"", d:nextDateStr,l:3,v:0,me:0,more:false,c:"CN",tm:0,
            g:"QQ==",pa:0,_:ts,locale:'zh_CN'},
        headers:
            {



            },

    };
    request(options, function (error, response, body) {


        try {

            let data = JSON.parse(body);
            let competionList = data.n[0][2];
            let array = [];
            competionList.map(function (competion) {
                let competionName = competion[1];
                let matchList = competion[2];
                matchList.map(function (match) {

                    if(match[8]["0"]&&match[8]["0"][0].length>1){
                        array.push({
                            name:competionName,
                            time:date2str(new Date(match[4])),
                            ts:match[4],
                            dy: [
                                {
                                    teamName: match[1],
                                    pei: match[8]["0"][0][1]
                                },
                                {
                                    teamName:  match[2],
                                    pei:  match[8]["0"][0][0]
                                }
                            ]
                        })
                    }

                })
                
            })

            callback(array);
        }catch (e) {
            console.error(e)
        }


    });
}


function date2str(x,y) {
    y = "yyyy-MM-d hh:mm:ss";
    let z ={y:x.getFullYear(),M:x.getMonth()+1,d:x.getDate(),h:x.getHours(),m:x.getMinutes(),s:x.getSeconds()};
    return y.replace(/(y+|M+|d+|h+|m+|s+)/g,function(v) {return ((v.length>1?"0":"")+eval('z.'+v.slice(-1))).slice(-(v.length>2?v.length:2))});
}