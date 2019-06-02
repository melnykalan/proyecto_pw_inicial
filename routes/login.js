var express = require('express');
var router = express.Router();
var db = require('./BD/bd');
// md5
var md5 = require('md5');
var uuid = require('uuid');
// get, post, put , delete

// cuando el user entre a /login
router.get('/',function(req,res,next){
    // req -> request
    // res -> respuesta
    // next.
    res.render('login',{title:"Bienvenidx"});

});

router.post('/inicio', (req,res)=> {
    // agarramos los datos del formulario 
    // lo almacenamos en objeto o variable
    // consulta
    var datos = {
        usuario :req.body.usuario ,
        password: md5(req.body.password)
    }
    // .query(2 o mas parametos) query,(funcion)
    db.query("select id_usuario from usuarios where usuario='"+datos.usuario+"' and password='"+datos.password+"'",(err,rows)=>{
        if(err){
            console.log(err); // DEL LADO DEL SERVIDOR LOS CONSOLE.LOG se visualizan en la terminal     
        } else {
            // Cuantos registros nos devuelve esta consulta
            // SQL me devuelve un array de objetos
            //console.log(rows); //rows es el objeto que contiene el resultado sql a la consulta de query
            if(rows.length > 0){
                // solo me traera el objeto si existe un registro cuyo passwrd y usuario coincidan con el que puso el usuario.//#endregion

        
                // hay un match 
                // SESIONES
                // COOKIES.
                // Informacion que se guardaba EN NUESTRA PC (EN NUESTRO NAVEGADOR)
                // Poisoning
                // VARIABLES DE SESION : SE GUARDAN EN EL SERVIDOR.

                // VENTAJA : AUMENTA LA SEGURIDAD DE LA APLICACION
                // DESVENTAJA : 1000000 USUARIOS --> 100000 DE VARIABLES DE SESION. 

                // tenemos que crearle una variable de sesion unica
                // req.session
            // siempre que se le asigne un valor a una variable de sesion
            // deberemos elegir el campo que relaciona a las tablas.
  
                req.session.usuario = rows[0].id_usuario;

                res.redirect('/panel');



            } else {
                // usuario o contraseña incorrecto
                res.render('login',{mensaje:"Usuario o contraseña incorrecto"});
            }
        }
    })
    // QUERY : SELECT * from usuarios where and 
})

module.exports = router;

