let request = require("request");


module.exports.getJson = function (callback) {

    let options = {
        method: 'POST',
        url: 'https://mkt5.vw130.com/OddsManager/Standard',
        qs:{jsoncallback:'jQuery111308490441683122534_1551079223404'},
        headers:
            {
                '__VerfCode':"DeC4l0pFBmA5utC1k83uH2Y5rR36am8Pw5eyu_qUbQ9gFRf-P3NTuUXjQH0-uVPeIHkeA11RZsDPTRYJTOrUmOUSNeE1",
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
                Referer: 'https://mkt5.vw130.com/onebook?act=esports&ts=20190225032022389&gid=3847dda2-4af7-4d4b-b086-dd232e8f20df1551079222883',
                Cookie:"visid_incap_1347594=5d7JVA91ScWu1YQJWJvuRHJYb1wAAAAAQUIPAAAAAABm8S0Uxpa3AqUxADk/7tk+; 5fdss=zh-cn; bobos=/cn/; _ga=GA1.2.1574630472.1550801013; switchViewSkinType_Vwin=2; LangKey=cs; OddsType_=2; OddsType_SPONUUS01445=2; _gid=GA1.2.1904024771.1551054804; visid_incap_1373413=58xFIGZgR++p3MytSjQ67CM4c1wAAAAAQUIPAAAAAAAAXxLYFYup/bHzXSXvqalY; incap_ses_797_1347594=fxtZJFMLOHLVzdzx/oMPCzGXc1wAAAAAIHjojcpdaVqDsKhNa3Kzgg==; _gat=1; fkei2=1-5c739735-65367d40562dd5a0f5c1cc20; ASP.NET_SessionId=syoektyo0xxiezclfakezxgx; setCurrMainTab_Vwin=tab02; setShowMainTab_Vwin=tab02; __RequestVerificationToken=XgzybACiiqJWkUpoDpCB-hSjNj3KGaKhdmwaaZMnHg-BzNzuMAjUu03QskpRk7PfPLKWkOMwEmj8VCf_vcr7R5VZ7ps1; _gat_LicNewAsiaGACode=1; _gat_CommonTracker=1; _pk_id.5.f6a5=eb00a1f41b8fd560.1550801032.6.1551079224.1551079224.; _pk_ses.5.f6a5=1"
            },

        form: {
            FixtureType: 't',
            SportType: 43,
            LDisplayMode: 0,
            Scope: 'All',
            IsParlay: false,
            GameType: 0,
            SelDate:"",
            tstamp: 0
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        try {
            console.log(body)
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