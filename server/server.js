require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');
//Convertir el body del payload en JSON
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));
//Configuracion global de rutas
app.use(require('./routes/index'));

/* Conexion a la base de datos */
mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err, res) => {
    if (err) throw new err
    console.log('Base de datos ONLINE')
});

/* Puerto de escucha */
app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto: ${process.env.PORT}`);
});