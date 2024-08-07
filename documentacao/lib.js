/**
@swagger
{
  components:{
    parameters:{
      'idParam':{
        'description': "ID do Contatinho",
        'in': 'query',
        'required': true,
        "schema":{
          "type": "int"
        }
      },
      'optionalIdParam':{
        'description': "ID do Contatinho (Opcional)",
        'in': 'query',
        'required': false,
        "schema":{
          "type": "int"
        }
      },
      'userParam':{
        'description': "Objeto Usuário",
        'in': "body",
        'required':true,
        "schema": {
          "$ref": "#/components/schemas/Usuario"
        }
      },
      'contatinhoParam':{
        'description': "Objeto Contatinho",
        'in': "body",
        'required':true,
        "schema": {
          "$ref": "#/components/schemas/Contatinho"
        }
      }
    },
    responses: {
      "genericError": {
        "description": "Erro ao executar a operação",
        "content":{
          "application/json":{
            "schema":{
              "type":"object",
              "properties":{
                "msg": { "type":"string"},
                "error": { "type":"string"}
              }
            }
          }
        }
      },
      "singleMsg":{
        "description": "Operação realizada com sucesso",
        "content":{
          "application/json":{
            "schema":{
              "type":"object",
              "properties":{
                "msg": { "type":"string"}
              }
            }
          }
        }
      },
      "arrayUsuarios":{
        "description": "Array de Usuarios solicitados",
        "content":{
          "application/json":{
            "schema":{
              "type":"array",
              "items":{
                "$ref":"#/components/schemas/Usuario"
              }
            }
          }
        }
      },
      "singleUsuario":{
        "description": "Usuario solicitado",
        "content":{
          "application/json":{
            "schema":{
              "$ref":"#/components/schemas/Usuario"
            }
          }
        }
      },
      "arrayContatinhos":{
        "description": "Array de Contatinhos solicitados",
        "content":{
          "application/json":{
            "schema":{
              "type":"array",
              "items":{
                "$ref":"#/components/schemas/Contatinho"
              }
            }
          }
        }
      },
      "singleContatinho":{
        "description": "Contatinho solicitado",
        "content":{
          "application/json":{
            "schema":{
              "$ref":"#/components/schemas/Contatinho"
            }
          }
        }
      },
      "autenticacaoError":{
        "description": "Erro na autenticação ou verificação do token de acesso!",
        "content":{
          "application/json":{
            "schema":{
              "type":"object",
              "properties":{
                "msg": { "type":"string"},
                "error":{ "type": "string"}
              }
            }
          }
        }
      },
      "acessoError":{
        "description": "O usuário não tem acesso a esta rota!",
        "content":{
          "application/json":{
            "schema":{
              "type":"object",
              "properties":{
                "msg": { "type":"string"},
                "error":{ "type": "string"}
              }
            }
          }
        }
      },
    }
  }
}
*/