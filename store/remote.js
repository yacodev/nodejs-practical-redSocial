const request = require('request');//permite hacer perticiones http

function createRemoteDB(host,port){
  const URL = 'http://'+host+':'+port;
  //funcion listar(table)
  function list(table){
    return req('GET',table);
  }
  //function get(table,id){}
  function upsert(table,data){
    return req('POST',table,data);
  }
  //function query(table,query,join)

  function req(method,table,data){
    let url = URL +'/'+table;
    let body='';//body
    return new Promise((resolve,reject)=>{
      request({
        method,
        headers:{
          'content-type':'application/json',
        },
        url,
        body,
      }, (err,req,body)=>{
        if(err){
          console.error('Error con la base de datos remota',err);
          return reject(err.message);
        }
        const resp = JSON.parse(body);
        return resolve(resp.body);
      })
    })
  }
  return{
    list,
    upsert,
  }
}
module.exports=createRemoteDB;