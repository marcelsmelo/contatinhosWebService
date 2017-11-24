module.exports = (app) => {
    const controller = require('../controllers/index.js');

    /* GET home page. */
    app.get('/contatinhos', controller.getContatinhos);
    app.post('/contatinhos/:id', controller.getContatinhoByID);
    app.get('/contatinhos/:nome', controller.getContatinhoByName);
    app.post('/contatinhos', controller.createContatinho);
    //app.get('/carros/classicos', controller.classicos);
}