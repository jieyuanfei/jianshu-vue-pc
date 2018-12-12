/**
 * Created by 12973 on 2018/8/8.
 */
import * as types from './mutation-types.js'

export const confirmAuthor = ({commit},str)=>{
  commit(types.CONFIRM_AUTHOR,str)
};

export const anotherAuthors = ({commit}) =>{
  commit(types.ANOTHER_AUTHORS)
};

export const signUpUser = ({commit},payload) =>{
  commit(types.SIGN_UP_USER,payload);
};


export const changeAuthorInfo = ({commit},payload)=>{
  commit(types.CHANGE_AUTHOR_INFO,payload);
};

export const getUserInfo = ({commit,state},str) => {
  commit(types.GET_USER_INFO,str);
};

export const changeUserInfo = ({commit},payload)=>{
  commit(types.CHANGE_USER_INFO,payload);
};

export const logout = ({commit},payload)=>{
  commit(types.LOGOUT,payload);
};

export const getArticle = ({commit,state},payload) => {
  commit(types.GET_ARTICLE,payload);
};
export const updateArticle = ({commit,state},payload) => {
  commit(types.UPDATE_ARTICLE,payload);
};
