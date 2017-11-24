module.exports = (app) => {
    const controller = require('../controllers/index.js');

    /* GET home page. */
    app.get('/contatinhos', controller.getContatinhos);
    app.get('/contatinhos/:id', controller.getContatinhoByID);
    app.post('/contatinhos', controller.createContatinho);
    app.put('/contatinhos', controller.updateContatinho);
    app.delete('/contatinhos/:id', controller.deleteContatinhoById);
}