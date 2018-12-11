<template>
  <div class="header-component">
     <router-link to="/" class="header-logo" ><img src="../../static/img/logo.png"/></router-link>
     <router-link to="/writeArticle" class="btn write-btn"><i class="iconfont ic-write"></i>写文章</router-link>
     <router-link to="/signUp" class="btn sign-up" v-if="!userInfo.login || !isLogin">注册</router-link>
     <router-link to="/signIn" class="btn log-in" v-if="!userInfo.login || !isLogin">登录</router-link>
     <span class="btn log-in" v-if="isLogin && userInfo.login">你好，{{userInfo.username}}</span>
     <div class="container">
        <ul class="nav navbar-nav">
           <li :class="{active: show}" class="tab" @click="toggleActive()"><router-link to="/"><span class="menu-text">首页</span><i class="iconfont ic-navigation-discover menu-icon"></i></router-link></li>
           <li :class="{active: !show}" class="tab" @click="toggleActive()"><router-link to="/download" class="app-download-btn"><span class="menu-text">下载APP</span><i class="iconfont menu-icon ic-navigation-download"></i></router-link></li>
           <li class="search">
              <form >
                 <input type="text" placeholder="搜索" class="search-input" @focus="changeWidth('longer')" @blur="changeWidth('shorter')"/>
                 <a class="search-btn"><i class="iconfont ic-search"></i></a>
                 <div class="navbar-search-tips">
                    <div class="search-trending">
                        <div class="search-trending-header clearfix">
                            <span>热门搜索</span>
                            <a><i class="iconfont ic-search-change" style="transform:rotate(0deg)"></i>换一批</a>
                        </div>
                        <ul class="search-trending-tag-wrap">
                            <li><a>区块链</a></li>
                            <li><a>小程序</a></li>
                            <li><a>三生三世</a></li>
                            <li><a>vue</a></li>
                            <li><a>rose的肉丝儿</a></li>
                            <li><a>狼医生</a></li>
                            <li><a>毕业</a></li>
                            <li><a>php</a></li>
                            <li><a>故事</a></li>
                            <li><a>flutter</a></li>
                        </ul>
                    </div>
                 </div>
              </form>
           </li>
        </ul>
     </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
export default {
  data(){
    return {
      show:true
    }
  },
  computed:{
    isLogin:{
      get(){
        console.log(Boolean(sessionStorage.getItem('isLogin')))
        return Boolean(sessionStorage.getItem('isLogin'))
      },
      set(){
        sessionStorage.setItem('isLogin','false')
      }
    },
    ...mapState({
      userInfo: state=> state.Users.user
    })
  },
  methods:{
    toggleActive(){
      this.show = !this.show;
    },
    changeWidth(str){
      let el = event.target;
      if(str === 'shorter'){
        el.style.width = '140px';
      }else if(str === 'longer'){
        el.style.width = '200px';
      }
    }
  }
}
</script>


