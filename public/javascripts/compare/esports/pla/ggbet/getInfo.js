let request = require("request");
const puppeteer = require('puppeteer');
let cookie = '';

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



module.exports.getData = function (callback) {


    (async () => {
        let array =[];
        const browser = await (puppeteer.launch({
            // 若是手动下载的chromium需要指定chromium地址, 默认引用地址为 /项目目录/node_modules/puppeteer/.local-chromium/
            //设置超时时间
            timeout: 200000,
            //如果是访问https页面 此属性会忽略https错误
            //ignoreHTTPSErrors: true,
            // 打开开发者工具, 当此值为true时, headless总为false
            // devtools: false,
            // 关闭headless模式, 不会打开浏览器
            headless: true
        }));
        try {
            for(let i =1;i<20;i++){
                let url = `https://gg.bet/cn/betting/?page=${i}`;
                const page = await browser.newPage();
                page.setDefaultNavigationTimeout(50000)
                page.setViewport({
                    width: 1440,
                    height: 900,
                });
                await page.goto(url);

                try {
                    await page.waitForSelector('.matchRowContainer__container___1_tLJ');
                }catch (e) {
                    break;
                }



                const compettionArray = await page.evaluate(() => {
                    let matchContainers = document.querySelectorAll('.matchRowContainer__container___1_tLJ');
                    let res = [];

                     for(let i =0 ;i<matchContainers.length;i++){

                         let oddsThisMatch = matchContainers[i].querySelectorAll('.__app-Odd-inner');
                         let matchCheckName = matchContainers[i].querySelectorAll('.__app-LogoTitle-name')[0].innerHTML+matchContainers[i].querySelectorAll('.__app-LogoTitle-name')[1].innerHTML;
                         if(oddsThisMatch.length==2){
                             let flag = true;
                             if(flag){
                                 res.push({
                                     checkMatch:matchCheckName,
                                     dy:[
                                         {
                                             teamName: matchContainers[i].querySelectorAll('.__app-LogoTitle-name')[0].innerHTML,
                                             pei:oddsThisMatch[0].querySelector('span').innerHTML
                                         },
                                         {
                                             teamName: matchContainers[i].querySelectorAll('.__app-LogoTitle-name')[1].innerHTML,
                                             pei:oddsThisMatch[1].querySelector('span').innerHTML
                                         }
                                     ]
                                 })
                             }


                         }


                     }


               



                    return res;

                });
               // console.log(JSON.stringify(compettionArray));
                //console.log("本次数据获取共",compettionArray.length,'条')
                array = array.concat(compettionArray);
               // console.log("ggbet电竞数据获取完毕。现存数据共",array.length,'条');
                await page.waitFor(1000);
                page.close();
            }

            browser.close();
            let result = [];
            let obj = {};
               for(let i =0; i<array.length; i++){
                      if(!obj[array[i].checkMatch]){
                             result.push(array[i]);
                             obj[array[i].checkMatch] = true;
                          }
                   }
            callback(result);
           // console.log('ggbet 电竞比赛去重复获取完毕。场次共',array.length,'场');
            //browser.close();
            // callback(result);
        } catch (e) {
            console.error(e)
            callback(array);
            browser.close();

        }

    })();


}


