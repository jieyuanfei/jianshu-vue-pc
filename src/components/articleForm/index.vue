<template>
  <div class="edit_div">
    <div class="title">
      <div class="input-title">
        <input type="text" v-model="article.title" @input="onchangeTitle"/>
      </div>
      <div class="utils">
        <el-dropdown>
          <el-button type="danger" round>发布<i class="el-icon-check"></i> </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="el-icon-upload"></i>直接发布</el-dropdown-item>
            <el-dropdown-item><i class="el-icon-time"></i>存在草稿</el-dropdown-item>
            <el-dropdown-item><i class="el-icon-close"></i>取消发布</el-dropdown-item>
            <el-dropdown-item><i class="el-icon-goods"></i>私密文章</el-dropdown-item>
            <el-dropdown-item><i class="el-icon-delete"></i>删除文章</el-dropdown-item>
            <el-dropdown-item><i class="el-icon-view"></i>阅览文章</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="edit">
      <mavon-editor
        id="mark"
        ref="md"
        :toolbars="toolbars"
        v-model="article.content"
        codeStyle="atom-one-dark"
        @change="markdownChange"
        @imgAdd="imgAdd"
        class="mark-editor"/>
    </div>
  </div>

</template>
<script>
  import { Loading } from 'element-ui'
  import { mapState } from 'vuex'
  import * as qiniu from 'qiniu-js'
  export default {
    data() {
      return {
        titleTimer: null,
        contentTimer: null,
        isTitleFirst:true,
        isContentFirst:true,
        article: {
          title:'',
          content: ''
        },
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          // mark: true, // 标记
          // superscript: true, // 上角标
          // subscript: true, // 下角标
          // quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          // readmodel: true, // 沉浸式阅读
          // htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          // undo: true, // 上一步
          // redo: true, // 下一步
          // trash: true, // 清空
          // save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true, // 预览
        }
      }
    },
    props: {
      topic: {
        type: String,
        default: '新建文章'
      },
      detail: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    computed: {
      ...mapState({
        articles: state => state.Article.article
      })
    },

    mounted() {
      this.article = JSON.parse(JSON.stringify(this.articles))
      this.isContentFirst = true;
      this.isTitleFirst = true;
      // this._fetchOptions()
      // this._initData()
      // 去服务端生成七牛token
      // this.fetchUploadToken()
    },
    methods: {
      onchangeTitle(){
        this.clearTimer(0);
        if(this.isTitleFirst){
          this.isTitleFirst = !this.isTitleFirst;
          return false;
        }
        if (this.article.title && this.article.title.length > 0) {
          //获取当前延时函数的ID，便于后面clearTimeout清除该ID对应的延迟函数
          this.titleTimer = setTimeout(() => {

            this.postArticle()

          }, 1500);
        }
      },
      onchangeContent(){
        this.clearTimer(1);
        if(this.isContentFirst){
          this.isContentFirst = !this.isContentFirst;
          return false;
        }
        if (this.article.content && this.article.content.length > 0) {
          //获取当前延时函数的ID，便于后面clearTimeout清除该ID对应的延迟函数
          this.contentTimer = setTimeout(() => {
            this.postArticle()
          }, 3000);
        }
      },
      clearTimer(status) {
        if (status == 0 && this.titleTimer) {
          clearTimeout(this.titleTimer);
        }else if(status == 1 && this.contentTimer){
          clearTimeout(this.contentTimer);
        }
      },

      submit() {
        this.article.status = 0
        this.postArticle()
      },
      saveDraft() {
        this.article.status = 1
        this.postArticle()
      },
      postArticle() {
        let articleInfo = {
          id:this.article.id,
          title:this.article.title,
          content:this.article.content
        }
        this.$axios.post('updateArticle',{query:articleInfo,html:this.article.html}).then(res=>{
          this.$store.dispatch('updateArticle',{id:this.article.id})
        }).catch(err=>{})
      },
      markdownChange(markdown, html) {
        this.article.html = html
        this.onchangeContent()
      },
      fetchUploadToken() {
        this.$axios.get('/getQiniuToken')
          .then(res => {
            if (res.errcode === 0) {
              this.token = res.data.token
            } else {
              this.$message({
                message: res.msg,
                type: 'error'
              })
            }
          })
      },
      imgAdd(pos, file) {
        this.file = file
        this.pos = pos
        let key = this.file.name
        // 调用七牛的接口将图片上传至七牛
        let observable = qiniu.upload(this.file, key, this.token)
        observable.subscribe(this.uploadNext, this.uploadError, this.uploadComplete)
        return false
      },
      uploadNext(res) {
        // ...
      },
      uploadError(err) {
        alert(err)
      },
      uploadComplete(res) {
        // 取得七牛返回的url
        let url = 'http://你七牛的外链默认域名/' + res.key
        // 将url插入markdown
        this.$refs.md.$img2Url(this.pos, url)
      }
    },
    watch: {
      articles: function (cur,old) {
        this.isTitleFirst = true
        this.isContentFirst = true
        this.article = JSON.parse(JSON.stringify(cur));
      }
    }
  }
</script>
<style scoped>
  .edit_div{
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 65px;
    overflow: hidden;
  }
  .title{
    height: 65px;
    width: 100%;
    display: flex;
    border: 1px solid #f6f6f6;
  }
  .input-title{
    flex: 1;
  }
  .input-title input{
    height: 100%;
    width: 100%;
    border: 0;
    padding-left: 30px;
    font-size: 30px;
  }
  .utils{
    padding: 10px 20px 0 20px;
  }
  .edit{
    background: rebeccapurple;
    height: 100%;
  }
  .mark-editor{
    height: 100%;
  }

</style>
