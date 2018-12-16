<template>
  <div class="article">
    <div class="article_type">
      <div class="_3zibT">
        <router-link :to="{path:'/'}">回首页</router-link>
      </div>

      <div class="_1iZMb">
        <div class="_33Zlg" @click="newShow = !newShow"><i class="el-icon-edit"></i><span>新建文集</span></div>
        <div class="_2G97m" v-show="newShow">
          <form class="M8J6Q _1mU5v"><input type="text" v-model="typeName" placeholder="请输入文集名..." name="name"
                                            class="_1CtV4">
            <button type="button" class="dwU8Q _3zXcJ _3QfkW" @click="addType"><span>提 交</span></button>
            <button type="button" class="vIzwB _3zXcJ" @click="newShow = false"><span>取 消</span></button>
          </form>
        </div>
      </div>
      <ul class="type_list">
        <li :class="info.selected?'selected':'' " v-for="info in typeList" @click="typeSelected(info)">
          <div class="left">{{info.type_name}}</div>
          <div class="right" v-if="info.selected">
            <el-dropdown trigger="click" @command="typeSetting">
              <span class="el-dropdown-link">
                <i class="el-icon-setting el-icon--right" style="color: white"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="del"><i class="el-icon-delete"></i>删除</el-dropdown-item>
                <el-dropdown-item command="edit"><i class="el-icon-edit-outline"></i>修改</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </li>
      </ul>

    </div>
    <div class="articles">
      <div class="addArticle" @click="addArticle">
        <i class="el-icon-circle-plus"></i>新增文章
      </div>
      <ul class="article_list">
        <li :class="info.selected?'selected':''" v-for="info in articleList" @click="articleSelected(info)">
          <div class="right">
            <i :class="{'el-icon-circle-check-outline':info.status === 0 ,'el-icon-document':info.status === 1,'el-icon-goods':info.status === 2}"></i>
          </div>

          <div class="left" >
            <div class="title">{{info.title}}</div>
            <div class="content">{{info.text}}</div>
            <div class="number">字数:{{info.article_num}}</div>
          </div>
          <div class="right">
            <el-dropdown trigger="click" @command="storeGetArticle">
              <span class="el-dropdown-link">
                <i class="el-icon-setting el-icon--right" style="color: black;font-size: 1.8rem"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="ok" v-if="info.status === 0"><i class="el-icon-refresh"></i>重新发布</el-dropdown-item>
                <el-dropdown-item command="ok" v-if="info.status === 1 || info.status === 2"><i class="el-icon-upload"></i>直接发布</el-dropdown-item>
                <el-dropdown-item command="myself" v-if="info.status != 2"><i class="el-icon-goods"></i>设为私密</el-dropdown-item>
                <el-dropdown-item command="history"><i class="el-icon-time"></i>历史版本</el-dropdown-item>
                <el-dropdown-item command="detail"><i class="el-icon-view"></i>阅览文章</el-dropdown-item>
                <el-dropdown-item command="share" v-if="info.status === 0"><i class="el-icon-share"></i>分享文章</el-dropdown-item>
                <el-dropdown-item command="move"><i class="el-icon-document"></i>移动文章</el-dropdown-item>
                <el-dropdown-item command="del"><i class="el-icon-delete"></i>删除文章</el-dropdown-item>


              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </li>
      </ul>
    </div>
    <div class="article_edit">
      <articleForm>
      </articleForm>
    </div>

  </div>

</template>

<script>
  import articleForm from '@/components/articleForm'
  import {Message, MessageBox} from 'element-ui'
  import {mapState} from 'vuex'

  export default {
    components: {
      articleForm
    },
    data() {
      return {
        visible2: false,
        isDraft: false,
        newShow: false,
        typeList: [],
        typeName: '',
        checkTypeInfo: {},
        articleList: [],
        checkArticleInfo: {},
      }
    },
    created() {
      this.getTypeList();
    },
    computed: {
      ...mapState({
        articles: state => state.Article.updateArticle
      })
    },
    methods: {
      addArticle() {
        if (this.checkTypeInfo.id) {
          this.$axios.post('addArticleByTypeId', {type_id: this.checkTypeInfo.id}).then(res => {
            this.articleList = this.articleList.map(info => {
              info.selected = false
              return info
            })
            res.data.selected = true
            this.checkArticleInfo = res.data;
            this.articleList.unshift(res.data)
          }).catch(err => {
          })
        }
      },
      articleSetting(command) {
        this.storeGetArticle(command)
        if (command === 'ok'){
          this.$store.dispatch('getArticle', { id:this.checkArticleInfo.id, backId:this.checkArticleInfo.backId, typeId: this.checkTypeInfo.id, command: command })
        }
        else if (command === 'myself'){

        }
        else if (command === 'history'){}
        else if (command === 'detail'){}
        else if (command === 'share'){}
        else if (command === 'move'){}
        if (command === 'del') {
          MessageBox.confirm('此操作将 "' + this.checkArticleInfo.title + '" 文章永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.$axios.post('delArticle', {id: this.checkArticleInfo.id}).then(res => {
              this.articleList = this.articleList.filter(element => {
                return element.id != res.id;
              });
              if (this.typeList.length > 0) {
                this.typeList[0].selected = true;
              }

              Message({
                type: 'success',
                message: '删除成功!'
              });
            }).catch(err => {
            })

          }).catch(() => {
          });

        }
      },
      articleSelected(data) {
        this.checkArticleInfo = data;
        this.articleList = this.articleList.map(info => {
          if (info.id === data.id) {
            info.selected = true;
          } else {
            info.selected = false;
          }
          return info;
        })
      },
      typeSetting(command) {
        if (command === 'del') {
          MessageBox.confirm('此操作将 "' + this.checkTypeInfo.type_name + '" 文集永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.$axios.post('delType', {id: this.checkTypeInfo.id}).then(res => {
              this.typeList = this.typeList.filter(element => {
                return element.id != res.id;
              });
              if (this.typeList.length > 0) {
                this.typeList[0].selected = true;
              }

              Message({
                type: 'success',
                message: '删除成功!'
              });
            }).catch(err => {
            })

          }).catch(() => {
          });

        } else {
          MessageBox.prompt('请输入文集名称', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /\S/,
            inputErrorMessage: '文集名称不能为空'
          }).then(({value}) => {
            this.$axios.post('updateType', {id: this.checkTypeInfo.id, typeName: value}).then(res => {
              this.typeList = this.typeList.map(element => {
                if (element.id == res.id) {
                  res.selected = true
                  return res;
                }
                return element;
              });

              Message({
                type: 'success',
                message: '修改成功!'
              });
            }).catch(err => {
            })
          }).catch(() => {
          });
        }
      },
      typeSelected(info) {
        this.checkTypeInfo = info;
        for (let info of this.typeList) {
          info.selected = false
        }
        info.selected = true
        this.getArticleListByTypes(this.checkTypeInfo.id)
      },
      getTypeList() {
        this.$axios.get('getListByUserId').then(res => {
          this.typeList = res.rows.map((info, index) => {
            if (index === 0) {
              info.selected = true
              this.checkTypeInfo = info
              this.getArticleListByTypes(info.id)
            } else {
              info.selected = false
            }
            return info
          })
        }).catch(err => {
        })
      },
      addType() {
        if (this.typeName.trim() === '') {
          Message.error("文集名称不能为空")
          return false;
        }
        this.$axios.post('addType', {typeName: this.typeName}).then(res => {
          this.typeName = ''
          this.newShow = false
          Message.success("添加成功")
          this.typeList.push(res)
        }).catch(err => {

        })
      },
      getArticleListByTypes(type_id) {
        this.$axios.get('getArticleBackByTypeId', {params: {type_id: type_id}}).then(res => {
          this.articleList = res.rows.map((info, index) => {
            if (index === 0){
              info.selected = true
              this.checkArticleInfo = info
            }else{
              info.selected = false
            }
            return info;
          })
        }).catch(err => {

        })
      },
      storeGetArticle(command = null) {
        let getArticle = {}
        if(this.checkArticleInfo.id){
          getArticle = { id:this.checkArticleInfo.id, backId:this.checkArticleInfo.backId, typeId: this.checkTypeInfo.id, command: command }
        }
        this.$store.dispatch('getArticle', getArticle)
      }
    },
    watch: {
      checkArticleInfo:function (curVal, oldVal) {
        if(curVal.id != oldVal.id){
          this.storeGetArticle()
        }
      },
      articles:function (curVal, oldVal) {
        if(curVal.command != null && curVal.command == 'del'){
          this.articleList = this.articleList.filter(info=>{
            if(info.id === curVal.id){
              return false
            }
            return true;
          })
          if(this.articleList.length === 0){
            this.checkArticleInfo = {}
          }else {
            this.articleList = this.articleList.map((info,index)=>{
              if(index === 0){
                info.selected = true
                this.checkArticleInfo = info
              }else{
                info.selected = false
              }
              return info;
            })
          }
        }else{
          this.articleList = this.articleList.map(info=>{
            if(info.id === curVal.id){
              info.backId = curVal.backId
              info.title = curVal.title
              info.text = curVal.text
              info.article_num = curVal.article_num
              info.status = curVal.status
            }
            return info;
          })
        }

      }

    },
    filters: {
      contentFilters: function (value) {
        if(value.length>40){
          return value.substring(0,40);
        }
        return value
      }
    }
  }
</script>

<style scoped>
  * {
    moz-user-select: -moz-none;
    -moz-user-select: none;
    -o-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .article {
    display: flex;
    height: 100%;
    width: 100%;
  }

  .article_type {
    flex: 2;
    height: 100%;
    position: relative;
    overflow-y: hidden;
    background-color: #404040;
    color: #f2f2f2;
    z-index: 100;
  }

  .article_type header {
    padding: 10px;
    border: 1px white solid;
    width: 100%;
  }

  ._3zibT {
    padding: 30px 18px 5px;
    text-align: center;
  }

  ._3zibT a {
    display: block;
    font-size: 15px;
    padding: 9px 0;
    color: #ec7259;
    border: 1px solid rgba(236, 114, 89, .8);
    border-radius: 20px;
    -webkit-transition: border-color .2s ease-in;
    -o-transition: border-color .2s ease-in;
    transition: border-color .2s ease-in;
  }

  ._1iZMb {
    padding: 0 15px;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  ._1iZMb ._33Zlg {
    cursor: pointer;
    color: #f2f2f2;
    -webkit-transition: color .2s cubic-bezier(.645, .045, .355, 1);
    -o-transition: color .2s cubic-bezier(.645, .045, .355, 1);
    transition: color .2s cubic-bezier(.645, .045, .355, 1);
  }

  ._3zXcJ {
    position: relative;
    display: inline-block;
    text-align: center;
    height: 30px;
    line-height: 20px;
    padding: 4px 12px;
    border: 1px solid transparent;
    border-radius: 15px;
    font-size: 14px;
    font-weight: 500;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    white-space: nowrap;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-transition: all .2s cubic-bezier(.645, .045, .355, 1);
    -o-transition: all .2s cubic-bezier(.645, .045, .355, 1);
    transition: all .2s cubic-bezier(.645, .045, .355, 1);
    color: #595959;
    background-color: #fff;
    border-color: transparent;
  }

  ._1iZMb ._33Zlg span {
    font-size: 1.7rem;
  }

  ._1iZMb ._2G97m {
    overflow: hidden;
  }

  ._1iZMb ._2a1Rp {
    height: 85px;
    opacity: 1;
    margin-top: 10px;
  }

  .dwU8Q {
    color: #42c02e;
    border-color: #42c02e;
    background: #404040;
  }

  .vIzwB {
    color: #999;
    border: 0;
    background: #404040;
  }

  .M8J6Q {
    overflow: hidden;
    margin: 10px 0 0;

  }

  ._1CtV4 {
    width: 100%;
    height: 35px;
    color: #ccc;
    background-color: #595959;
    border: 1px solid #333;
    padding: 4px 6px;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 20px;
  }

  .type_list {
    overflow-y: auto;
    height: 100%;
    padding: 10px 0;
    /*border: 1px solid red;*/
  }

  .type_list li {
    cursor: pointer;
    font-size: 1.5rem;
    box-sizing: border-box;
    padding: 10px 12px;
    display: flex;
  }

  .type_list li .left {
    flex: 1;
  }

  .type_list li .right i {
    padding: 0 10px;
  }

  .type_list li:hover {
    background: #666;
    border-left: 3px solid #ec7259;
    padding-left: 10px;
  }

  .type_list .selected {
    background: #666;
    border-left: 3px solid #ec7259;
    padding-left: 10px;
  }

  .type_list::-webkit-scrollbar { /*滚动条整体样式*/
    width: 2px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  .type_list::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 2px;
    -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
    background: #ec7259;
  }

  .type_list::-webkit-scrollbar-track { /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    background: #404040;
  }

  .articles {
    flex: 3;
    height: 100%;
    width: 100%;
    border-right: 1px solid #d9d9d9;
  }

  .addArticle {
    cursor: pointer;
    width: 100%;
    padding: 20px;
    border-bottom: 1px solid #d9d9d9;
  }

  .article_list {
    width: 100%;
    display: block;
  }

  .article_list li {
    cursor: pointer;
    font-size: 1.5rem;
    box-sizing: border-box;
    display: flex;
    height: 80px;
    border-bottom: 1px solid #d9d9d9;
  }

  .article_list li .left {
    padding-left: 10px;
    flex: 1;
  }

  .article_list li .title {
    margin-top: 10px;
    font-weight: 600;
    font-size: 1.8rem;
    width: 250px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .article_list li .content {
    margin-top: 5px;
    font-weight: 500;
    font-size: 1.4rem;
    width: 250px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .article_list li .number {
    margin-top: 5px;
    font-weight: 500;
    font-size: 1.1rem;
  }

  .article_list li .right {
    padding: 30px 10px 0 10px;
  }

  .article_list li:hover {
    background: #e6e6e6;
  }

  .article_list .selected {
    background: #e6e6e6;
    border-left: 3px solid #ec7259;
  }

  .el-dropdown-menu__item i {
    margin-right: 6px;
  }

  .article_edit {
    flex: 7;
    height: 100%;
  }
</style>
