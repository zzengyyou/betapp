let beplayUtil = require('./getInfo');
let util = require('../../../../../../util')

module.exports.getESportsData= function(callback){
    beplayUtil.getESportsCids(function (cids) {
        try {
            let index = 0;
            let data = [];
            let cb = function (result) {

                for(let ix in result){
                    if(result[ix]){
                        data.push(result[ix]);
                    }
                }
                if(cids[index+1]){
                    index++;
                    util.sleep(1000);
                    beplayUtil.getInfoByCid(cids[index],cb);
                }else{
                    callback(data)
                }
            }
            beplayUtil.getInfoByCid(cids[index],cb);
        }catch (e) {
            console.error(e);
        }

    });
}






