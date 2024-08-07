/**
@swagger
  {
    "/usuario/" : {
      "get": {
        "description": "Busca os dados do usuário logado",
        "tags":['Usuário'],
        "security": [
            { "BearerAuth": [] }
          ],
        "parameters":[],
        "responses": {
          "200":{
            "$ref": "#/components/responses/singleUsuario"
          },
          "500":{
            "$ref": "#/components/responses/genericError"
          },
          "401":{
            "$ref": "#/components/responses/autenticacaoError"
          },
          "403":{
            "$ref": "#/components/responses/acessoError"
          }
        }
      },
      "post": {
        "description": "Cadastra um novo o usuário",
        "tags":['Usuário'],
        "parameters":[
          "$ref": "#/components/parameters/userParam"
        ],
        "responses": {
          "201": {
            "$ref": "#/components/responses/singleMsg"
          },
          "500":{
            "$ref": "#/components/responses/genericError"
          }
        }
      },
      "put":{
        "description": "Edita os dados do Usuário logado.",
        "tags":['Usuário'],
        "security": [
            { "BearerAuth": [] }
          ],
       "parameters":[
          "$ref": "#/components/parameters/userParam"
        ],
        "responses": {
          "200":{
            "$ref": "#/components/responses/singlemsg"
          },
          "500":{
            "$ref": "#/components/responses/genericError"
          },
          "401":{
            "$ref": "#/components/responses/autenticacaoError"
          }
        }
      },
      "delete": {
        "description": "Remove o Usuário logado.",
        "tags":['Usuário'],
        "security": [
            { "BearerAuth": [] }
          ],
         "parameters":[
          "$ref": "#/components/parameters/idParam"
        ],
        "responses": {
          "200":{
            "$ref": "#/components/responses/singlemsg"
          },
          "500":{
            "$ref": "#/components/responses/genericError"
          },
          "401":{
            "$ref": "#/components/responses/autenticacaoError"
          }
        }
      },
    },
    "/login": {
      "post": {
        "description": "Realiza o login do usuário cadastrado. ",
        "tags":['Login'],
        "parameters":[
          {
            name: "email",
            description: "E-mail do Usuário ",
            in: "body",
            required:true,
            "schema": {
              "type": "string"
            }
          },
          {
            name: "senha",
            description: "Senha do usuário ",
            in: "body",
            required:true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Usuário logado com sucesso.",
            "content":{
              "application/json":{
                "schema": {
                  "type":"object",
                  "properties":{
                    "token": { "type":"string"}
                  }
                }
              }
            }
          },
          "500":{
            "$ref": "#/components/responses/genericError"
          }
        }
      }
    },
    "/logout": {
      "post": {
        "description": "Realiza o logout do usuário",
        "tags":['Login'],
        "security": [
          { "BearerAuth": [] }
        ],
        "responses": {
          "200": {
            "$ref": "#/components/responses/singleMsg"
          },
          "500":{
            "$ref": "#/components/responses/genericError"
          },
          "401":{
            "$ref": "#/components/responses/autenticacaoError"
          }
        }
     }
   },

  }
*/