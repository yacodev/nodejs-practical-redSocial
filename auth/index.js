const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const secret = config.jwt.secret
///////
function sign(data){
  return jwt.sign(data,secret);
}
///////
function verify(token){
  return jwt.verify(token,secret)
}
///////
const check = {
  own: function(req,owner){
    const decoded = decodeHeader(req);//decodificar el token
    console.log(decoded);
    //comprobar si es o no propio el token
    if(decoded.id!==owner){
      //throw new Error ('No puedes editar ');
      throw error('No puedes editar ',401);
    }
  }
}
///////
function getToken(auth){
  if (!auth){
    throw new Error('No viene token');
  }
  if(auth.indexOf('Bearer')===-1){//no encuentre el bearer en el token
    throw new Error('Formato Invalido')
  }
  let token = auth.replace('Bearer ','');
  return token
}
///////
function decodeHeader(req){
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  const decoded = verify(token);
  req.user = decoded;
  return decoded;
}
//////
module.exports={
  sign,
  check,
}