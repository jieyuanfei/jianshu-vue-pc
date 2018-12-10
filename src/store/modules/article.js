import * as types from '../mutation-types'


const state = {
  article: {},
  updateArticle:{},
};

const mutations = {
  [types.GET_ARTICLE](state,atticle){
    state.article = atticle;
  },
  [types.UPDATE_ARTICLE](state,atticle){
    state.updateArticle = atticle;
  }
};

const getters = {
  article : state => state.article,
  updateArticle : state => state.updateArticle
};
export default {
  state,
  getters,
  mutations
}

