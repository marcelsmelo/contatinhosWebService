const Contatinho = require('../model/Contatinho');

module.exports = {
    getContatinhos: (req, res, next) => {
        Contatinho.findAll().then(contatinhos => {
            res.status(200).json(contatinhos);
        }).catch(error => {
            res.status(500).json(null);
        });

    },
    getContatinhoByID: (req, res, next) => {
        Contatinho.findById(req.param.id).then(contatinho => {
            res.status(200).json(contatinho);
        }).catch(error => {
            res.status(500).json(null);
        });
    },
    getContatinhoByName: (req, res, next) => {
        Contatinho.findById(req.param.nome).then(contatinho => {
            res.status(200).json(contatinho);
        }).catch(error => {
            res.status(500).json(null);
        });
    },
    createContatinho: (req, res, next) => {
        const contact = req.body;
        Contatinho.create(contact).then(contatinho => {
            res.status(201).json(null);
        }).catch(error => {
            res.status(500).json(null);
        });
    },
    deleteContatinhoById: (req, res, next) => {
        Contatinho.destroy({
            where: {
                id: req.param.id
            }
        }).then((rows) => { //Número de linhas afetadas
            res.status(200).json(contatinho);
        }).catch(error => {
            res.status(500).json(null);
        });
    },
}