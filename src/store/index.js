/**
 * Created by 12973 on 2018/8/8.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions.js'
import * as getters from './getters.js'

import Main from './modules/main.js'
import Author from './modules/author.js'
import Users from './modules/users.js'
import Article from './modules/article.js'

Vue.use(Vuex);

//当为开发环境时启用严格模式，当为生产环境时禁用严格模式
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  actions,
  getters,
  modules:{
    Main,
    Author,
    Users,
    Article
  },
  strict: debug
});
