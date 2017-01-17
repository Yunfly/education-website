var crypto = require('crypto');

module.exports = {
    MD5_SUFFIX:'ASD123S@&!Q123la18237#*&HJ@*123ds!@#F@#WSDF@#',
    md5: function (str) {
        var obj  =crypto.createHash('md5');
        obj.update(str);
        return obj.digest('hex');
    }
};