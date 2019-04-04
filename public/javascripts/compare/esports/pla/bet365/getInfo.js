let request = require("request");

module.exports.getESportsMatchesPDs = function (callback) {



    let options = {
        method: 'GET',
        url: 'https://www.348365365.com/SportsBook.API/web',
        qs: {lid: '10', zid: '0', pd: '#AS#B151#', cid: '42', ctid: '42'},
        headers:
            {
                'postman-token': 'c91c4abf-1c8c-ad2e-a0eb-1c79479adab4',
                'cache-control': 'no-cache',
                cookie: 'pstk=49ABE780200B8F44935377583FEF2446000003; rmbs=3; session=processform=0; bs=bt=1&mo=0&fs=0||&; aps03=lng=10&tzi=27&oty=2&ct=42&cg=0&cst=116&hd=N&cf=N; pstk=49ABE780200B8F44935377583FEF2446000003; rmbs=3; session=processform=0; bs=bt=1&mo=0&fs=0||&; aps03=lng=10&tzi=27&oty=2&ct=42&cg=0&cst=116&hd=N&cf=N',
                'accept-language': 'zh-CN,zh;q=0.9',
                referer: 'https://www.348365365.com/',
                accept: '*/*',
                'x-devtools-emulate-network-conditions-client-id': '759AA9D6F258B1A9F578890A9E96DF0E',
                'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
            }
    };

    request(options, function (error, response, body) {
        try {
            if (error) {
                console.log("bet365系列赛盘口获取失败");
                callback(error);
            }else{

                let strArray = body.split(',');
                let seriesStr = strArray[strArray.length - 1];
                let seriesArray = seriesStr.split(';');
                let pds = [];
                seriesArray.map(function (item, index) {
                    if (item.indexOf('比赛投注') > -1) {
                        let pd = seriesArray[index + 3].split('=')[1];
                        pds.push(pd)
                    }
                })
                callback(pds)
            }
        }catch (e) {
          console.error(e);
        }



    });


}

module.exports.getSeriesPanKousByPd = function (pd,callback) {


    let options = {
        method: 'GET',
        url: 'https://www.348365365.com/SportsBook.API/web',
        qs: {lid: '10', zid: '0', pd: pd, cid: '42', ctid: '42'},
        headers:
            {
                'postman-token': 'c91c4abf-1c8c-ad2e-a0eb-1c79479adab4',
                'cache-control': 'no-cache',
                cookie: 'pstk=49ABE780200B8F44935377583FEF2446000003; rmbs=3; session=processform=0; bs=bt=1&mo=0&fs=0||&; aps03=lng=10&tzi=27&oty=2&ct=42&cg=0&cst=116&hd=N&cf=N; pstk=49ABE780200B8F44935377583FEF2446000003; rmbs=3; session=processform=0; bs=bt=1&mo=0&fs=0||&; aps03=lng=10&tzi=27&oty=2&ct=42&cg=0&cst=116&hd=N&cf=N',
                'accept-language': 'zh-CN,zh;q=0.9',
                referer: 'https://www.348365365.com/',
                accept: '*/*',
                'x-devtools-emulate-network-conditions-client-id': '759AA9D6F258B1A9F578890A9E96DF0E',
                'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
            }
    };

    request(options, function (error, response, body) {
        try {
            if (error) {
                console.log("bet365系列赛id列表获取失败");
                console.error(error)
                callback(error)
                return;
            };

            let array = body.split(';');
            array.map(function (item,index) {
                if(item.indexOf('ML=')>-1){
                    console.log(array[index+4]);
                }

            })


            let strArray = body.split(',');
            let TB =strArray[13]&&strArray[13].replace("#AS#B151#","");;
            let matchStr = strArray[strArray.length - 1];
            matchStr =  matchStr.split('CN=1;SY=CY;PY=cl')[1];
            let matchArray = matchStr.split(';');
            let pans =[];
            let times = [];

            matchArray.map(function (item,index) {
                if(item.indexOf('BC=')>-1){
                    times.push(item.split("=")[1])
                }
                if(item.indexOf('|PA')>-1){
                    let pei = Math.floor((eval(matchArray[index+3])+1)*100)/100;
                    let teamName = matchArray[index+3]&&matchArray[index+3].split('=')[1]
                    pans.push({
                        teamName:teamName,
                        pei:pei
                    })
                }
            })
            let panKous = [];
            for(let index =0; index< pans.length;index++){
                let lastOne = panKous[panKous.length-1];
                if(index%2==1){
                    lastOne.dy.push(pans[index])
                }else{
                    panKous.push({name:TB,time:times[index/2],dy:[pans[index]]})
                }
            }


            callback(panKous);
        }catch (e) {
            console.error(e);
            
        }


    });


}