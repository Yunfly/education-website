var express = require('express');
var router = express.Router();
var common = require('../libs/common');
var db = require('../libs/db');


//检查登录状态
router.use(function(req,res,next){
    if(!req.session['admin_id'] && req.url!='/login'){
        res.redirect('/admin/login');
    }else{
        next();
    }
});

router.use('/login',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    db.query(`SELECT * FROM admin_table WHERE username='${username}'`,function(err,data){
        if(err){
            console.log(err);
        } else {
           if(data.length==0){
               res.status(400).send('')
           }
        }
    });
    res.render('admin/login.ejs');
});



module.exports = router;