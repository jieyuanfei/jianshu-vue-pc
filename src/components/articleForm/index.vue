<template>
  <div class="edit_div">
    <div class="title">
      <div class="input-title">
        <input type="text"/>
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
        defaultOpen="edit"
        @change="markdownChange"
        @imgAdd="imgAdd"
        class="mark-editor"/>
    </div>
  </div>

</template>
<script>
  import { Loading } from 'element-ui'
  import * as qiniu from 'qiniu-js'
  export default {
    data() {
      return {
        article: {
          id: null,
          title: '',
          category: '',
          tag: [],
          content: '',
          html: '',
          status: 0
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
    },
    mounted() {
      // this._fetchOptions()
      // this._initData()
      // 去服务端生成七牛token
      // this.fetchUploadToken()
    },
    methods: {
      // 获取选项数据
      _fetchOptions() {
        this.$axios('/getArticleOptions').then(res => {
          this.categories = res.data.categoryList
          this.tags = res.data.tagsList
        })
      },
      _initData() {
        if (!this.detail.tagId) {
          this.tag = []
        } else {
          this.article.tag = this.detail.tagId.map(item => {
            return item._id
          })
        }
        this.article.category = this.detail.categoryId ? this.detail.categoryId._id : ''
        this.article.content = this.detail.content || ''
        this.article.title = this.detail.title || ''
        this.article.id = this.detail._id || ''
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
        this.loading = Loading.service({ fullscreen: true })
        this.$axios.post('/postArticle', this.article)
          .then(res => {
            this.loading.close()
            if (res.errcode === 0) {
              if (res.data.id) {
                // 清空文章内容
                this.article = {
                  id: null,
                  title: '',
                  category: '',
                  tag: [],
                  content: '',
                  html: '',
                  status: 0
                }
                this.$router.push(`editArticle/${res.data.id}`)
              }
              this.$message({
                message: res.msg,
                type: 'success'
              })
            } else {
              this.$message({
                message: res.msg,
                type: 'error'
              })
            }
          })
      },
      markdownChange(markdown, html) {
        this.article.html = html
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
