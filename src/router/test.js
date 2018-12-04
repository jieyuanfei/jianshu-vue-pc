import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
//https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%AE%88%E5%8D%AB
const router = new Router({
  routes: [
    {
      path: '/',
      /*
      * 按需加载
      */
      component: (resolve) => {
        require(['../components/Home'], resolve)
      }
    }, {
      path: '/record',
      name: 'record',
      component: (resolve) => {
        require(['../components/Record'], resolve)
      }
    }, {
      path: '/Register',
      name: 'Register',
      component: (resolve) => {
        require(['../components/Register'], resolve)
      }
    }, {
      path: '/Luck',
      name: 'Luck',
      // 需要登录才能进入的页面可以增加一个meta属性
      meta: {
        requireAuth: true
      },
      component: (resolve) => {
        require(['../components/luck28/Luck'], resolve)
      }
    }
  ]
})
// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
    if (localStorage.getItem('username')) {// 判断是否登录
      next()
    } else {// 没登录则跳转到登录界面
      next({
        path: '/Register',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

export default router
