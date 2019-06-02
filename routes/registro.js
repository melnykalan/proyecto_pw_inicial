var express = require('express');
var router = express.Router();
var bd = require('./BD/bd');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('registro', { title: 'Bienvenido/a a la pelu del siglo, por favor, registrate' });
});


router.post('/',(req,res,next)=>{
// arrow functions : SINTAXIS "nueva" para definir funciones.el password despues de body es el name del input
    // query es un metodo de la libreria mysql que recibe dos parametros obligatorios
    // 1. consulta
    // 2. funcion anonima (error, resultado)
    // error es un objeto que almacena la referencia del error en la consulta
    // resultado -> objeto que almacena el resultado de la consulta
    var usuario = req.body.usuario; //usuario es el name del input
    var password = req.body.password;// 

    var dato = {
        usuario : req.body.usuario,
        password : req.body.password,
        confirmado : 0
    }


    bd.query("insert into usuarios set ?",dato,(err,row)=>{
        if(err)
            console.log(err);
        else
            res.render('registro',{mensaje:'Registro exitoso'});
    })








    // bd.query("insert into usuarios (usuario,password,confirmado) values ('"+usuario+"','"+password+"',0)", (err,rows)=>{
    //     if(err){
    //         console.log(err);
    //     } else {
    //         res.render('registro',{mensaje:'Registro exitoso'});
    //     }
    // })
    //INSERT INTO usuarios (usuario,password, mail_confirmado) values ('juan','1234',0)
})

module.exports = router;
