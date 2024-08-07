module.exports = (app) => {
    const controller = require('../controllers/index.js');
    const auth = require('../lib/auth')

    /* GET home page. */
    app.get('/usuario', auth.jwtVerify, controller.meusDados);
    //app.get('/usuarios/', controller.getUsuarioByID);
    app.post('/usuario', controller.createUsuario);
    app.put('/usuario', auth.jwtVerify, controller.updateUsuario);
    app.delete('/usuario/', auth.jwtVerify, controller.deleteUsuarioById);
    
    app.post('/login', controller.login);//ok
    app.post('/logout', auth.jwtVerify, controller.logout);//ok
    app.get('/me', auth.jwtVerify, controller.meusDados); 
}