'use strict'
const { response } = require('../app');
// Importar mi modelo
var Project = require('../models/project')
var fs = require("fs");

var controller = {
    home: function(req, res){
        return res.status(200).send({
            message: "Soy home"
        });
    },

    test: function(req, res){
        return res.status(200).send({
            message: "Soy el metodo o accion test del controlador de project"
        });
    },
    
    saveProject: function(req,res){
        var project = new Project();    // Creo un objeto de tipo project

        // Recoger valores
        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.autor = params.autor;
        project.image = null;

        // Guardar valores en la base de datos
        project.save((err, projectStored) => {
            if(err) return res.status(500).send({message: "Error al guardar el documento."});

            if(!projectStored) return res.status(404).send({message: "No se ha podido guardar el proyecto."});

            return res.status(200).send({project: projectStored});
        });

        return res.status(200).send({
            project: project,
            message: "Metodo saveProject"
        });
    },

    // Traer proyectos de la lista
    getProject: function(req,res){
        var projectId = req.params.id;

        // Validacion que evita el null.
        if(projectId == null) return res.status(500).send({message: "El proyecto no existe."});

        Project.findById(projectId, (err, project) =>{
            if(err) return res.status(500).send({message: "Error al devolver los datos."});

            if(!project) return res.status(404).send({message: "El proyecto no existe."});  // if en caso de que no lleguen proyectos

            return res.status(200).send({
                project
            });
        });
    },

    getProjects: function(req, res){
        Project.find({}).sort('+year').exec((err, projects) => {

            if(err) return res.status(500).send({message: "Error al devolver los datos."});

            if(!projects) return res.status(404).send({message: "No hay proyectos para mostar."});

            return res.status(200).send({projects});
        });
    },

    updateProject: function(req, res){
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdated) => {     // new:true actualiza el registro en postman
            if(err) return res.status(500).send({message: "Error al actualizar"});

            if(!projectUpdated) return res.status(404).send({message: "No existe el proyecto para eliminar"});

            return res.status(200).send({project: projectUpdated});
        });
    },

    deleteProject: function(req, res){
        var projectId = req.params.id;

        Project.findByIdAndDelete(projectId, (err, projectRemoved) => {
            if(err) return res.status(500).send({message: "No se ha podido borrar el proyecto."});

            if(!projectRemoved) return res.status(404).send({message: "No se ha podido eliminar ese proyecto"});

            return res.status(200).send({project: projectRemoved});
        });
    },

    uploadImage: function(req, res){
        var projectId = req.params.id;
        var fileName = 'Imagen no subida..';

        if(req.files){
            // Datos necesarios para guardar la imagen en la base de datos
            var filePath = req.files.image.path;        // Nombre real del archivo.
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if(fileExt == "png" || fileExt == "jpg" || fileExt == "jpeg" || fileExt == "gif"){
                Project.findByIdAndUpdate(projectId, {image: fileName}, {new:true}, (err, projectUpdated) => {
                    if(err) return res.status(500).send({ message: 'La imagen no se ha subido' });
    
                    if(!projectUpdated) return res.status(404).send({ message: 'El proyecto no existe y no se ha asignado la imagen' });
    
                    return res.status(200).send({
                        project: projectUpdated
                    });
                });
            } else {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({ message: "La extension no es valida." })
                });
            }

        } else {
            return res.status(200).send({
                message: fileName
            });
        }
    }
};

module.exports = controller;