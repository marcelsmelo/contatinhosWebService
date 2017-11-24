const Sequelize = require('sequelize')
const sequelize = require('../config/db');

const Contatinho = sequelize.define('contatinho', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    telefone: {
        type: Sequelize.CHAR(20),
        allowNull: false,
    },
    info: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
});

module.exports = Contatinho;