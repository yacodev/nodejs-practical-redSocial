const express = require('express');

const config = require('../config');
const post = require('./components/post/network');
const error = require('../network/error');

const app = express();

app.use(express.json());//para trabajar con datos  en json


//ROUTER
app.use('/api/post',post);

//middleware de error tiene que colocarse al ultimo
app.use(error);

app.listen(config.post.port, ()=>{
  console.log('API POST escuchando en el puerto:',config.post.port);
})