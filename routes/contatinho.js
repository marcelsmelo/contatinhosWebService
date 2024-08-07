module.exports = (app) => {
   const controller = require('../controllers/contatinho.js');
   const auth = require('../lib/auth.js')

   /* GET home page. */
   app.get('/contatinhos', auth.jwtVerify, controller.meusContatinhos);
   app.get('/contatinhos/:id', auth.jwtVerify, controller.getContatinhoByID);
   app.post('/contatinhos', auth.jwtVerify, controller.criarContatinho);
   app.put('/contatinhos', auth.jwtVerify, controller.editarContatinho);
   app.delete('/contatinhos/:id', auth.jwtVerify, controller.removerContatinho); 
}