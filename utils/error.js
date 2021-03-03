function err(message, code){
  let e = new Error(message);
  if(code){
    e.statuscode = code;
  }
  return e;
}

module.exports = err;