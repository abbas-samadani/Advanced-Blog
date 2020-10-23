const moment = require('moment-jalali');

exports.toPersian = (input , format = 'jYYYY/jM/jD') =>{
    const toPersian = moment(input).format(format)
    return toPersian;
}