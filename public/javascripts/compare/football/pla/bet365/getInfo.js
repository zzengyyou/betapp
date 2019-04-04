let request = require("request");
const puppeteer = require('puppeteer');
let cookie = 'rmbs=3; aps03=lng=10&tzi=27&oty=2&ct=42&cg=0&cst=116&hd=N&cf=N; pstk=533B457955575D2CA9FFF504C370ED92000003; session=processform=0; bs=bt=1&mo=0&fs=0||&'
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

module.exports.getFootballMatchesPDs = function (callback) {


    let options = {
        method: 'GET',
        url: 'https://www.348365365.com/SportsBook.API/web',
        qs: {lid: '10', zid: '0', pd: '#AS#B1#', cid: '42', ctid: '42'},
        headers:
            {
                'postman-token': 'c91c4abf-1c8c-ad2e-a0eb-1c79479adab4',
                'cache-control': 'no-cache',
                cookie: cookie,
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
                console.error(error);
                console.log("bet365系列赛盘口获取失败");
                callback(error);
            } else {

                let strArray = body.split(',');
                let seriesStr = strArray[strArray.length - 1];
                let seriesArray = seriesStr.split(';');
                let pds = [];
                seriesArray.map(function (item, index) {

                    if (item.indexOf("#AC#B1#C1") > -1) {
                        let pd = item.split('=')[1];
                        pds.push(pd)
                    }


                })
                callback(pds);


                //  console.log(pds);

            }
        } catch (e) {
            console.error(e);
        }


    });


}

async function addCookies(cookies_str, page, domain) {
    let cookies = cookies_str.split(';').map(pair => {
        let name = pair.trim().slice(0, pair.trim().indexOf('='))
        let value = pair.trim().slice(pair.trim().indexOf('=') + 1)
        return {name, value, domain}
    });
    await Promise.all(cookies.map(pair => {
        return page.setCookie(pair)
    }))
}



module.exports.getSeriesPanKousInChromeByPds = function (pds, callback) {


    (async () => {
        let array =[];
        const browser = await (puppeteer.launch({
            // 若是手动下载的chromium需要指定chromium地址, 默认引用地址为 /项目目录/node_modules/puppeteer/.local-chromium/
            //设置超时时间
            timeout: 190000,
            //如果是访问https页面 此属性会忽略https错误
            //ignoreHTTPSErrors: true,
            // 打开开发者工具, 当此值为true时, headless总为false
            // devtools: false,
            // 关闭headless模式, 不会打开浏览器
            headless: false
        }));
        try {
            for(let i in pds){
                let pd = pds[i];
                let url = 'https://www.448365365.com/#' + pd.split('#').join('/');
                const page = await browser.newPage();
                await addCookies(cookie, page, 'www.448365365.com');
                await page.goto(url);
                await page.waitForSelector('.sl-CouponParticipantGameLineTwoWay_NameText ');


                const compettionArray = await page.evaluate(() => {
                    let teams = document.querySelectorAll('.sl-CouponParticipantGameLineTwoWay_NameText');
                    let peis = document.querySelectorAll('.gl-ParticipantOddsOnly_Odds');
                    let timesContainer = document.querySelectorAll('.sl-CouponParticipantGameLineTwoWay_LeftSideContainer');
                    let matchName = document.querySelector('.cl-EnhancedDropDown ').innerText;


                    let compettionArrayIn =[];
                    let timeArray=[];

                    for(let i in teams){
                        if(teams[i].innerText=='平局'){
                            let time = timesContainer[i-2]&&timesContainer[i-2].querySelector('.sl-CouponParticipantGameLineTwoWay_Time')&&timesContainer[i-2].querySelector('.sl-CouponParticipantGameLineTwoWay_Time').innerHTML;

                            compettionArrayIn.push({
                                name:matchName,
                                time:time,
                                drawPei:peis[i].innerText,
                                dy:[
                                    {
                                        teamName:teams[i-2].innerText,
                                        pei:peis[i-2].innerText
                                    },
                                    {
                                        teamName:teams[i-1].innerText,
                                        pei:peis[i-1].innerText
                                    },
                                ]
                            })
                        }
                    }



                    return compettionArrayIn;

                });
                array = array.concat(compettionArray);
                console.log("bet365足球",compettionArray[0].name,'比赛获取完毕。现存数据共',array.length,'条');
                await page.waitFor(1000);
                page.close();
            }
            console.log('bet365足球赛全部获取完毕。场次共',array.length,'场');
            browser.close();

            callback(array);
            //browser.close();
            // callback(result);
        } catch (e) {
            console.error(e)
            callback(array);
            browser.close();

        }

    })();


}
