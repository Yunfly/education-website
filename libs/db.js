const mysql = require('mysql');

exports.module = function(){
    const db = mysql.createPool({
        host:'localhost',
        user:'root',
        password:'root',
        database:'learn'
    })
    return db;
}