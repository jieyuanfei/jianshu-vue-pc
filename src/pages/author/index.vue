<template>
  <div class="author">
    <div class="main-left">
      <div class="author-top">
        <a href="#" class="author-avatar">
          <img :src="author.img" alt="">
        </a>
        <a href="javascript:void(0)" class="btn" :class="{'btn-success':!isFollow,follow:!isFollow,'following':isFollow,'btn-default':isFollow}" @click="toggleFollow()"><i class="iconfont"  :class="{'ic-follow':!isFollow,'ic-followed':isFollow}"></i><span :value="followBtnInfo">关注</span></a>
        <a href="javascript:void(0)" class="btn btn-hollow">投稿</a>
        <div class="title"><a href="#" class="name" v-text="author.title"></a></div>
        <div class="info">收录了{{author.info.recordCount}}篇文章<br/>{{author.info.followCount}}人关注</div>
      </div>
      <ul class="trigger-menu">
        <li :class="{active: check[0]===true}"><a href="javascript:;" @click="chooseArticles('latestComments')"><i class="iconfont ic-latestcomments"></i>最新评论</a></li>
        <li :class="{active: check[1]===true}"><a href="javascript:;" @click="chooseArticles('latestRecords')"><i class="iconfont ic-articles"></i>最新收录</a></li>
        <li :class="{active: check[2]===true}"><a href="javascript:;" @click="chooseArticles('hots')"><i class="iconfont ic-hot"></i>热门</a></li>
      </ul>
      <div class="list-container">
        <ul class="note-list">
          <li class="have-img" v-for="item in articles">
            <a href="#" class="wrap-img"><img :src="item.img" alt="" class="img-blur-done"></a>
            <div class="content">
              <a href="#" class="title" v-text="item.title"></a>
              <p class="abstract" v-text="item.content"></p>
              <div class="meta">
                <a href="#" class="nickname" v-text="item.author"></a>
                <a href="#" v-text="item.command"><i class="iconfont ic-list-comments"></i></a>
                <span v-text="item.like"><i class="iconfont ic-list-like"></i></span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="main-right">
      <p class="title">专题公告</p>
      <div class="description">
        <p v-for="item in moreInfo.description" v-html="item"></p>
        <a href="#" class="open">展开描述 <i class="iconfont ic-show"></i></a>
      </div>
      <div class="share">
        <span>分享到</span>
        <a href="#" class="option"><i class="iconfont ic-share-weibo"></i></a>
        <a href="#" class="option"><i class="iconfont ic-share-wechat"></i></a>
      </div>
      <p class="title">管理员</p>
      <ul class="list collection-editor">
        <li v-for="(item,index) in moreInfo.editors">
          <a href="#" class="avatar"><img :src="item.img" alt=""></a>
          <a href="#" class="name" v-text="item.name"></a>
          <span class="tag" v-show="index === 0">创建者</span>
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
      articles:[],
      moreInfo:{},
      check:[true,false,false],
      followBtnInfo:'关注'
    }
  },
  created(){
    this.chooseArticles('latestComments');
  },
  computed:{
    isFollow:{
      get(){
        if(!this.isLogin){
          return false;
        }else if(this.user.info.following.indexOf(this.author.title) === -1){
          return false;
        }else {
          return true;
        }
      },
      set(){}
    },
    isLogin:{
      get(){
        return Boolean(sessionStorage.getItem('isLogin') === 'true')
      },
      set(){
        sessionStorage.setItem('isLogin','false')
      }
    },
    ...mapState({
      author:state => state.Author.authorInformation[0],
      user:state => state.Users.user
    })
  },
  methods:{
    chooseArticles(str){
      //实现最新评论、最新收录、热门的选中状态的显示
      this.moreInfo = this.author.more;

      switch (str) {
        case 'latestComments':
          this.check = [true,false,false];
          this.articles = this.author.articleLists.newestCommands;break;
        case 'latestRecords':
          this.check = [false,true,false];
          this.articles = this.author.articleLists.newestRecords;break;
        case 'hots':
          this.check = [false,false,true];
          this.articles = this.author.articleLists.hots;break;
        default:
          this.check = [true,false,false];
          this.articles = this.author.articleLists.newestCommands;break;
      }
    },
    toggleFollow(){
      if(this.isLogin){
        if(!this.isFollow){
          this.followBtnInfo = '已关注';
          this.$store.dispatch('changeAuthorInfo',{
            title:this.author.title,
            followCount:Number(this.author.info.followCount)+1
          });
          this.$store.dispatch('changeUserInfo',{
            follow:this.author.title
          });
        }else {
          this.followBtnInfo = '关注';
          this.$store.dispatch('changeAuthorInfo',{
            title:this.author.title,
            followCount:this.author.info.followCount-1
          });
          this.$store.dispatch('changeUserInfo',{
            unfollow:this.author.title
          });
        }
        this.isFollow = !this.isFollow;
      }else {
        this.$router.push('/signIn');
      }
    }
  }
}
</script>

<style>
.author {
  width: 960px;
  margin: 0 auto;
  padding: 20px 0;
}
.author .author-top {
  margin-bottom: 35px;
}
.author .author-top .author-avatar{
  float: left;
  width: 80px;
  height: 80px;
}
.author .author-top .following {
  padding: 8px 0;
  width: 100px;
}
.author .author-top .following span, .follow span {
  margin-left: 2px;
  display: inline;
}
.author .author-top .author-avatar img {
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 10%;
}
.author .author-top .btn {
  float: right;
  margin: 20px 0 23px 16px;
  font-size: 15px;
}
.author .author-top .follow{
  padding: 8px 0;
  width: 100px;
}
.author .author-top .follow span {
  margin-left: 2px;
  display: inline;
}
.author .author-top .btn-hollow {
  padding: 8px 0;
  width: 90px;
}
.author .author-top .title {
  padding: 0 0 0 100px;
}
.author .author-top .title .name {
  display: inline;
  font-size: 21px;
  font-weight: 700;
  vertical-align: middle;
}
.author .author-top .info {
  margin-top: 10px;
  padding-left: 100px;
  font-size: 14px;
  color: #969696;
}
.author .trigger-menu {
  margin-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 0;
  list-style: none;
}
.author .trigger-menu li {
  position: relative;
  display: inline-block;
  padding: 8px 0;
  margin-bottom: -1px;
}
.author .trigger-menu li.active {
  border-bottom: 2px solid #646464;
}
.author .trigger-menu a {
  padding: 13px 20px;
  font-size: 15px;
  font-weight: 700;
  color: #969696;
  line-height: 25px;
}
.author .trigger-menu i {
  margin-right: 5px;
  font-size: 17px;
}
.author .main-right .title {
  float: left;
  margin-bottom: 10px;
  font-size: 14px;
  color: #969696;
}
.author .main-right .description {
  position: relative;
  margin-bottom: 20px;
  padding: 0 0 16px;
  text-align: left;
  font-size: 14px;
  border-bottom: 1px solid #f0f0f0;
  clear: both;
  word-break: break-word!important;
  /*word-break: break-all;*/
}
.author .main-right .description p {
  margin: 0 0 10px;
}
.author .main-right .description .open {
  color: #969696;
}
.author .main-right .share {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
  line-height: 30px;
}
.author .main-right .share span {
  font-size: 14px;
  vertical-align: middle;
}
.author .main-right .share .option {
  margin-left: 10px;
  color: #333;
}
.author .main-right .list {
  margin-bottom: 20px;
  padding-bottom: 10px;
  list-style: none;
  border-bottom: 1px solid #f0f0f0;
  clear: both;
}
.author .main-right .list li {
  margin-bottom: 10px;
}
.author .main-right .list li a {
  display: inline-block;
}
.author .main-right li .name {
  position: relative;
  max-width: 236px;
  vertical-align: middle;
  top: 1px;
  font-size: 14px;
  color: #333;
}
.author .main-right li .tag {
  padding: 1px 3px;
  margin-left: 2px;
  border-radius: 3px;
  font-size: 12px;
  color: #969696;
  border: 1px solid #969696;
}
</style>
