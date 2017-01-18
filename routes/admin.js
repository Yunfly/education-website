var express = require('express');
var router = express.Router();
var common = require('../libs/common');
const mysql = require('mysql');

const db = mysql.createPool({
        host:'localhost',
        user:'root',
        password:'root',
        database:'learn'
    });
//检查登录状态
router.use(function(req,res,next){
    if(!req.session['admin_id'] && req.url!='/login'){
        res.redirect('/admin/login');
    }else{
        next();
    }
});

router.get('/login',function(req,res){
    res.render('admin/login.ejs');
});

router.post('/login',function(req,res){
    var username = req.body.username;
    var password = common.md5(req.body.password);
    db.query(`SELECT * FROM admin_table WHERE username='${username}'`,function(err,data){
        if(err){
            console.log(err);
            res.status(500).send('database err').end();
        } else {
           if(data.length==0){
               res.status(400).send('no this admin').end();
           } else {
            if (data[0].password == password) {
                // success
                req.session['admin_id'] = data[0].ID;
                res.redirect('/admin/');
            } else {
                res.status(400).send('password worry').end();
            }
           }
        }
    });
});

router.get('/',function(req,res){
    res.render('admin/index');
});

module.exports = router;