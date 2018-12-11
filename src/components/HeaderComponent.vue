<template>
  <div class="header-component">
    <router-link to="/" class="header-logo"><img src="../../static/img/logo.png"/></router-link>
    <router-link to="/writeArticle" class="btn write-btn"><i class="iconfont ic-write"></i>写文章</router-link>
    <router-link to="/signUp" class="btn sign-up" v-if="!navShow">注册</router-link>
    <router-link to="/signIn" class="btn log-in" v-if="!navShow">登录</router-link>
    <span class="btn log-in userInfo" v-if="navShow">
       <el-dropdown placement="bottom-start">
        <span class="el-dropdown-link">
          <img src="../../static/img/author-hots1.jpg"/><i class="el-icon-caret-bottom updown"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><i class="el-icon-service orange"></i> 我的主页</el-dropdown-item>
          <el-dropdown-item><i class="el-icon-star-off orange"></i> 收藏的文章</el-dropdown-item>
          <el-dropdown-item><i class="el-icon-view orange"></i> 喜欢的文章</el-dropdown-item>
          <el-dropdown-item><i class="el-icon-sold-out orange"></i> 已购内容</el-dropdown-item>
          <el-dropdown-item><i class="el-icon-goods orange"></i> 我的钱包</el-dropdown-item>
          <el-dropdown-item><i class="el-icon-setting orange"></i> 设置</el-dropdown-item>
          <el-dropdown-item><i class="el-icon-question orange"></i> 帮助反馈</el-dropdown-item>
          <el-dropdown-item><i class="el-icon-back orange"></i> 退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
     </span>
    <div class="container">
      <ul class="nav navbar-nav">
        <li class="tab" v-if="!navShow">
          <router-link to="/">
            <span class="menu-text">首页</span>
            <i class="iconfont ic-navigation-discover menu-icon"></i>
          </router-link>
        </li>
        <li class="tab" v-if="!navShow">
          <router-link to="/download" class="app-download-btn"><span class="menu-text">下载APP</span><i
            class="iconfont menu-icon ic-navigation-download"></i></router-link>
        </li>
        <li class="tab" v-if="navShow">
          <router-link to="/">
            <span class="menu-text">发现</span>
          </router-link>
        </li>
        <li class="tab" v-if="navShow">
          <a>
            <span class="menu-text">关注</span>
          </a>

        </li>
        <li class="tab news" v-if="navShow">
          <el-dropdown placement="bottom-start">
            <el-badge :value="1" class="item">
              <span class="menu-text">消息</span>
            </el-badge>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><i class="el-icon-service orange"></i> 我的主页</el-dropdown-item>
              <el-dropdown-item><i class="el-icon-star-off orange"></i> 收藏的文章</el-dropdown-item>
              <el-dropdown-item><i class="el-icon-view orange"></i> 喜欢的文章</el-dropdown-item>
              <el-dropdown-item><i class="el-icon-sold-out orange"></i> 已购内容</el-dropdown-item>
              <el-dropdown-item><i class="el-icon-goods orange"></i> 我的钱包</el-dropdown-item>
              <el-dropdown-item><i class="el-icon-setting orange"></i> 设置</el-dropdown-item>
              <el-dropdown-item><i class="el-icon-question orange"></i> 帮助反馈</el-dropdown-item>
              <el-dropdown-item><i class="el-icon-back orange"></i> 退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li class="search">
          <form>
            <input type="text" placeholder="搜索" class="search-input" @focus="changeWidth('longer')"
                   @blur="changeWidth('shorter')"/>
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
    data() {
      return {
        navShow: false
      }
    },
    computed: {
      isLogin: {
        get() {
          console.log(Boolean(sessionStorage.getItem('isLogin')))
          return Boolean(sessionStorage.getItem('isLogin'))
        },
        set() {
          sessionStorage.setItem('isLogin', 'false')
        }
      },
      ...mapState({
        userInfo: state => state.Users.user
      })
    },
    methods: {
      changeWidth(str) {
        let el = event.target;
        if (str === 'shorter') {
          el.style.width = '140px';
        } else if (str === 'longer') {
          el.style.width = '200px';
        }
      }
    }
  }
</script>
<style scoped>
  .header-component {
    height:56px;
    border-top:1px solid #f0f0f0;
    border-bottom:1px solid #f0f0f0;
    width:100%;
  }
  .header-logo {
    width:100px;
    display:inline-block;
  }
  .header-logo img {
    height:100%;
    width: 100%;
  }
  .write-btn {
    float: right;
    width: 100px;
    height: 40px;
    line-height: 24px;
    margin: 8px 15px 0;
    border-radius: 20px;
    font-size: 15px;
    color: #fff;
    background-color: #ea6f5a;
  }
  .sign-up {
    float: right;
    width: 80px;
    height: 38px;
    line-height: 24px;
    margin: 9px 5px 0 15px;
    border: 1px solid rgba(236,97,73,.7);
    color: rgba(236,97,73,.7);
    border-radius: 20px;
    font-size: 15px;
  }
  .sign-up:hover {
    color: #ec6149;
    border-color: #ec6149;
    background-color: rgba(236,97,73,.05);
  }
  .log-in {
    float: right;
    margin: 11px 6px 0 10px;
    font-size: 15px;
  }
  .log-in:hover {
    color: #969696;
  }
  .container {
    margin-right: auto;
    margin-left: auto;
    margin-top:-58px;
    padding-left: 15px;
    padding-right: 15px;
  }
  .navbar-nav {
    float: left;
    margin: 0;
  }
  .navbar-nav li {
    margin-right: 5px;
    float: left;
  }
  .navbar-nav>.active>a {
    color: #ea6f5a;
    background: none;
  }
  .navbar-nav li>a {
    padding-top: 18px;
  }
  .tab a {
    height: 56px;
    line-height: 26px;
    padding: 15px;
    color: #333;
  }
  .nav form {
    position: relative;
    top: 9px;
    margin:0 0 20px;
  }
  .nav form .ic-search {
    margin: 7px -1px 0 0;
    display: block;
  }
  .nav form .search-input {
    padding: 0 40px 0 20px;
    width: 160px;
    height: 38px;
    font-size: 14px;
    border: 1px solid #eee;
    border-radius: 40px;
    background: #eee;
  }
  .nav form .search-btn {
    position: absolute;
    top: 4px;
    right: 5px;
    width: 30px;
    height: 30px!important;
    line-height: normal!important;
    padding: 0!important;
    color: #969696!important;
    text-align: center;
  }
  .navbar-search-tips {
    position: absolute;
    background-color: #fff;
    box-shadow: 0 0 8px rgba(0,0,0,.2);
    margin-top: 9px;
    width: 250px;
    left: 0;
    top: 100%;
    visibility: hidden;
    opacity: 0;
    border-radius: 4px;
  }
  .search input {
    transition:width 0.3s ease-in-out;
  }
  .search-trending {
    padding: 20px 20px 10px;
    border-bottom: 1px solid #f0f0f0;
  }
  .search-trending-header {
    height: 20px;
    margin-bottom: 10px;
  }
  .search-trending-header  span {
    float: left;
    font-size: 14px;
    color: #969696;
  }
  .search-trending-header a{
    float: right;
    font-size: 13px;
    color: #969696;
    background-color: transparent;
    border-width: 0;
    padding: 0;
  }
  .search-trending-header i {
    display: inline-block;
    line-height: 1;
    transition: .5s ease;
  }
  .search-trending-tag-wrap {
    font-size: 0;
  }
  .search-trending-tag-wrap li {
    margin-right: 10px;
    display: inline-block;
    line-height: 28px;
  }
  .search-trending-tag-wrap li a {
    padding: 2px 6px;
    font-size: 12px;
    color: #787878;
    border: 1px solid #ddd;
    border-radius: 3px;
  }
  .userInfo {
    margin: 0;
    height: 100%;
    border-radius: 0;
  }

  .userInfo:hover {
    background: #eee;
  }

  .userInfo img {
    border: gainsboro;
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }

  .orange {
    margin-right: 10px;
    font-size: 18px;
    color: #ea6f5a;
  }

  .updown {
    font-size: 18px;
    color: #999;
  }

  .tab.news {
    margin: 19px 40px 0 0;
  }
  .tab .menu-text{
    font-size: 16px;
  }
</style>
<style>
  .nav li.tab .el-badge__content.is-fixed {
    right: 1px;
  }
</style>


