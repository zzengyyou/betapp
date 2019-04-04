var h = [];
var sportsSys = require('./sportsSys')
module.exports.getJson = function () {

    h[0] = sportsSys.sportsSys.Common.compressToJSON(BetOptionContentTemplate, LZString.decompressFromBase64(h[0]));
    h[1] = sportsSys.sportsSys.Common.compressToJSON(BetOptionContentCompetitorTemplate, LZString.decompressFromBase64(h[1]));
    h[2] = sportsSys.sportsSys.Common.compressToJSON(BetOptionContentRateTeimlate, LZString.decompressFromBase64(h[2]));
    h[3] = sportsSys.sportsSys.Common.compressToJSON(BetOptionContentTournamentTemplate, LZString.decompressFromBase64(h[3]));
    h[4] = sportsSys.sportsSys.Common.compressToJSON(BetOptionContentGroupOptionTemplate, LZString.decompressFromBase64(h[4]));


}