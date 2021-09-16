'use strict'
// Conexion a la base de datos
var mongoose = require('mongoose');    // Importacion del modulo de mongoose
var app = require('./app');     // Importacion del modulo express
var port = 3700; // Numero de puerto asignado

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;     
mongoose.connect('mongodb://localhost:27017/Infoware', { useNewUrlParser:true, useUnifiedTopology: true })
                .then(() => {
                    console.log("Conexion a la base de datos exitosa");

                    // Creacion del servidor
                    app.listen(port, ()  => {
                        console.log("Servidor corriendo correctamente en la url: localhost:3700");
                    })
                })
                .catch(err => console.log(err));

/*
npm start -> arranca el server 
*/