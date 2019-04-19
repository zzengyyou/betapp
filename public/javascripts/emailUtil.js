let nodemailer  = require('nodemailer');
let request = require("request");
let mailTransport = nodemailer.createTransport({
    host : 'smtp.qq.com',
    secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）,
    auth : {
        user : '731859615@qq.com',
        pass : 'whwxbnvtlholbche'
    },
});



// let mailTransport = nodemailer.createTransport({
//     host : 'smtp.qq.com',
//     secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）,
//     auth : {
//         user : '824722054@qq.com',
//         pass : 'pmjxyccvuplbbfgf'
//     },
// });




exports.sendEmail = function (title,content) {

    let options = {
        from        : '"betApp" <731859615@qq.com>',
        to          : '"zy" <731859615@qq.com>,"ld" <467432550@qq.com>',
        subject        :title,
        text          : content,
        html           : content,

    };
    mailTransport.sendMail(options, function(err, msg){
        console.error(err);
    });


}

