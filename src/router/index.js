import Vue from 'vue'
import Router from 'vue-router'

import Home from '../pages/home.vue'
import SignIn from '../pages/sign/signIn.vue'
import SignUp from '../pages/sign/signUp.vue'
import ArticleDetail from '../pages/article/aticleDetail'
const ArticleWrite = (resolve)=> require(['../pages/article/articleWrite.vue'],resolve);
const ArticleHistory = (resolve)=> require(['../pages/article/articleHistory.vue'],resolve);
const Download = (resolve)=> require([ '../pages/download'],resolve);
const Author = (resolve)=> require(['../pages/author'],resolve);

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name:'home',
      component:Home
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
      name:'signUp',
      component:SignUp
    },
    {
      path:'/articleWrite',
      name:'articleWrite',
      meta:{
        requireAuth: false
      },
      component:ArticleWrite
    },
    {
      path:'/articleHistory',
      name:'articleHistory',
      meta:{
        requireAuth: false
      },
      component:ArticleHistory
    },
    {
      path:'/articleDetail',
      name:'articleDetail',
      component:ArticleDetail
    },
    {
      path:'/author',
      name:'author',
      component:Author
    }
  ]
})

// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if(!userInfo){
      userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    }
    if (userInfo) {// 判断是否登录
      next()
    } else {// 没登录则跳转到登录界面
      next({
        path: '/signIn',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

export default router
