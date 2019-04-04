let mailUtil = require('./public/javascripts/emailUtil');
let test = require('./public/javascripts/compare/esports/pla/uwin/uwin');
const fs = require("fs");
test.getJson(function (data) {

   console.log(data.length)
    fs.writeFile("./ray.txt", JSON.stringify(data), error => {
        if (error) return console.log("写入文件失败,原因是" + error.message);
        console.log("写入成功");
    });

});
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone6 = devices['iPhone 6'];



// (async () => {
//     let array =[];
//     const browser = await (puppeteer.launch({
//         // 若是手动下载的chromium需要指定chromium地址, 默认引用地址为 /项目目录/node_modules/puppeteer/.local-chromium/
//         //设置超时时间
//         timeout: 200000,
//         //如果是访问https页面 此属性会忽略https错误
//         //ignoreHTTPSErrors: true,
//         // 打开开发者工具, 当此值为true时, headless总为false
//         // devtools: false,
//         // 关闭headless模式, 不会打开浏览器
//         headless: false
//     }));
//     try {
//         const page = await browser.newPage();
//         await page.waitFor(5000);
//         await page.emulate(iPhone6);
//         await page.goto('https://www.ray02.com');
//     } catch (e) {
//         console.error(e)
//         browser.close();
//
//     }
//
// })();
