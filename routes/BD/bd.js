var mysql = require('mysql');
// mysql es un objeto creado por nosotros
// que contiene todos los metodos
// de la libreria mysql

var conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'odontologia'
    // 'port': 3306
});
// conextion.connect();
conexion.connect((error)=> {
    // la referencia del error.
    if(error){
        console.log(error);
    } else {
        console.log("Conectado")
    }
})

module.exports = conexion;