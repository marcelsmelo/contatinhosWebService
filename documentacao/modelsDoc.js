/** 
  @swagger
  {
    "components":{
      "schemas":{
        "Usuario":{
          "properties":{
            "id":{"type":"integer"},
            "nome":{"type":"string"},
            "email":{"type":"string"},
            "senha":{"type":"string"}
          }
        },
        "Contatinho":{
          "properties":{
            "id":{"type":"integer"},
            "nome": {"type":"string"},
            "descricao": {"type":"string"},
            "telefone": {"type": "string"},
            "usuarioId":{"type:":"integer"}
          }
        },
      }
    }
  }
*/
