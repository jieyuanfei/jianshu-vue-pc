<template>
  <div class="edit_div">
    <div class="markdownBox" v-if="!isShow">
      <div class="title">
        <div class="input-title">
          <input type="text" v-model="article.title" @input="onchangeTitle"/>
        </div>
        <div class="utils">
          <el-button type="danger" round @click="save" v-show="releaseBtn">发布<i class="el-icon-check"></i> </el-button>
          <el-button type="info" round v-show="!releaseBtn"><i class="el-icon-loading"></i> 正在保存</el-button>
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
    <div class="isNullTips" v-if="isShow">
      <div class="tips">仿简书</div>
    </div>
  </div>

</template>
<script>
  import { Loading, Message, MessageBox } from 'element-ui'
  import { mapState } from 'vuex'
  import * as qiniu from 'qiniu-js'
  import article from "../../store/modules/article";
  export default {
    data() {
      return {
        releaseBtn: true,
        titleTimer: null,
        contentTimer: null,
        isFirst:true,
        article: {
          id: null,
          title:'',
          content: '',
          status: 1,
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
        },
        pos:null,
        file:null,
        token: '',
        isShow: false
      }
    },
    computed: {
      ...mapState({
        articles: state => state.Article.article
      })
    },

    mounted() {
      // 去服务端生成七牛token
      this.fetchUploadToken()
      // 判断是否有文章存在，如果没有，则不显示编译框
      if(this.articles.id){
        this.getArticleById();

      }else{
        this.isShow = true;
      }

    },
    methods: {
      getArticleById(){
        if(this.articles.backId){
          let loading = Loading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.1)'
          });
          this.checkIsLastTimer().then(ret=>{
            loading.close()
            this.$axios.get('getArticleBackById',{params:{id:this.articles.backId}}).then(res=>{
              this.isFirst = true;
              if(!res.data.content || res.data.content === ' '){}
              this.article = res.data
            }).catch(err=>{})
          })
        }
      },
      onchangeTitle(){
        this.clearTimer(0);
        if(this.isFirst){
          this.isFirst = !this.isFirst;
          return false;
        }
        if (this.article.title && this.article.title.length > 0) {
          //获取当前延时函数的ID，便于后面clearTimeout清除该ID对应的延迟函数
          this.titleTimer = setTimeout(() => {

            this.postArticle();

          }, 3000);
        }
      },
      onchangeContent(){
        this.clearTimer(1);
        if(this.isFirst){
          this.isFirst = !this.isFirst;
          return false;
        }
        if (this.article.content && this.article.content.length > 0) {
          this.contentTimer = setTimeout(() => {

            this.postArticle();

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
      // 检查当前是否有修改后没提交完的数据
      checkIsLastTimer(){
        return new Promise((resolve, reject)=>{
          if(this.titleTimer != null || this.contentTimer != null){
            let count = 0;
            let Timer = setInterval(()=>{
              count ++;
              if(count>5){
                clearInterval(Timer)
                resolve();
              }
              if(this.titleTimer != null || this.contentTimer != null){

              }else{
                clearInterval(Timer)
                resolve();
              }
            },500)

          }else{
            resolve();
          }
        })

      },
      save() {
        this.releaseBtn = false
        let data = {
          id: this.articles.id,
          backId: this.articles.backId,
        }
        this.checkIsLastTimer().then(ret=>{
          data.status = 0
          this.updateStatus(data,'您确定要将这篇文章发布吗?').then(res=>{
            let updateArticleObj = {
              article_id: res.id,
              id: this.article.id,
              title: this.article.title,
              text: this.article.text,
              article_num: this.article.article_num,
              status: res.status
            }
            this.storeUpdateArticle(updateArticleObj,'ok')
            Message.success('发布成功！')
            this.updateRelease()
          }).catch(err=>{
            this.updateRelease()
          })
        }).catch(err=>{
          this.updateRelease()
          Message.error('发布超时,请重新发布！')
        })
      },
      postArticle() {
        this.releaseBtn = false
        let articleInfo = {
          id: this.article.id,
          type_id: this.article.type_id,
          article_id: this.article.article_id,
          title: this.article.title,
          content: this.article.content,
          status: 0
        }

        this.$axios.post('editArticle',{query:articleInfo,html:this.article.html}).then(res=>{
          this.updateRelease()
          this.storeUpdateArticle(res)
        }).catch(err=>{
          this.updateRelease()
          Message.error('自动更新失败')
        })
      },
      updateRelease () {
        setTimeout(()=>{
          this.releaseBtn = true
        },1000)
      },
      storeUpdateArticle(res,command = null) {
        this.$store.dispatch('updateArticle',{
          id: res.article_id,
          backId: res.id,
          title: res.title,
          text: res.text,
          article_num: res.article_num,
          status: res.status,
          command: command
        })
      },
      markdownChange(markdown, html) {
        this.article.html = html
        this.onchangeContent()
      },
      fetchUploadToken() {
        this.$axios.get('/getQiniuToken')
          .then(res => {
            if (res.code === 0) {
              this.token = res.data.token
            } else {
              Message({
                message: res.data.msg,
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
        Message.error("图片上传失败")
      },
      uploadComplete(res) {
        // 取得七牛返回的url
        let url = 'http://pjnp2p78o.bkt.clouddn.com/' + res.key
        // 将url插入markdown
        this.$refs.md.$img2Url(this.pos, url)
      },
      operation() {
        let title = ''
        let message = ''
        let data = {
          id: this.articles.id,
          backId: this.articles.backId,
        }
        if (this.articles.command === 'ok'){
          this.save(data)
        }
        else if (this.articles.command === 'myself'){
          title = '您确定要将这篇文章转为私密文章吗?'
          message = '设成私密文章'
          data.status = 2
        }
        else if (this.articles.command === 'history'){
          this.$router.push({path:'/articleHistory',query:{id:this.articles.id}})
        }
        else if (this.articles.command === 'detail'){
          this.$router.push({path:'/articleDetail',query:{id:this.articles.id}})
        }
        else if (this.articles.command === 'share'){
          Message.error("分享功能还在迭代开发中......")
        }
        else if (this.articles.command === 'move'){
          Message.error("分享功能还在迭代开发中......")
        }
        else if (this.articles.command === 'del') {
          title = '您确定要将这篇文章移到草稿箱吗?'
          data.status = 3
          message = '删除'
        }
        if(['del','myself'].includes(this.articles.command)){
          this.updateStatus(data,title).then(res=>{
            let updateArticleObj = {
              article_id: res.id,
              id: this.article.id,
              title: this.article.title,
              text: this.article.text,
              article_num: this.article.article_num,
              status: res.status
            }
            this.storeUpdateArticle(updateArticleObj,this.articles.command)
            Message.success(message+'成功！')
          }).catch(err=>{
            Message.error(message+'失败！')
          })
        }
      },
      updateStatus(data,title='更新操作'){
        return new Promise((resolve,reject)=>{
          MessageBox.confirm(title+', 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.$axios.post('updateStatus', data).then(res => {
              resolve(res)
            }).catch(err => {
              reject(err)
            })

          }).catch(() => {
            reject()
          });

        })

      },
    },
    watch: {
      articles: function (cur,old) {
        if(!cur.command){
          if(cur.id){
            this.isShow = false
            this.getArticleById();
          }else{
            this.isShow = true
          }
        }else {
          this.operation()
        }
      }
    }
  }
</script>
<style scoped>
  .edit_div{
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
  }
  .markdownBox{
    height: 100%;
    width: 100%;
    padding-bottom: 65px;
  }
  .isNullTips{
    background: #f2f2f2;
    height: 100%;
    width: 100%;
    text-align: center;
    vertical-align: middle;
    padding-top: calc(50% - 130px);
  }
  .isNullTips .tips{
    color: #c5c3c3;
    font-size: 64px;
    font-weight: 800;
    font-family: Kai, Kaiti SC, KaiTi, BiauKai, \\6977\4F53, \\6977\4F53_GB2312, Songti SC, serif;
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
