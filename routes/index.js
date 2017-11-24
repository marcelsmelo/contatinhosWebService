module.exports = (app) => {
    const multerConfig = require('../lib/multerConfig.js');
    const controller = require('../controllers/index.js');

    /* GET home page. */
    app.get('/strabe/', controller.index);
    app.post('/strabe/', multerConfig.single('file'), controller.fileUpload);
    app.get('/strabe/tasks', controller.tasks);
    app.get('/carros/esportivos', controller.esportivos);
    app.get('/carros/classicos', controller.classicos);
}