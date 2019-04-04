let bet365Util = require('./getInfo');
let util = require('../../../../../../util');
module.exports.getESportsData = function(callback){
    bet365Util.getESportsMatchesPDs(function (pds) {
        try {
            let index = 0;
            let data = [];
            let cb = function (result) {
                for(let ix in result){
                    if(result[ix]){
                        data.push(result[ix]);
                    }
                }
                if(pds[index+1]){
                    index++;
                    util.sleep(1000);
                    bet365Util.getSeriesPanKousByPd(pds[index],cb);
                }else{
                    callback(data)
                }
            }
            bet365Util.getSeriesPanKousByPd(pds[index],cb);
        }catch (e) {
            console.error(e);
        }


    });
}

