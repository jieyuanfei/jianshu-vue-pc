// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// 异步请求库
import '@/plugin/axios'

// markdown插件
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor)

// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 全屏控制
import screenfull from 'screenfull'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted () {
    // 检测退出全屏
    if (screenfull.enabled) {
      screenfull.on('change', () => {
        if (!screenfull.isFullscreen) {
          // this.$store.commit('d2adminFullScreenSet', false)
        }
      })
    }
  }
});
