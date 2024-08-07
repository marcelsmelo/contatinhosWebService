const Contatinho = require('../model/Contatinho');
const Usuario = require('../model/Usuario');

module.exports = {
   meusContatinhos: (req, res, next) => {
      Contatinho.findAll({
         where: { usuarioId: req.user.id },
         include: [{
            model: Usuario,
            attributes: ['id', 'nome', 'email']
         }]
      })
         .then(contatinho => {
            return res.status(200).json(contatinho);
         }).catch(error => {
            return res.status(500).json({ msg: "Erro ao buscar seus contatinhos!", error: error });
         });
   },
   todosContatinhos: (req, res, next) => {
      Contatinho.findAll({
         include: [{
            model: Usuario,
            attributes: ['id', 'nome', 'email']
         }]
      }).then(contatinhos => {
         return res.status(200).json(contatinhos);
      }).catch(error => {
         return res.status(500).json({ msg: "Erro ao buscar todos Contatinhos!", error: error });
      });
   },
   getContatinhoByID: (req, res, next) => {
      Contatinho.findOne({
         where: {
            id: req.params.id,
            usuarioId: req.user.id
         },
         include: [{
            model: Usuario,
            attributes: ['id', 'nome', 'email']
         }]
      })
         .then(contatinho => {
            return res.status(200).json(contatinho);
         }).catch(error => {
            return res.status(500).json({ msg: "Erro ao buscar o contatinho!", error: error });
         });
   },
   criarContatinho: (req, res, next) => {   
      try{
         const contatinho = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            telefone: req.body.telefone,
            usuarioId: req.user.id
         };
      
         Contatinho.create(contatinho).then(contatinho => {
            return res.status(201).json({ msg: "Contatinho criado com sucesso" });
         }).catch(error => {
            return res.status(500).json({ msg: "Erro ao criar seu Contatinho!", error: error });
         });
      }catch(error){
         return res.status(500).json({ msg: "Erro ao criar Contatinho!", error: error });
      }
      
   },
   editarContatinho: (req, res, next) => {
      try{
         const contatinho = {
         nome: req.body.nome,
         descricao: req.body.descricao,
         telefone: req.body.telefone,
         usuarioId: req.user.id
      };
      Contatinho.update(contatinho, { where: { id: req.body.id } })
         .then(contatinho => {
            return res.status(201).json({ msg: "Contatinho editado com sucesso" });
         }).catch(error => {
            return res.status(500).json({ msg: "Erro ao editar contatinho!", error: error });
         });
      }catch(error){
         return res.status(500).json({ msg: "Erro ao editar contatinho!", error: error });
      }
      
   },
   removerContatinho: (req, res, next) => {
      Contatinho.destroy({
         where: {
            id: req.params.id,
            usuarioId: req.user.id
         }
      }).then((rows) => { //Número de linhas afetadas
         if(rows > 0)
            return res.status(200).json({ msg: "Contatinho removido com sucesso" });
         else
            return res.status(500).json({ msg: "Erro ao remover contatinho!", error: "Você não tem acesso para remover o contatinho solicitado!" });
         
      }).catch(error => {
         return res.status(500).json({ msg: "Erro ao remover contatinho!", error: error });
      });
   },
};