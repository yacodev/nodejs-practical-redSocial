const express = require('express');

const config = require('../config');
const router = require('./network');

const app = express();
app.use(express.json());
//Rutas
app.use('/',router);
app.listen(config.mysqlService.port,()=>{
  console.log('serivcio de mysql escuchando el puerto',config.mysqlService.port);
})