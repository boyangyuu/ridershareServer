var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var dbPath = "mongodb://admin:admin@ds127391.mlab.com:27391/rider2yby";
var db = mongojs(dbPath);

//http://localhost:3000/cycle/users 
router.get('/users', (req,res,next)=>{
    console.log("cycle requests");
    db.users.find((err,users)=>{
        if(err){res .send(err);}

        res.json(users);
    })
});

//save user
router.post('/save',(req,res,next)=>{
    var user = req.body;
    db.users.save(user,(err,u)=>{
        if(err){res.send(err);}
        res.json(u);
    })
});
module.exports = router;