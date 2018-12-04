<template>
  <div class="homepage">
    <div class="main-left">
      <div class="homepageCarousel" @mouseover="clearTimer()" @mouseout="selfAdd()">
        <div class="carouselshow">
          <transition-group  tag="ul" name="carousel">
            <li v-for="(img,index) in carouselImg" :key="index" v-show="mark === index">
              <a href="#"><img :src="img"/></a>
            </li>
          </transition-group>
        </div>
        <div class="carousel-bar">
          <span v-for="(item,index) in carouselImg" :key="index" :class="{active: mark === index}" @click="changeMark(index)"></span>
        </div>
      </div>
      <div class="hots">
        <a class="hot" @click="viewMore(hot.name)" v-for="hot in hots">
          <img :src="hot.src" alt=""><span class="name" v-text="hot.name"></span>
        </a>
        <a href="#" class="more-hot">更多热门主题<i class="iconfont ic-link"></i></a>
      </div>
      <div class="split-line"></div>
      <!--按需加载文章-->
      <article-list :articleList="articles"></article-list>
    </div>
    <div class="main-right">
      <div class="board">
        <a href="#"><img src="../../static/img/banner.png" alt=""></a>
        <a href="#"><img src="../../static/img/banner2.png" alt=""></a>
        <a href="#"><img src="../../static/img/banner3.png" alt=""></a>
        <a href="#"><img src="../../static/img/banner4.png" alt=""></a>
        <a href="#"><img src="../../static/img/banner5.png" alt=""></a>
      </div>
      <a href="javascript:;" id="download-qrcode">
        <img src="../../static/img/qrcode.png" alt="" class="qrcode">
        <div class="info">
          <div class="title" @click="getArticleList">下载简书手机App<i class="iconfont ic-link"></i></div>
          <div class="description">随时随地发现和创作内容</div>
        </div>
      </a>
      <recommended-author></recommended-author>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import recommendedAuthor from '../components/recommendedAuthor'
import  ArticleList  from './../pages/article/articleList'

  export default {
    components:{
      recommendedAuthor,
      ArticleList
    },
    computed:{
      ...mapState({
        articles:state => state.Author.authorInformation[0].articleLists.hots
      })
    },
    data(){
      return {
        timer:null,
        mark:0,  //比对图片索引的变量
        carouselImg:[
          '../../static/img/carousel1.jpg',
          '../../static/img/carousel2.jpg',
          '../../static/img/carousel3.jpg'
        ],
        hots:[
          {src:'../../static/img/hot1.jpg',name:'人文社科'},
          {src:'../../static/img/hot2.jpg',name:'@IT·互联网'},
          {src:'../../static/img/hot3.jpg',name:'读书'},
          {src:'../../static/img/hot4.jpg',name:'手绘'},
          {src:'../../static/img/hot5.png',name:'旅行·在路上'},
          {src:'../../static/img/hot6.jpg',name:'故事'},
          {src:'../../static/img/hot7.jpg',name:'历史'},
        ]
      }
    },
    methods:{
      getArticleList(){
        this.$axios.get('/getArticleList').then(res=>{
          alert(1)
          console.log(res)
        }).catch(err=>{})
      },
      //自加1
      selfAdd(){
        var self = this;
        self.timer = setInterval(function(){
          self.mark++; if(self.mark===3){self.mark=0;}},3500);
      },
      changeMark(index){
        this.mark = index;
      },
      clearTimer(){
        clearInterval(this.timer);
      },
      viewMore(theme) {
        this.$store.dispatch('confirmAuthor', theme);
        this.$router.push('/author');
      }
    },
    created(){
      this.selfAdd();
    }
  }
</script>
<style>

</style>
