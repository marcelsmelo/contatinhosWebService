const Sequelize = require('sequelize')
const sequelize = require('../database/dbMysql');
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const Usuario = sequelize.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O campo nome é obrigatório!'
            },
            len:{
                args: [3,50],
                msg: "O campo nome deve ter entre 3 e 50 caracteres"
            } 
        } 
    },
    email: {
        type: Sequelize.STRING(100),
        unique: true,
        isEmail: true,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O campo email é obrigatório!'
            },
            len:{
                args: [5,100],
                msg: "O campo email deve ter entre 5 e 100 caracteres"
            } 
        }
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
        len: [6,18],
        get() {
            return () => this.getDataValue('senha')
        }
    },
    salt: {
        type: Sequelize.STRING,
        get() {
            return() => this.getDataValue('salt')
        }
    },
    token:{
        type: Sequelize.STRING,
        allowNull: true,
        get() {
            return() => this.getDataValue('token')
        }
    },
}, { sequelize, modelName: 'usuarios' });

Usuario.generateSalt = function() {
    return crypto.randomBytes(16).toString('base64')
}

Usuario.encryptPassword = function(plainText, salt) {
    return crypto
        .createHash('RSA-SHA256')
        .update(plainText)
        .update(salt)
        .digest('hex')
}

const setSaltAndPassword = user => {
    if (user.changed('senha')) {
        user.salt = Usuario.generateSalt()
        user.senha = Usuario.encryptPassword(user.senha(), user.salt())
    }
}

Usuario.prototype.comparePassword = function(enteredPassword) {
    return Usuario.encryptPassword(enteredPassword, this.salt()) === this.senha()
}


Usuario.prototype.generateAuthToken = function() {
    return new Promise((success, reject) => {
      // Generate an auth token for the user
        const usuario = this
        let data = {usuarioId: usuario.id, email: usuario.email}

        //Cria o token
        const token = jwt.sign(
         data, //Dado que será salvo no token 
         'supersegredo') //Palavra chave secreta para criptografia
//       {expiresIn: '7d'}) //Tempo de duração do Token

      usuario.token = token

      //Salvar o Token no documento do usuário
      usuario.save()
      .then(() =>{
          //Retornar uma Promises de sucesso
          success({
            token: token
          });
      })
      .catch(err => {
        //Retornar uma Promises de erro
          reject({
            msg: "Erro ao gerar token JWT!",
            'error': err.errmsg
          });
      })
    });
  };

Usuario.beforeCreate(setSaltAndPassword)
Usuario.beforeUpdate(setSaltAndPassword)


module.exports = Usuario;