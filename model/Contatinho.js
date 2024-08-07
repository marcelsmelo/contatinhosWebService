const Sequelize = require('sequelize')
const sequelize = require('../database/dbMysql');
const Usuario = require('./Usuario');

const Contatinho = sequelize.define('contatinho', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Já esqueceu o nome do contatinho?'
            },
            len:{
                args: [3,100],
                msg: "O campo nome deve ter entre 3 e 100 caracteres"
            } 
        }
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O campo descrição é obrigatório! Você vai esquecer depois'
            }
        }
    },
    telefone:{
        type: Sequelize.STRING, 
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O telefone do contatinho é obrigatório, não vacile'
            }
        }
    }
}, { sequelize, modelName: 'contatinho', tableName: 'contatinho' });

Contatinho.belongsTo(Usuario);

module.exports = Contatinho;