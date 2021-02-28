db={
  'user':[
    {
      id:'1',
      name:'Carlos',
    }
  ]
}
async function list(table){
  return db[table];
}
async function get(table,id){
  let col = await list(table);
  return col.filter(item => item.id===id) || null;
}
async function upsert(table,data){
  db[table].push(data);
  return true;
}
async function remove(table,id){
  return true;
}
module.exports = {
  list,
  get,
  upsert,
  remove,
}