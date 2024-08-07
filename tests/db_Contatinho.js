const should = require('should');
const Contatinho = require('../model/Usuario.js');

describe('Test Contatinho Model', function() {
    var contatinho = {};

    it('Insert a new Contatinho on database', done => {

        Contatinho.create({
            nome: 'Meu contatinho',
            telefone: '(34) 99999-9999',
            info: 'De segunda-feira',
        }).then(result => {
            contatinho = result;
            contatinho.should.be.Object();
            contatinho.id.should.be.Number();
            contatinho.nome.should.be.equal('Meu contatinho');
            done();
        });
    });

    it('Not Insert a new Contatinho on database', done => {

        Contatinho.create({
            nome: 'Meu contatinho',
            //telefone: '(34) 99999-9999',
            info: 'De segunda-feira',
        }).then(result => {
            result.should.not.be.Object();
            done();
        }).catch(error => {
            error.should.be.Object();
            error.name.should.be.equal('SequelizeValidationError');
            done();
        });
    });

    it('Find a Contatinho by ID', done => {
        Contatinho.findById(contatinho.id).then(result => {
            result.should.be.Object();
            result.id.should.be.equal(contatinho.id);
            result.nome.should.be.equal(contatinho.nome);
            done();
        });
    });

    if ('Find a Contatinho by name', done => {
            Contatinho.findOne({ where: { name: Contatinho.nome } }).then(result => {
                result.should.be.Object();
                result.id.should.be.equal(Contatinho.id);
                result.nome.should.be.equal(Contatinho.nome);
                done();
            });
        });

    it('Delete a Contatinho on database', done => {
        Contatinho.destroy({
            where: {
                id: contatinho.id
            }
        }).then((rows) => { //Número de linhas afetadas
            rows.should.be.Number();
            rows.should.be.equal(1);
            done();
        });
    });
})