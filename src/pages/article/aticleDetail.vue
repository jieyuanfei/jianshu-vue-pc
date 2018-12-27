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
            <li><img src="../../assets/img/hot1.jpg"/></li>
            <li><img src="../../assets/img/hot2.jpg"/></li>
            <li><img src="../../assets/img/hot3.jpg"/></li>
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
            <img :src="user.header_url"/>
            <div class="context">
              <div class="context-title">{{user.username}}</div>
              <div class="context-text">写了 29407 字，被 2316 人关注，获得了 3021 个喜欢</div>
            </div>
            <a class="btn btn-success follow"><i class="el-icon-plus"></i><span>关注</span></a>
          </div>
          <div class="box-bottom">99年小姐姐，目前大二，坐标南京. 爱好是音乐 写字 旅行 💤️ 最温情的段子手，最坦荡的标题党. 本性想做个女liu</div>
        </div>
        <div class="utils">
          <el-button type="danger" plain style="float: left"><i class="icon-ali-xihuan1"></i> 喜欢 | 13</el-button>
          <el-tooltip class="item" effect="dark" content="分享到微信" placement="top">
            <el-button icon="icon-ali-weixin" circle style="color: #00bb29"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分享到微博" placement="top">
            <el-button icon="icon-ali-weibo" circle style="color: #e05244"></el-button>
          </el-tooltip>
          <el-popover
            placement="top"
            trigger="hover">
            <img src="../../assets/img/qrcode.png" width="150" height="150"/>
            <el-button slot="reference" icon="icon-ali-tupian" circle></el-button>
          </el-popover>
          <el-dropdown trigger="click" placement="top">
            <span class="el-dropdown-link">
              <el-button round style="padding: 13px 23px">更多分享</el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><i class="icon-ali-unie652"></i> QQ</el-dropdown-item>
              <el-dropdown-item><i class="icon-ali-twitter"></i> Twitter</el-dropdown-item>
              <el-dropdown-item><i class="icon-ali-facebook"></i> Facebook</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="add-comment">
          <div class="comment-top">
            <img src="../../assets/img/hot1.jpg"/>
            <textarea placeholder="写下您的评论....." @focus="commentBut=true" v-model="commentInput" ></textarea>
          </div>
          <div class="comment-bottom" v-show="commentBut">
            <span><i class="icon-ali-bangzhu"></i> 字数:{{commentInput.length}}/500</span>
            <el-button round @click="commentBut=false">取消</el-button>
            <el-button type="success" round @click="addComment">发送</el-button>
          </div>
        </div>
        <div class="comment-list">
          <div class="top-title">
            <span>{{commentList.rows.length}}条评论</span>
            <div class="pull-right">
              <a class="active">按时间倒序</a>
              <a class="">按时间正序</a>
            </div>
          </div>
          <ul>
            <li v-for="info in commentList.rows">
              <div class="comment">
                <div>
                  <div class="author">
                    <div class="v-tooltip-container" style="z-index: 0;">
                      <div class="v-tooltip-content">
                        <a @click.prevent target="_blank" class="avatar">
                          <img :src="info.user_header_url">
                        </a>
                      </div>
                    </div>
                    <div class="info">
                      <a @click.prevent target="_blank" class="name">{{info.user_name}}</a>
                      <div class="meta"><span>时间: {{info.created_at}}</span></div>
                    </div>
                  </div>
                  <div class="comment-wrap">
                    <p>{{info.content}}</p>
                    <div class="tool-group">
                      <a @click.prevent @click="addCommentLoveNum(info.id,info.loveId)"  :class="{'like-button':true,'like-button-active':info.loveId!=null}">
                        <span v-if="info.love_num>0"><i class="icon-ali-iconfontzhizuobiaozhun44"></i>{{info.love_num}}人赞</span>
                        <span v-if="info.love_num === 0"><i class="icon-ali-iconfontzhizuobiaozhun44"></i>赞</span>
                      </a>
                      <a @click.prevent @click="saveType(info,0)">
                        <i class="icon-ali-duanxin"></i>
                        <span>回复</span>
                      </a>
                      <a class="report"><span>举报</span></a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="sub-comment-list" v-if="info.t_comment_replys && info.t_comment_replys.length>0">
                <div class="sub-comment" v-for="reply in info.t_comment_replys">
                  <div class="v-tooltip-container" style="z-index: 0;">
                    <div class="v-tooltip-content">
                      <a @click.prevent target="_blank">{{reply.from_user_name}}</a>
                      <span>：</span>
                    </div>
                  </div>

                  <span>
                    <a @click.prevent class="maleskine-author" v-if="reply.to_user_name">@{{reply.to_user_name}}</a>
                    <span>{{reply.content}}</span>
                  </span>
                  <div class="sub-tool-group">
                    <span>{{reply.created_at}}</span>
                    <a class="reply" @click.prevent @click="saveType(info,1,reply)">
                      <i class="iconfont ic-comment"></i>
                      <span>回复</span>
                    </a>
                  </div>
                </div>
                <div class="sub-comment more-comment">
                  <a class="add-comment-btn" @click.prevent="saveType(info,0)">
                    <i class="iconfont ic-subcomment"></i>
                    <span>添加评论回复</span>
                  </a>
                  <!--<span class="line-warp">还有2条评论，<a>展开查看</a></span>-->
                </div>
              </div>
              <div class="add-comment" v-show="info.showEditBtn">
                <div class="comment-top">
                  <textarea placeholder="写下您的评论回复....." v-model="info.commentText" v-focus></textarea>
                </div>
                <div class="comment-bottom">
                  <span><i class="icon-ali-bangzhu"></i> 字数:{{info.commentText.length}}/500</span>
                  <el-button round @click="info.showEditBtn=false">取消</el-button>
                  <el-button type="success" round @click="addCommentReply(info)">发送</el-button>
                </div>
              </div>
            </li>
          </ul>

        </div>
      </footer>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import {mavonEditor} from 'mavon-editor'
  import {Message} from 'element-ui'
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
        commentInput: '',
        commentBut: false,
        commentList:{
          limit:10,
          offset:0,
          rows:[]
        },
      }
    },
    computed: {
      ...mapState({
        userInfo: state => state.Users.user
      })
    },
    mounted() {
      this.id = this.$route.query.id
      this.fetchArticle(this.id)
      this.ul_style_padding = (this.$refs.ul_style.clientWidth - 3 * 35) / 2 + 15 + 'px'
      this.getCommentList()
    },
    methods: {
      getCommentList() {
        console.log(this.userInfo)
        this.$axios.get('getCommentListByArticleId',{params:{article_id:this.id, user_id: this.userInfo.uid}}).then(res=>{
          this.commentList.rows = res.rows.map(item => {
            item.showEditBtn = false;
            item.commentText = '';
            return item
          })
        }).catch(err=>{

        })
      },
      addComment() {
        this.$axios.post('addComment',{query:{article_id: this.id , content: this.commentInput }}).then(res=>{
          res.data.showEditBtn = false
          res.data.commentText = ''
          this.commentInput = ''
          this.commentBut = false
          this.commentList.rows.unshift(res.data)
          Message.success('评论成功')
        }).catch(err=>{
          Message.success('评论失败')
        })
      },
      saveType(info,type,reply){
        info.butType = type
        if(type === 1){
          info.reply = reply
        }
        info.showEditBtn = true;
      },
      addCommentReply(info) {
        let query = {}
        query.comment_id = info.id
        query.content = info.commentText
        if(info.butType === 1){
          query.to_user_id = info.reply.from_user_id
          query.to_user_name = info.reply.from_user_name
          query.reply_id = info.reply.id
        }

        this.$axios.post('addCommentReply',{query: query}).then(res=>{
          if(info.t_comment_replys&&info.t_comment_replys.length>0){
            info.t_comment_replys.push(res.data)
          }else {
            info.t_comment_replys = [res.data]
          }
          info.showEditBtn = false
          info.commentText = ''
          Message.success('回复评论成功')
        }).catch(err=>{
          Message.success('回复评论失败')
        })

      },
      addCommentLoveNum(id,loveId) {
        this.$axios.post('addCommentLoveNum',{id:id, loveId:loveId}).then(res=>{
          this.commentList.rows = this.commentList.rows.map(info => {
            if(info.id === id){
              if(res.num > 0){
                info.loveId = res.id;
                info.love_num = info.love_num + 1
              }else{
                info.loveId = null
                info.love_num = info.love_num - 1
              }
            }
            return info
          })
        }).catch(err=>{})
      },
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
    },
    directives: {
      focus: function (el) {
        el.focus()
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
    padding: 0 15px 100px 15px;
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
    /*padding-left: 5px;*/
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
    text-align: right;
    margin-bottom: 50px;
  }

  .comment-top {
    display: flex;
    padding: 20px 0;

  }

  .comment-bottom {
    text-align: right;
  }

  .comment-bottom span {
    padding-left: 60px;
    font-size: 13px;
    color: #969696;
    float: left;
  }

  .add-comment textarea {
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

  .add-comment img {
    height: 45px;
    width: 45px;
    border-radius: 50%;
  }

  .comment-list .comment {
    text-align: left;
    padding: 25px 0 10px;
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



  .comment-list .comment p {
    font-size: 16px;
  }

  .comment-list p {
    margin: 10px 0 20px;
    line-height: 1.5;
    font-size: 16px;
    word-break: break-word !important;
    word-break: break-all;
  }

  .comment-list .tool-group a {
    margin-right: 10px;
    color: #969696;
    display: inline-block;
  }
  .comment-list .tool-group .like-button-active{
    color: #ea6f5a;
  }

  .comment-list .tool-group .like-button:hover {
    color: #ea6f5a;
  }
  .comment-list .tool-group a span {
    font-size: 15px;
  }

  .comment-list .comment-wrap .report {
    float: right;
    color: #969696;
  }

  .comment-list .sub-comment-list,.comment-list li .add-comment {
    text-align: left;
    margin-top: 20px;
    padding: 5px 0 5px 20px;
    border-left: 2px solid #d9d9d9;
    font-size: 14px;
  }
  .comment-list li .add-comment .comment-bottom span{
    padding-left: 10px;
  }

  .sub-comment-list a {
    color: #3194d0;

  }

  .comment-list .sub-comment {
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px dashed #f0f0f0;
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
    margin-top: 10px
  }

  .comment-list .sub-comment .report, .comment-list .sub-comment .subcomment-delete {
    float: right;
    margin: 1px 0 0 10px;
  }
  .top-title{
    text-align: left;
    padding: 10px 0;
    margin-top: 30px;
    border-bottom: 1px solid #f0f0f0;
  }
  .top-title span{
    font-weight: 700;
  }
  .top-title .pull-right a{
    font-size: 14px;
    color: #969696;
  }
  .top-title .pull-right .active{
    color: #2f2f2f;
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
