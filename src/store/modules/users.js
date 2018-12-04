import * as types from '../mutation-types'

let users = [
  {"username":"Lucy","password":"123456",login:false,info:{
    following:[]
    }},
  {"username":"qweasd","password":"123456",login:false,info:{
      following:[]
    }},
  {"username":"iopjkl","password":"123456",login:false,info:{
      following:[]
    }}
];

const state = {user:{...users[0]}};

const mutations = {
  [types.SIGN_UP_USER](state,payload){
    users.push({username:payload.username,password:payload.password,login:true,info:{following:[]}});
    if(payload.isChecked){
      localStorage.setItem(payload.username,payload.password);
    }
    state.user = users[users.length-1];console.log(state.user);
  },
  [types.GET_USER_INFO](state,username){
    for(let i = 0,len = users.length; i<len; i++){
      if(users[i].username === username){
        state.user = users[i];
      }
    }
  },
  [types.CHANGE_USER_INFO](state,payload){
    payload.follow && state.user.info.following.indexOf(payload.follow) === -1?
      state.user.info.following.push(payload.follow):'';
    payload.unfollow && state.user.info.following.indexOf(payload.unfollow) !== -1?
      state.user.info.following.splice(state.user.info.following.indexOf(payload.unfollow),1):'';
  }
};

const getters = {
  userInfo : state => state.user
};
export default {
  state,
  getters,
  mutations
}

