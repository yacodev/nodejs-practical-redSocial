const express = require('express');

const swaggerUi = require('swagger-ui-express');// libreria para documentacion 

const config = require('../config');
const user = require('./components/user/network');


const app = express();

app.use(express.json());
const swaggerDoc = require('./swagger.json')//documentacion

//ROUTER
app.use('/api/user',user);
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDoc));//para servir documentacion

app.listen(config.api.port, ()=>{
  console.log('API escuchando en el puerto:',config.api.port);
})