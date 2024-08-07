const jwt = require('jsonwebtoken');
const Usuario = require('../model/Usuario');

module.exports={
   jwtVerify: (req, res, next) => {
      // check header or url parameters or post parameters for token
      let token = req.headers['authorization'];
      if (token){ //Descriptografa o token JWT
         token = token.replace('Bearer ', '')
         jwt.verify(token, 'supersegredo', function(err, decoded) {
            if(err){//Caso ocorra algum erro na descriptografia
               return res.status(401).json({
                  msg: 'Falha ao verificar token de acesso. Tente novamente!'
               });
            }else{//Recupera o dado inserido no token
               
               const usuarioId = decoded.usuarioId;

               Usuario.findOne({ 
                  where:{
                     id: usuarioId,
                     token: token
                  },
                  raw: true,
                  attributes: ["id", "nome", "email"]
               }).then(usuario=>{
                  
                  if (!usuario) {//Caso não seja encontrado nenhum usuário
                     return res.status(401).json({
                           msg: 'Token de Usuário não encontrado. Faça login!!!',
                           error: null
                     });
                  }else{//Caso senha encontrado o usuário
                     req.user = usuario;//Insere os dados do usuário requisição
                     next();//Passa a requisição para o próximo token
                  }
               })
               .catch(error=>{
                  return res.status(401).json({
                     msg: 'Erro ao buscar o Usuário!',
                     error: error.message
                  });
               });
            } 
         });
      }else {
         return res.status(401).json({
            msg: 'O envio do token é obrigatório!',
            error: null
         });
      }
   }
} 