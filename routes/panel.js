var express = require('express');
var router = express.Router();
var bd = require('./BD/bd');


router.get('/',(req,res,next)=>{
    // console.log(req.session.usuario);
    if(req.session.usuario) { // la persona esta logueada?
        bd.query("SELECT * FROM usuarios", (err, rows) => {
            if (err) { console.log(err) }
            else {
                console.log(rows);
                res.render('panel', { dato: rows });
            }
        })
    } else { // si no lo está a login
        res.redirect('/login');
    }

})

module.exports = router;