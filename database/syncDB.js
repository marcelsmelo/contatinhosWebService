const dotenv = require('dotenv');
dotenv.config();

require('./dbMysql')

const Usuario = require('../model/Usuario')
const Contatinho = require('../model/Contatinho')

Usuario.sync()
.then(()=>{
      Contatinho.sync()
      .then(()=>{
            console.log("Sincronização realizada com sucesso!")
      })
      
})







