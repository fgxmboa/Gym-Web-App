'use strict'

// Importar Mongoose
var mongoose = require("mongoose");
// Cargar el schema
var Schema = mongoose.Schema;
// Cargar el schema de projects que esta en Mongo
var ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    autor: String,
    image: String
});

// Exportar el modulo
module.exports = mongoose.model("Project", ProjectSchema);
/* 
Mongoose convierte "Project" a minisculas y lo pluraliza
De modo que quedaria asi:
projects => guarda los documentos en esta coleccion
*/