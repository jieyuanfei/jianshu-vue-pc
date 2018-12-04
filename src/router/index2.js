import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '../components/homepage.vue'
import SignIn from '../components/signIn.vue'
import SignUp from '../components/signUp.vue'
const WriteArticle = (resolve)=> require(['../components/writeArticle.vue'],resolve);
const Download = (resolve)=> require([ '../components/download.vue'],resolve);
const Author = (resolve)=> require(['../components/author'],resolve);

Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name:'homepage',
      component:HomePage
    },
    {
      path:'/download',
      name:'download',
      component:Download
    },
    {
      path:'/signIn',
      component:SignIn
    },
    {
      path:'/signUp',
      component:SignUp
    },
    {
      path:'/writeArticle',
      component:WriteArticle
    },
    {
      path:'/author',
      name:'author',
      component:Author
    }
  ]
})

// 定义一个路由的数组 类似于白名单黑名单
// const defaultRouterArr = ['/list/share'];
// router.beforeEach((to, from, next) => {
// // 如果匹配到这个数组
//   if (defaultRouterArr.indexOf(to.path) >= 0) {
//     // 执行各种操作 比如让他去登录  不让她进去等等  通过next方法来控制  详细参考vue路由
//     next()
//   } else {
//     next()
//   }
// });
