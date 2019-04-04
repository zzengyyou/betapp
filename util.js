module.exports.sleep = function (numberMillis) {

    let now = new Date();

    let exitTime = now.getTime() + numberMillis;

    while (true) {

        now = new Date();

        if (now.getTime() > exitTime){

            return;

        }

    }

}
