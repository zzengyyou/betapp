let beplayUtil = require('./getInfo');
let util = require('../../../../../../util')

module.exports.getFootballData= function(callback){
    beplayUtil.getFootBallCids(function (cids) {
        try {

            let index = 0;
            let data = [];
            let cb = function (result) {

                for(let ix in result){
                    if(result[ix]){
                        data.push(result[ix]);
                    }
                }
                console.log("manx足球",cids[index],'比赛获取完毕。现存数据共',data.length,'条');
                if(cids[index+1]){
                    index++;
                    util.sleep(1000);
                    beplayUtil.getInfoByCid(cids[index],cb);
                }else{
                    console.log('manx足球赛全部获取完毕。场次共',data.length,'场');
                    callback(data)
                }
            }
            beplayUtil.getInfoByCid(cids[index],cb);
        }catch (e) {
            console.error(e);
        }

    });
}






