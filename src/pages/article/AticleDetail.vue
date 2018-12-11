<template>
  <div class="detail">
    <div class="content-box">
      <header>
        <div class="title">这里是文章内容的头部</div>
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
      <footer></footer>
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
        user:{}
      }
    },
    mounted() {
      this.id = this.$route.query.id
      this.fetchArticle(this.id)
    },
    methods: {
      fetchArticle(id) {
        this.$axios.get('getArticleDetailById', {params: {id: id}}).then(res => {
          this.article = res.article;
          this.user = res.user;
        }).catch(err => {
        })
      }
    }
  }
</script>
<style scoped>
  .detail {
    height: 100%;
    width: 100%;
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

  .content .name{
    padding-left: 5px;
    margin-right: 3px;
    font-size: 18px;
    vertical-align: middle;
  }
  .content .meta{
    color: #969696;
    font-size: 14px;
  }
  .meta span{
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
    height: 200px;
    background: gainsboro;
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
