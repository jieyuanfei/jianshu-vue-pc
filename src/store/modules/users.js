import * as types from '../mutation-types'


const state = {user:null};

const mutations = {

  [types.GET_USER_INFO](state,str){
    let user = JSON.parse(localStorage.getItem('userInfo'));
    if(!user){
      user = JSON.parse(sessionStorage.getItem('userInfo'))
    }
    state.user = user
  },
  [types.CHANGE_USER_INFO](state,payload){
    if(payload.isChecked){
      localStorage.setItem('userInfo',JSON.stringify(payload))
    }else{
      sessionStorage.setItem('userInfo',JSON.stringify(payload))
    }
    state.user = payload
  },
  [types.LOGOUT](state,payload){
    localStorage.removeItem('userInfo')
    sessionStorage.removeItem('userInfo')
    localStorage.removeItem('token')
    console.log("logout")
    state.user = null
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

