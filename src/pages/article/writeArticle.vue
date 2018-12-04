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
                <el-dropdown-item command="del">删除</el-dropdown-item>
                <el-dropdown-item command="edit">狮子头</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </li>
      </ul>

    </div>
    <div class="article_list"></div>
    <div class="article_edit"></div>
    <!--<d2-container type="full" class="page">-->
    <!--<articleForm>-->
    <!--</articleForm>-->
    <!--</d2-container>-->
  </div>

</template>

<script>
  import articleForm from '@/components/articleForm'
  import {Message} from 'element-ui'
  import index from "../../store";

  export default {
    components: {
      articleForm
    },
    data() {
      return {
        visible2:false,
        isDraft: false,
        newShow: false,
        typeList: [],
        typeName: '',
      }
    },
    created() {
      this.getTypeList();
    },
    computed: {},
    methods: {
      typeSetting(command) {
        if (command === 'logout') {
          alert(command)
        }
      },
      typeSelected(info) {
        for (let info of this.typeList) {
          info.selected = false
        }
        info.selected = true
      },
      getTypeList() {
        this.$axios.get('getListByUserId').then(res => {
          for (let index in res.rows) {
            let info = res.rows[index];
            if (index == 0) {
              info.selected = true
            } else {
              info.selected = false
            }
            this.typeList.push(info)
          }
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
    }
  }
</script>

<style scoped>
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
  .type_list li .right i{
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

  .article_list {
    flex: 3;
    height: 100%;
    border-right: 1px solid #d9d9d9;
  }

  .article_edit {
    flex: 7;
    height: 100%;
  }
</style>
