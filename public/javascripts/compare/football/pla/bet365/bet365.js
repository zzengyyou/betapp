let bet365Util = require('./getInfo');
let util = require('../../../../../../util');
module.exports.getFootballData = function(callback){

    bet365Util.getFootballMatchesPDs(function (pds) {
        bet365Util.getSeriesPanKousInChromeByPds(pds,function (data) {
            callback(data);
        });

    });
}
