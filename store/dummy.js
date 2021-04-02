db={
  'user':[
    {
      id:'1',
      name:'Carlos',
    },
  ]
}
/////////////////////////////////////////////////
async function list(table){
  return db[table] || [];
}
/////////////////////////////////////////////////
async function get(table,id){
  let col = await list(table);
  return col.filter(item => item.id===id)[0]|| null;
}
/////////////////////////////////////////////////
async function upsert(table,data){
  if(!db[table]){
    db[table] = [];
  }
  db[table].push(data);
  console.log(db);
  return true;
}
/////////////////////////////////////////////////
async function remove(table,id){
  return true;
}
////////////////////////////////////////////////
async function query (tabla,q){
  let col = await list(tabla);
  let keys = Object.keys(q);//retorna un array de los keys del objecto
  let key = keys[0];
  return col.filter(item=>item[key]===q[key])[0]||null;
}
/////////////////////////////////////////////////
module.exports = {
  list,
  get,
  upsert,
  remove,
  query,
}