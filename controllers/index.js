const Usuario = require('../model/Usuario');

module.exports = {
    getUsuarios: (req, res, next) => {
        Usuario.findAll({
          raw: true,
          attributes: ["id", "nome", "email"]
        }).then(usuarios => {
            return res.status(200).json(usuarios);
        }).catch(error => {
            return res.status(500).json({ msg: "Erro ao buscar usuários!", error: error});
        });

    },
    getUsuarioByID: (req, res, next) => {
        Usuario.findOne({ 
          where:{
             id: req.params.id
          },
          raw: true,
          attributes: ["id", "nome", "email"]
       }).then(usuario => {
          return res.status(200).json(usuario);
        }).catch(error => {
          return res.status(500).json({ msg: "Erro ao recuperar usuário!", error: error });
        });
    },
    createUsuario: (req, res, next) => {
      console.log(req.body)

        const user = {
            nome: req.body.nome,
            email: req.body.email, 
            senha: req.body.senha
        };

        console.log(user)

        Usuario.create(user).then(usuario => {
          return res.status(201).json({ msg: "Usuário criado com sucesso" });
        }).catch(error => {
          return res.status(500).json({ msg: "Erro ao cadastrar usuário!", error: error});
        });
    },
    updateUsuario: (req, res, next) => {
        const editedData = {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        };

        Usuario.findOne({where: {id: req.user.id}}).then( (usuario)=> {
          usuario.update(editedData).then(editedUser =>{
            return res.status(200).json({ msg: "Usuário editado com sucesso" });
          })
          .catch(error =>{
            return res.status(500).json({ msg: "Erro ao editar usuário!", error: error });
          })
        })
        .catch(error => {
          return res.status(500).json({ msg: "Erro ao editar usuário!", error: error});
        });
    },
    deleteUsuarioById: (req, res, next) => {
        Usuario.destroy({
            where: {
                id: req.params.id,
                id: req.user.id
            }
        }).then((rows) => { //Número de linhas afetadas
          return res.status(200).json({ msg: "Usuário removido com sucesso" });
        }).catch(error => {
          return res.status(500).json({ msg: "Erro ao remover usuário!", error: error});
        });
    },

    login: (req, res, next)=>{
        Usuario.findOne({
            where: {email: req.body.email},
          }).then((user)=>{
            if (!user) {
                //Usuário (email) não foi encontrado
                res.status(500).json({
                  msg: "Usuário não encontrado! Tente novamente",
                  error: null,
                });
              } else {
                //Usuário encontrado, verificar senha
                if (user.comparePassword(req.body.senha)) {
                  //Senha informada está correta
                  user
                    .generateAuthToken() //Gerar o token JWT
                    .then((sucesso) => {
                      //Token gerado com sucesso
                      res.status(200).json(sucesso);
                    })
                    .catch((error) => {
                      //Erro ao gerar o Token JWT
                      return res.status(500).json({
                        msg: "Erro ao realizar o login!",
                        error: error,
                      });
                    });
                } else {
                  //Senha informada está incorreta
                  return res.status(500).json({
                    msg: "Senha informada está incorreta!",
                    error: null,
                  });
                }
              }
          }).catch((error) => {
            return res.status(500).json({
            msg: "Usuário não encontrado!",
            error: null,
        });
      });
    },

    logout: async (req, res, next)=>{
        try {
            await Usuario.update(
              {
                token: null,
              },
              {
                where: {
                  id: req.user.id,
                },
              }
            );
            return res.status(200).send({ msg: "Logout realizado com sucesso!" });
          } catch (error) {
            return res
              .status(500)
              .send({ msg: "Logout não realizado!", error: error});
          } 
    },
    //Retorna os dados do usuário logado
  meusDados: async (req, res, next) => {
    try {
      let dados = await Usuario.findOne({
        where: {
          id: req.user.id
        },
        raw: true,
        attributes: ["id", "nome", "email"]
      });
      return res.status(200).json(dados);
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Erro ao buscar informações", error: error});
    }
  },
};