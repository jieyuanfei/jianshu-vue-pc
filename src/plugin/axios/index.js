import Vue from 'vue'
import { Message,Loading } from 'element-ui'
import axios from 'axios'
import Cookies from 'js-cookie'
let loading = null
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = '/api/'
}
axios.defaults.headers.Authorization = localStorage['token'] || null
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  loading = Loading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.1)'
  });
  config.headers['x-csrf-token'] = Cookies.get('csrfToken')
  return config
}, function (error) {
  loading.close()
  // Do something with request error
  return Promise.reject(error)
})
// 在这里对返回的数据进行处理
// 在这里添加你自己的逻辑
axios.interceptors.response.use(res => {
  loading.close()
  // console.log(res)
  if(res.data.success){
    if(res.data.code === 0){
      return Promise.resolve(res.data.data)
    }else if(res.data.code === 401){
      return Promise.reject(res.data)
    }else{
      return Promise.reject(res.data)
    }
  }else {
    Message.error(res.data.msg)
    return Promise.reject(res.data)
  }

}, error => {
  loading.close()
  if (error.response.status === 401) {
    location.href = location.protocol + '//' + location.host + location.pathname + '#/login'
  } else {
    return Promise.reject(error)
  }
})
Vue.prototype.$axios = axios
