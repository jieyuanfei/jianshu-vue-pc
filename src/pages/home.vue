<template>
  <div class="homepage">
    <div class="home-main-left">
      <div class="homepageCarousel" @mouseover="clearTimer()" @mouseout="selfAdd()">
        <div class="carouselshow">
          <transition-group tag="ul" name="carousel">
            <li v-for="(img,index) in carouselImg" :key="index" v-show="mark === index">
              <a href="#"><img :src="img"/></a>
            </li>
          </transition-group>
        </div>
        <div class="carousel-bar">
          <span v-for="(item,index) in carouselImg" :key="index" :class="{active: mark === index}"
                @click="changeMark(index)"></span>
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
      <article-list :articleList="articles.rows"></article-list>
      <div class="more" v-show="articles.rows.length > 0 && moreButton">
        <el-button type="info" round @click="articleMore"><i class="el-icon-loading" v-show="moreButtonLoading"></i>阅读更多</el-button>
      </div>

    </div>
    <div class="home-main-right">
      <div class="board">
        <a href="#"><img src="../assets/img/banner.png" alt=""></a>
        <a href="#"><img src="../assets/img/banner2.png" alt=""></a>
        <a href="#"><img src="../assets/img/banner3.png" alt=""></a>
        <a href="#"><img src="../assets/img/banner4.png" alt=""></a>
        <a href="#"><img src="../assets/img/banner5.png" alt=""></a>
      </div>
      <a href="javascript:;" id="download-qrcode">
        <img src="../assets/img/qrcode.png" alt="" class="qrcode">
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
  import ArticleList from './../pages/article/articleList'
  import {Message, MessageBox} from 'element-ui'

  export default {
    components: {
      recommendedAuthor,
      ArticleList
    },
    computed: {
      ...mapState({
        // articles: state => state.Author.authorInformation[0].articleLists.hots
      })
    },
    data() {
      return {
        timer: null,
        mark: 0,  //比对图片索引的变量
        carouselImg: [
          require('../assets/img/carousel1.jpg'),
          require('../assets/img/carousel2.jpg'),
          require('../assets/img/carousel3.jpg')
        ],
        hots: [
          {src: require('../assets/img/hot1.jpg'), name: '人文社科'},
          {src: require('../assets/img/hot2.jpg'), name: '@IT·互联网'},
          {src: require('../assets/img/hot3.jpg'), name: '读书'},
          {src: require('../assets/img/hot4.jpg'), name: '手绘'},
          {src: require('../assets/img/hot5.png'), name: '旅行·在路上'},
          {src: require('../assets/img/hot6.jpg'), name: '故事'},
          {src: require('../assets/img/hot7.jpg'), name: '历史'},
        ],
        articles:{
          rows:[],
          offset:0,
          limit:20,
        },
        moreButton: true,
        moreButtonLoading: false,
      }
    },
    mounted() {
      this.getArticleList();
    },
    methods: {
      getArticleList() {
        this.$axios.get('/getArticleList',{params:{offset:this.articles.offset,limit:this.articles.limit}}).then(res => {
          this.moreButtonLoading = false;
          if(res.rows.length < this.articles.limit){
            this.moreButton = false
          }
          if(res.rows.length > 0){
            this.articles.offset = this.articles.offset + res.count;
          }else{
            this.moreButton = false
            Message.success('已经没有更多新的信息了')
            return false;
          }
          this.articles.rows.push(...res.rows);
        }).catch(err => {
        })
      },
      articleMore() {
        this.moreButtonLoading = true;
        setTimeout(()=>{
          this.getArticleList();
        },1000)

      },
      //自加1
      selfAdd() {
        var self = this;
        self.timer = setInterval(function () {
          self.mark++;
          if (self.mark === 3) {
            self.mark = 0;
          }
        }, 3500);
      },
      changeMark(index) {
        this.mark = index;
      },
      clearTimer() {
        clearInterval(this.timer);
      },
      viewMore(theme) {
        this.$store.dispatch('confirmAuthor', theme);
        this.$router.push('/author');
      }
    },
    created() {
      this.selfAdd();
    }
  }
</script>
<style scoped>

  .homepage {
    width: 960px;
    margin: 0 auto;
    padding: 20px 0 180px 30px;
    box-sizing: border-box;
  }
  .home-main-left {
    width: 615px;
    float: left;
  }
  .home-main-right {
    width: 280px;
    margin:0 0 0 35px;
    display: inline-block;
  }
  .homepage .homepageCarousel {
    border-radius: 6px;
    overflow: hidden;
    z-index: 1000;
    width: 615px;
    height: 270px;
    position: relative;
    border: 1px solid #eeeeee;
  }

  .homepage .homepageCarousel ul {
    overflow: hidden;
  }

  .homepage .homepageCarousel .carouselshow {
    width: 615px;
    height: 270px;
  }

  .homepage .homepageCarousel li {
    position: absolute;
  }

  .homepage .homepageCarousel img {
    width: 615px;
    height: 270px;
  }

  .homepage .homepageCarousel .carousel-bar {
    position: absolute;
    width: 100%;
    bottom: 10px;
    margin: 0 auto;
    z-index: 10;
    text-align: center;
  }

  .homepage .homepageCarousel .carousel-bar span {
    width: 20px;
    height: 5px;
    border: 1px solid hsla(0, 0%, 47%, .4);
    background-color: hsla(0, 0%, 47%, .4);
    display: inline-block;
    margin-right: 10px;
  }

  .homepage .homepageCarousel .active {
    background: white !important;
  }
  .more{
    width: 100%;
    padding: 30px 15px;
  }
  .more button{
    width: 100%;
  }
</style>
