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
/*router.use(function(req,res,next){
    if(!req.session['admin_id'] && req.url!='/login'){
        res.redirect('/admin/login');
    }else{
        next();
    }
});
*/
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

router.get('/welcome',function(req,res){
    res.render('admin/welcome.ejs');
});

// banner设置
router.get('/banners',function(req,res){
    if (req.query.act == 'del') {
        db.query(`SELECT * FROM banner_table`,function(err,banners){
            if (err) {
                res.status(500).send('database error').end()
            } else {
                res.render('admin/banner-list.ejs',{banners});
            }
        });
    } else {
        db.query(`SELECT * FROM banner_table`,function(err,banners){
            if (err) {
                res.status(500).send('database error').end()
            } else {
                res.render('admin/banner-list.ejs',{banners});
            }
        });
     }   
});

// 添加banner
router.get('/banner-add',function(req,res){
    res.render('admin/banner-add.ejs');
});

// 上传banner
router.post('/banner-add',function(req,res){
    var title = req.body.title;
    var href = req.body.href;
    var description = req.body.description;

    if (!title || !href ||!description) {
        res.status(400).send('arg error').end();
    } else {
        db.query(`INSERT INTO banner_table (title,description,href) VALUE('${title}','${description}','${href}')`,function(err,data){
        if(err){
            console.log(err);
            res.status(500).send('database err').end();
        } else {
            res.status(200).end();
        }
    });
    }
})

// 修改banner

router.get('/banner-change',function(req,res){
    db.query(`SELECT * FROM banner_table WHERE ID = ${req.query.id} `,function(err,banner){
        if(err){
            console.log(err);
            res.status(500).send('database err').end();
        } else {
            res.render('admin/banner-change.ejs',{banner});
        }
    })
   
});

router.post('/banner-change',function(req,res){
    var title = req.body.title;
    var href = req.body.href;
    var description = req.body.description;

    if (!title || !href ||!description) {
        res.status(400).send('arg error').end();
    } else {
        db.query(`UPDATE banner_table title='${title}',description='${title}',href='${href}' WHERE ID = {req.query.id} `,function(err,data){
        if(err){
            console.log(err);
            res.status(500).send('database err').end();
        } else {
            res.status(200).end();
        }
    });
    }
})





router.get('/',function(req,res){
    res.render('admin/index');
});

module.exports = router;