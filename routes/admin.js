var express = require('express');
var router = express.Router();
var db = require('./BD/bd');

router.get('/', function (req, res, next) {
    if (!req.session.admin) {
        res.redirect('/panel');
    } else {
        getEspecialidades(res);
    }
});

function getEspecialidades(res, mensaje) {
    db.query("select idespecialidad, nombre from especialidades", (err, row) => {
        if (err) {
            console.log(err);
            res.render('admin', { title: "Consola de admin", especialidades: null });
        } else {
            var especialidades = [];
            row.forEach(element => {
                especialidades.push({ id: element.idespecialidad, name: element.nombre });
            });
            res.render('admin', { title: "Consola de admin", especialidades: especialidades, mensaje: mensaje });
        }
    })
}

router.post('/guardarprofesional', (req, res) => {
    if (req.session.admin) {
        var dni = req.body.dni;
        var telefono = req.body.telefono;
        var nombre = req.body.nombre;
        var apellido = req.body.apellido;
        var direccion = req.body.direccion;
        var idespecialidad = req.body.idespecialidad;
        var dato = {
            dni: dni,
            telefono: telefono,
            nombre: nombre,
            apellido: apellido,
            direccion: direccion,
            idespecialidad: idespecialidad
        }
        db.query("insert into profesionales set ?", dato, (err, row) => {
            if (err) {
                console.log(err);
                getEspecialidades(res, 'Error al agregar Profesional');
            }
            else
                getEspecialidades(res, 'Profesional agregado exitosamente');
        });
    }
    else {
        res.render('admin', { mensaje: "Usted no tiene permisos para dar de alta un profesional" });
        res.redirect('/panel');
    }
});

module.exports = router;

