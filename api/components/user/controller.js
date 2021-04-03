const {nanoid} = require('nanoid');
const auth = require('../auth');//para gestion de la tabla autorizacion
const TABLA = 'user';

module.exports = function(injectedStore){
  //verificamos si viene la BD
  let store = injectedStore;
  if(!store){
    store = require('../../../store/dummy');
  }
  /////////////////////////////////////////////////
  function list(){
    return store.list(TABLA);
  }
  /////////////////////////////////////////////////
  function get(id){
    return store.get(TABLA,id);
  }
  ////////////////////////////////////////////////
  async function upsert(body){
    const user = {
      name:body.name,
      username:body.username,
    }
    //generamos su id
    if(body.id){
      user.id=body.id;
    }else{
      user.id=nanoid();
    }
    //si los datos tiene password o username se envia a la identidad auth
    if(body.password || body.username){
      await auth.upsert({
        id: user.id,
        username : user.username,
        password : body.password,
      })
    }
    return store.upsert(TABLA,user);
  }
  //////////////////////////////////////////
  function remove(id){
    return store.remove(TABLA,id);
  }
  //////////////////////////////////////////////////////////////////////////////////////////
  function follow(from, to){
    return store.upsert(TABLA+'_follow',{
      user_from:from,
      user_to:to,
    });
  }
  //////////////////////////////////////////////////////////////////////////////////////////
  async function following(user){
    const join ={};
    join[TABLA]='user_to';//{user:user_to}
    const query = {user_from:user};

    return await store.query(TABLA+'_follow',query,join);
    //{user_follow,user_from:user,user:user_to}
  }
  ///////////////////////////////////////////////////////////////////////////////////////////
  return {
    list,
    get,
    upsert,
    remove,
    follow,
    following,
  }
}