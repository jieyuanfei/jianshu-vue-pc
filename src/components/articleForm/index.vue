<template>
  <div class="edit_div">
    <div class="title">
      <div class="input-title">
        <input type="text" v-model="article.title" @input="onchangeTitle"/>
      </div>
      <div class="utils">
        <el-dropdown  @command="submit">
          <el-button type="danger" round>发布<i class="el-icon-check"></i> </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="0"><i class="el-icon-upload"></i>直接发布</el-dropdown-item>
            <el-dropdown-item command="1"><i class="el-icon-time"></i>存在草稿</el-dropdown-item>
            <el-dropdown-item command="2"><i class="el-icon-goods"></i>私密文章</el-dropdown-item>
            <el-dropdown-item command="3"><i class="el-icon-delete"></i>删除文章</el-dropdown-item>
            <el-dropdown-item command="4"><i class="el-icon-view"></i>阅览文章</el-dropdown-item>
            <el-dropdown-item command="5"><i class="el-icon-time"></i>历史版本</el-dropdown-item>
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
  import { Loading, Message } from 'element-ui'
  import { mapState } from 'vuex'
  import * as qiniu from 'qiniu-js'
  export default {
    data() {
      return {
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
      }
    },
    computed: {
      ...mapState({
        articles: state => state.Article.article
      })
    },

    mounted() {
      this.getArticleById();
      // 去服务端生成七牛token
      this.fetchUploadToken()
    },
    methods: {
      getArticleById(){
        let id = this.articles.id;
        if(id){
          let loading = Loading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.1)'
          });
          this.checkIsLastTimer().then(ret=>{
            loading.close()
            this.$axios.get('getArticleById',{params:{id:id}}).then(res=>{
              this.isFirst = true;
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

            this.postArticle().then(res=>{
              this.$store.dispatch('updateArticle',{id:this.article.id,time:new Date()})
            }).catch(err=>{
              console.error("报错:"+err);
            })

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

            this.postArticle().then(res=>{
              this.$store.dispatch('updateArticle',{id:this.article.id,time:new Date()})
            }).catch(err=>{
              console.error("报错:"+err);
            })

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

      submit(command) {
        if(command == 0){
          this.article.status = 0
          this.save('您要将文章直接发布吗')
        }else if(command == 1){
          this.article.status = 1
          this.save('您要将文章存在草稿箱吗')
        }else if(command == 2){
          this.article.status = 2
          this.save('您要将文章存为私密吗')
        }else if(command == 3){
          this.article.status = 3
          this.save('您要将文章删除吗，如果删除，文章保存在垃圾箱，30天后将永久删除')
        }else if(command == 4){
          this.$router.push({path:'articleDetail',query:{id:this.article.id}})
        }else if(command == 5){
          Message({
            type: 'success',
            message: '功能暂时还未开发!'
          });
        }
      },
      save(title) {
        MessageBox.confirm(title+', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(()=>{
          let loading = Loading.service({
            lock: true,
            text: '正在发布中.....',
            background: 'rgba(0, 0, 0, 0.1)'
          });
          this.article.status = 1
          this.postArticle().then(res=>{
            console.log(res)
            loading.close()
            Message({
              type: 'success',
              message: '发布成功!'
            });
          }).catch(err=>{
            loading.close()
            Message({
              type: 'error',
              message: '发布失败!'
            });

          })
        }).catch(err=>{

        });
      },
      postArticle() {
        let articleInfo = {
          article_id:this.article.id,
          title:this.article.title,
          content:this.article.content,
          status: this.article.status
        }
        return new Promise((resolve,reject)=>{
          this.$axios.post('editArticle',{query:articleInfo,html:this.article.html}).then(res=>{
            resolve(res)
          }).catch(err=>{
            reject(err)
          })
        })

      },
      markdownChange(markdown, html) {
        this.article.html = html
        this.onchangeContent()
      },
      fetchUploadToken() {
        this.$axios.get('/getQiniuToken')
          .then(res => {
            console.log(res)
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
      }
    },
    watch: {
      articles: function (cur,old) {
        this.getArticleById();
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
