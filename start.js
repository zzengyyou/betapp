let esports = require('./public/javascripts/compare/esports/start');
let config = require('./config');
let timeInterval = require('./config').INTERVAL * 60 * 1000;
let footballTimeInterval = require('./config').FOOTBALL_INTERVAL * 60 * 1000;
timeInterval < 100000 ? timeInterval = 100000 : null;
footballTimeInterval<500000?footballTimeInterval = 100000 : null;

if (config.isDev) {
    esports.runEsportsOnce();
} else {
    esports.runEsportsOnce();
    setInterval(esports.runEsportsOnce, timeInterval)
}

// if (config.isDev) {
//     football.runFootBallOnce();
// } else {
//     setInterval(football.runFootBallOnce, timeInterval*2)
// }

