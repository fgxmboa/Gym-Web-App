'use strict'

// Importacion modulo express
var express = require('express');
// Importacion del controlador
var ProjectController = require('../controllers/project');
// Cargar el router
var router = express.Router();

// Middleware
var multipart = require('connect-multiparty');
// Donde se van a guardar los archivos
var multipartMiddleware = multipart({ uploadDir: './uploads' });    
// Para ejecutar el middleware tiene que aplicarse a una ruta, para ejecutarlo antes que el metodo.
// pasandolo como segundo parametro

// Crear una rota por get
router.get('/home', ProjectController.home); // Acceso a home en el controller
router.post('/test', ProjectController.test); // Acceso a test en el controller
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);  // ? = campo opcional, en ese caso se debe crear una verificacion
router.get('/projects', ProjectController.getProjects);
router.put('/project/:id', ProjectController.updateProject); // Campo obligatorio, por ello no lleva ?
router.delete('/project/:id', ProjectController.deleteProject);
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage)

module.exports = router;