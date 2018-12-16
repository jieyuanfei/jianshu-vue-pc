<template>
  <div class="detail">
    <div class="content-box" ref="content">
      <header>
        <div class="title">{{article.title}}</div>
        <div class="user">
          <img :src="user.header_url"/>
          <div class="content">
            <div class="user-msg">
              <span class="name">{{user.username}}</span>
              <a class="btn btn-success follow"><i class="el-icon-plus"></i><span>关注</span></a>
            </div>
            <div class="meta">
              <span class="publish-time">{{article.updated_at}}</span>
              <span class="wordage">字数 {{article.article_num}}</span>
              <span class="views-count">阅读 {{article.ready_num}}</span>
              <span class="comments-count">评论 {{article.comment_num}}</span>
              <span class="likes-count">喜欢 {{article.like_num}}</span>
            </div>
          </div>
        </div>
      </header>
      <mavonEditor class="markdown" codeStyle="dark" :boxShadow="false" :scrollStyle="false" :value="article.content"
                   :toolbarsFlag="toolbarsFlag" :subfield="toolbarsFlag" defaultOpen="preview"></mavonEditor>
      <footer>
        <div class="appreciate">
          <div class="title">小礼物走一走，来简书关注我</div>
          <div class="addAppreciate">
            <el-button type="danger" round>赞赏支持</el-button>
          </div>
          <ul :style="{'padding-left': ul_style_padding}" ref="ul_style">
            <li><img src="../../../static/img/hot1.jpg"/></li>
            <li><img src="../../../static/img/hot2.jpg"/></li>
            <li><img src="../../../static/img/hot3.jpg"/></li>
          </ul>
        </div>
        <div class="text-type">
          <div class="type-left"><i class="el-icon-tickets"></i>凌云木练笔的地方</div>
          <div class="type-right">
            <span>举报文章</span>
            <el-tooltip class="item" effect="dark" content="© 著作权归作者所有" placement="top">
              <el-button>© 著作权归作者所有</el-button>
            </el-tooltip>
          </div>
        </div>
        <div class="userMsg">
          <div class="box-top">
            <img src="../../../static/img/author-hots1.jpg"/>
            <div class="context">
              <div class="context-title">用户名</div>
              <div class="context-text">写了 29407 字，被 2316 人关注，获得了 3021 个喜欢</div>
            </div>
            <a class="btn btn-success follow"><i class="el-icon-plus"></i><span>关注</span></a>
          </div>
          <div class="box-bottom">99年小姐姐，目前大二，坐标南京. 爱好是音乐 写字 旅行 💤️ 最温情的段子手，最坦荡的标题党. 本性想做个女liu</div>
        </div>
        <div class="utils">
          <el-button type="danger" plain><i class="el-icon-star-off"></i> 喜欢</el-button>
          <el-button icon="el-icon-search" circle></el-button>
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="success" icon="el-icon-check" circle></el-button>
          <el-button type="info" icon="el-icon-message" circle></el-button>
          <el-button type="warning" icon="el-icon-star-off" circle></el-button>
        </div>
        <div class="comment">
          <div class="comment-top">
            <img src="../../../static/img/hot1.jpg"/>
            <textarea placeholder="写下您的评论....."></textarea>
          </div>
          <div class="comment-bottom">
            <el-button round>取消</el-button>
            <el-button type="success" round>发送</el-button>
          </div>
        </div>
        <div class="comment-list">
          <div id="comment-31863101" class="comment">
            <div>
              <div class="author">
                <div data-v-f3bf5228="" class="v-tooltip-container" style="z-index: 0;">
                  <div class="v-tooltip-content"><a href="/u/2d545efe445e" target="_blank" class="avatar"><img
                    src="//upload.jianshu.io/users/upload_avatars/15116775/d48db87f-e756-4579-83ad-eaee0da1eaf1?imageMogr2/auto-orient/strip|imageView2/1/w/114/h/114/format/webp"></a>
                  </div> <!----></div>
                <div class="info"><a href="/u/2d545efe445e" target="_blank" class="name">土拨鼠的呐喊</a> <!----> <!---->
                  <div class="meta"><span>29楼 · 2018.12.07 17:33</span></div>
                </div>
              </div>
              <div class="comment-wrap"><p>在这个快节奏的时代~ 真的外表很重要，大多数人基本没有太多的时间，或者说太多的机会想要去了解你的内在！ 始于颜值。</p>
                <div class="tool-group">
                  <a data-v-cdecbe24="" id="like-button-31863101" class="like-button">
                    <span data-v-cdecbe24="">赞</span>
                  </a>
                  <a class="">
                    <i class="el-icon-tickets"></i>
                    <span>回复</span>
                  </a>
                  <a class="report"><span>举报</span></a> <!----></div>
              </div>
            </div>
            <div class="sub-comment-list"><div id="comment-29316238" class="sub-comment"><p><div data-v-f3bf5228="" class="v-tooltip-container" style="z-index: 0;"><div class="v-tooltip-content"><a href="/u/1b3ff6ac1ab3" target="_blank">云小木</a>：
            </div> <!----></div> <span><a href="/u/c5e1d6cb9131" class="maleskine-author" target="_blank" data-user-slug="c5e1d6cb9131">@金泽城</a> 没错！</span></p> <div class="sub-tool-group"><span>2018.10.06 11:29</span> <a class=""><i class="iconfont ic-comment"></i> <span>回复</span></a> <a class="report"><span>举报</span></a> <!----></div></div><div id="comment-29521026" class="sub-comment"><p><div data-v-f3bf5228="" class="v-tooltip-container" style="z-index: 0;"><div class="v-tooltip-content"><a href="/u/42d17c7f191c" target="_blank">阿水哥哥</a>：
            </div> <!----></div> <span><a href="/u/1b3ff6ac1ab3" class="maleskine-author" target="_blank" data-user-slug="1b3ff6ac1ab3">@云小木</a> ，你还年轻事物不能光看表面，出社会了你就知道现实是咋回事了，吐吐槽人之常情。</span></p> <div class="sub-tool-group"><span>2018.10.12 13:46</span> <a class=""><i class="iconfont ic-comment"></i> <span>回复</span></a> <a class="report"><span>举报</span></a> <!----></div></div><div id="comment-31478135" class="sub-comment"><p><div data-v-f3bf5228="" class="v-tooltip-container" style="z-index: 0;"><div class="v-tooltip-content"><a href="/u/f753ba4c84b2" target="_blank">一见你就笑_773b</a>：
            </div> <!----></div> <span><a href="/u/42d17c7f191c" class="maleskine-author" target="_blank" data-user-slug="42d17c7f191c">@阿水哥哥</a> 是的  现实是很残酷的，美貌是会过期的</span></p> <div class="sub-tool-group"><span>2018.11.30 11:18</span> <a class=""><i class="iconfont ic-comment"></i> <span>回复</span></a> <a class="report"><span>举报</span></a> <!----></div></div> <div class="sub-comment more-comment"><a class="add-comment-btn"><i class="iconfont ic-subcomment"></i> <span>添加新评论</span></a> <span class="line-warp">
          还有2条评论，
          <a>展开查看</a></span> <!----> <!----></div> <!----></div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
  import {mavonEditor} from 'mavon-editor'

  export default {
    components: {
      mavonEditor
    },
    data() {
      return {
        id: '',
        toolbarsFlag: false,
        article: {},
        user: {},
        ul_style_padding: '45%',
      }
    },
    mounted() {
      this.id = this.$route.query.id
      this.fetchArticle(this.id)
      this.ul_style_padding = (this.$refs.ul_style.clientWidth - 3 * 35) / 2 + 15 + 'px'
    },
    methods: {
      fetchArticle(id) {
        this.$axios.get('getArticleDetailById', {params: {id: id}}).then(res => {
          this.article = res.article;
          this.user = res.user;
        }).catch(err => {
        })
      },
      scrollTop() {
        this.$refs.content.scrollTop = 0
      }
    }
  }
</script>
<style scoped>
  .detail {
    height: 100%;
    width: 100%;
    margin-left: 30px;
  }

  .content-box {
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px
  }

  .content-box:after, .content-box:before {
    content: " ";
    display: table
  }

  .content-box:after {
    clear: both
  }

  @media (min-width: 768px) {
    .content-box {
      width: 750px
    }
  }

  @media (min-width: 992px) {
    .content-box {
      width: 750px
    }
  }

  @media (min-width: 1081px) {
    .content-box {
      width: 750px
    }
  }

  header {
    margin-top: 40px;
    padding: 0 22px;
    font-family: Kai, Kaiti SC, KaiTi, BiauKai, \\6977\4F53, \\6977\4F53_GB2312, Songti SC, serif;
  }

  header .title {
    width: 100%;
    font-size: 34px;
    font-weight: 700;
    line-height: 1.3;
  }

  header .user {
    /*border: 1px solid red;*/
    height: 100%;
    display: flex;
    padding: 20px 0;
  }

  .user img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }

  .user .content {
    flex: 1;
    padding: 1px 0 0 7px;
  }

  .content .user-msg {
    width: 100%;
  }

  .content .name {
    padding-left: 5px;
    margin-right: 3px;
    font-size: 18px;
    vertical-align: middle;
  }

  .content .meta {
    color: #969696;
    font-size: 14px;
  }

  .meta span {
    padding-left: 5px;
  }

  .btn-success {
    padding: 0 7px 0 5px;
    font-size: 12px;
  }

  .markdown {
    /*padding-top: 20px;*/
    /*height: 100%;*/
    background: white;
  }

  footer {
    text-align: center;
    min-height: 500px;
    padding: 20px 20px 100px 20px;
    /*border: 1px solid red;*/
  }

  footer .appreciate {
    height: auto;
    width: 100%;
    padding-bottom: 30px;
  }

  footer .title {
    padding: 20px 0;
    text-align: center;
    min-height: 24px;
    font-size: 17px;
    font-weight: 700;
    color: #969696;
  }

  footer .appreciate ul {
    display: block;
    height: 35px;
    width: 100%;
    padding: 10px;
  }

  footer .appreciate li {
    display: block;
    float: left;
  }

  footer .appreciate li img {
    height: 35px;
    width: 35px;
    margin-left: -10px;
    border-radius: 50%;
  }

  footer .text-type {
    display: flex;
    font-size: 12px;
    color: #c8c8c8;
  }

  footer .text-type .type-left {
    text-align: left;
    line-height: 36px;
    flex: 1;
  }

  footer .text-type .el-button {
    border: 0;
    font-size: 12px;
    color: #c8c8c8;
    padding: 0;
    margin-left: 20px;
  }

  footer .text-type .el-button:hover {
    background: white;
  }

  footer .userMsg {
    margin: 30px 0;
    width: 100%;
    padding: 20px;
    background-color: hsla(0, 0%, 71%, .1);
    border: 1px solid #e1e1e1;
    border-radius: 4px;
    font-size: 12px;
  }

  footer .userMsg .box-top {
    display: flex;
  }

  footer .userMsg .box-top img {
    height: 48px;
    width: 48px;
    border-radius: 50%;
  }

  footer .userMsg .follow {
    padding: 0 25px;
    line-height: 40px;
    height: 40px;
    font-size: 16px;
  }

  footer .userMsg .context {
    flex: 1;
    text-align: left;
    padding-left: 10px;
  }

  .context-title {
    font-size: 17px;
    line-height: 1.8;
    vertical-align: middle;
  }

  .context-text {
    color: #969696;
  }

  .box-bottom {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #e1e1e1;
    color: #969696;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
  }

  footer .utils {
    /*margin-bottom: 200px;*/
    margin-bottom: 50px;
  }

  .comment-top {
    display: flex;
    padding: 20px 0;

  }

  .comment-bottom {
    text-align: right;
  }

  .comment textarea {
    resize: none;
    flex: 1;
    margin-left: 15px;
    padding: 10px 15px;
    width: 100%;
    height: 80px !important;
    font-size: 13px;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    background-color: hsla(0, 0%, 71%, .1);
    display: inline-block;
    vertical-align: top;
    outline-style: none;
  }

  .comment img {
    height: 45px;
    width: 45px;
    border-radius: 50%;
  }

  .comment-list .comment {
    text-align: left;
    padding: 20px 0 30px;
    border-bottom: 1px solid #f0f0f0;
  }

  .comment-list .author {
    margin-bottom: 15px;
    display: inline-block;
    text-align: left;
  }

  .comment-list .avatar {
    margin-right: 5px;
    width: 38px;
    height: 38px;
    vertical-align: middle;
    display: inline-block;
  }

  .avatar img {
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 50%;
    vertical-align: middle;
  }

  .comment-list .info {
    display: inline-block;
    vertical-align: middle;
  }

  .note .post .comment-list .name {
    font-size: 15px;
    color: #333;
  }

  .comment-list .meta {
    font-size: 12px;
    color: #969696;
  }

  .comment-list .meta span {
    margin-right: 6px;
  }

  .comment-list .comment p {
    font-size: 16px;
  }

  .comment-list p {
    margin: 10px 0;
    line-height: 1.5;
    font-size: 16px;
    word-break: break-word !important;
    word-break: break-all;
  }

  .comment-list .tool-group a {
    margin-right: 10px;
    font-size: 0;
    color: #969696;
    display: inline-block;
    position: relative;
    padding-left: 23px;
  }

  .comment-list .tool-group a span {
    vertical-align: middle;
    font-size: 14px;
  }

  .like-button[data-v-cdecbe24]:before {
    content: '';
    position: absolute;
    left: -16px;
    top: -16px;
    width: 50px;
    height: 50px;
    background-image: url(//cdn2.jianshu.io/assets/web/zan_animation_steps-8d65a47….png);
    background-position: left;
    background-repeat: no-repeat;
    background-size: 1050px 50px;
  }

  .comment-list .tool-group a {
    margin-right: 10px;
    font-size: 0;
    color: #969696;
    display: inline-block;
  }

  .comment-list .comment-wrap .report {
    float: right;
    margin: 12px 0 0 10px;
    font-size: 0;
    color: #969696;
  }

  .comment-list .sub-comment-list {
    margin-top: 20px;
    padding: 5px 0 5px 20px;
    border-left: 2px solid #d9d9d9;
  }

  .comment-list .sub-comment {
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px dashed #f0f0f0;
  }

  .comment-list .sub-comment-list p {
    margin: 0 0 5px;
    font-size: 14px;
    line-height: 1.5;
    word-break: break-word !important;
  }

  .v-tooltip-container {
    position: relative;
  }

  .v-tooltip-container, .v-tooltip-content {
    display: inline-block;
  }

  .comment-list .sub-tool-group {
    font-size: 12px;
    color: #969696;
  }

  .comment-list .sub-tool-group {
    font-size: 12px;
    color: #969696;
  }

  .comment-list .sub-comment .report, .comment-list .sub-comment .subcomment-delete {
    float: right;
    margin: 1px 0 0 10px;
  }
</style>
<style>
  .markdown .v-show-content {
    background: white !important;
  }

  .markdown .v-note-panel {
    border: 0 !important;
  }
</style>
