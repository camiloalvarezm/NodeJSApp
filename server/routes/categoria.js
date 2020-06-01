const express = require('express');
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
const app = express();

let Categoria = require('../models/categoria');

/* Mostrar todas las categorias */
app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                categorias
            });
        });
});

/*  Mostrar una categoria por id*/
app.get('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    ok: false,
                    messsage: 'El id no existe.'
                }
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

/* Crear nueva categoria */

app.post('/categoria', verificaToken, (req, res) => {
    //regresa la nueva categoria
    //req.usuario._id
    let body = req.body;
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

/* Actualizar Categoria */

app.put('/categoria/:id', (req, res) => {
    //nomnbre de la categoria
    let id = req.params.id;
    let body = req.body;

    Categoria.findByIdAndUpdate(id, body, { new: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

/* Eliminar Categoria */

app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {
    //solo un administrador puede borrar categoria
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    messsage: 'No existe el id'
                }
            });
        }
        res.json({
            ok: true,
            messsage: 'Categoria borrada.'
        });
    });
});

module.exports = app;