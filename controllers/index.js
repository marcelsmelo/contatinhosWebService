module.exports = {
    getContatinhos: (req, res) => {
        Contatinho.findAll().then(contatinhos => {
            res.status(200).json(contatinhos);
        }).catch(error => {
            res.status(500).json(null);
        });

    },
    getContatinhoByID: (req, res) => {
        Contatinho.findById(req.param.id).then(contatinho => {
            res.status(200).json(contatinho);
        }).catch(error => {
            res.status(500).json(null);
        });
    },
    getContatinhoByName: (req, res) => {
        Contatinho.findById(req.param.nome).then(contatinho => {
            res.status(200).json(contatinho);
        }).catch(error => {
            res.status(500).json(null);
        });
    },
    createContatinho: (req, res) => {
        const contact = req.body;
        Contatinho.create(contact).then(contatinho => {
            res.status(201).json(null);
        }).catch(error => {
            res.status(500).json(null);
        });
    },
}