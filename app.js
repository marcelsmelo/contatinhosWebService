const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');



//Documentação Swagger
//Importar Swagger-ui-Express e SwaggerJSDoc
const swaggerUi = require('swagger-ui-express');
let swaggerJSDoc = require('swagger-jsdoc');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());

global.logger = require('winston');
logger.remove(logger.transports.Console)
logger.add(logger.transports.Console, { colorize: true });
logger.level = 'debug';

//app.use(morgan('dev'));
//app.use(morgan(':date[clf] - :method :url :status :response-time ms - :res[content-length]'))


const load = require('express-load');



// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
//================= Docs Swagger =========================
//==========================================================

// swagger definition
let swaggerDefinition = {
    openapi: '3.0.1',
    info: {
      title: 'API aplicativo anúncios', //Nome da API
      version: '1.0.0', //Versão da API
      description: 'API de manipulação de anúncios para as disciplinas do TSI',
    },
    //host: 'anuncios.marcelmelo.com.br', //URL base da API
    basePath: '/',
    components: {
        securitySchemes:{
            "BearerAuth": { "type": "http", "scheme": "bearer" }
        }
    }
    
  };
  
  // options for the swagger docs
  let options = {
    // import swaggerDefinitions, definido anteriormente
    swaggerDefinition: swaggerDefinition,
    // arquivos que contem especificações para geração da documentação
    apis: ['./documentacao/modelsDoc.js', './documentacao/lib.js', './documentacao/*.js'],
    
  };
  
  // initialize swagger-jsdoc
  let swaggerSpec = swaggerJSDoc(options);

  //Rota para acessar a documentação
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


/**********************
 ******** ROTAS *******
 **********************/
load('controllers')
    .then('routes')
    .into(app);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500).json({ error: err });
});

module.exports = app;