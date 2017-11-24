module.exports = {
    getContatinho: (req, res) => {
        let resposta = require('../esportivos.json');
        res.status(200).json(resposta);
    },
    getContatinhoByID: (req, res) => {
        let resposta = require('../classicos.json');
        res.status(200).json(resposta);
    },
}