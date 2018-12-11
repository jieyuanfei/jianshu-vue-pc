import Vue from 'vue'
import Router from 'vue-router'

import Home from '../pages/home.vue'
import SignIn from '../pages/sign/signIn.vue'
import SignUp from '../pages/sign/signUp.vue'
import ArticleDetail from '../pages/article/AticleDetail'
const WriteArticle = (resolve)=> require(['../pages/article/writeArticle.vue'],resolve);
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
      component:SignUp
    },
    {
      path:'/writeArticle',
      mate:{
        requireAuth: true
      },
      component:WriteArticle
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
    if (localStorage.getItem('userInfo')) {// 判断是否登录
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
