<template>
  <div class="recommended-authors">
    <div class="title">
      <span>推荐作者</span>
      <a href="javascript:void(0)" class="page-change" @click="anotherAuthors()"><i class="iconfont ic-search-change"></i>换一批</a>
    </div>
    <ul class="list">
      <li v-for="author in authors">
        <a href="#" class="avatar"><img :src="author.img" alt=""></a>
        <a href="" class="follow"><i class="iconfont ic-follow"></i>关注</a>
        <a href="" class="name" v-text="author.name"></a>
        <p v-text="author.description"></p>
      </li>
    </ul>
    <a href="" class="find-more">查看全部 <i class="iconfont ic-link"></i></a>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
    export default {
        name: "recommendedAuthor",
        methods:{
          anotherAuthors(){
            this.$store.dispatch('anotherAuthors');
          }
        },
        computed:{
        ...mapState({
          authors:state => state.Main.authors
        })
      }
    }
</script>

<style scoped>
 .recommended-authors {
    margin-bottom: 20px;
    padding-top: 0;
    font-size: 13px;
    text-align: center;
    position: relative;
  }
 .recommended-authors .title {
    text-align: left;
  }
 .recommended-authors .title span {
    font-size: 14px;
    color: #969696;
  }
 .recommended-authors .title .page-change {
    float: right;
    display: inline-block;
    font-size: 14px;
    color: #969696;
  }
 .recommended-authors .title .page-change:hover {
    color: #787878;
  }
 .recommended-authors .list {
    margin: 0 0 20px;
    text-align: left;
    list-style: none;
  }
 .recommended-authors .list  li {
    margin-top: 15px;
  }
 .recommended-authors .avatar {
    float: left;
    width: 48px;
    height: 48px;
    margin-right: 10px;
  }
 .recommended-authors .avatar img {
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 50%;
  }
 .recommended-authors .list .follow {
    float: right;
    margin-top: 5px;
    padding: 0;
    font-size: 13px;
    color: #42c02e;
  }
 .recommended-authors .list .name {
    padding-top: 5px;
    margin-right: 60px;
    font-size: 14px;
    display: block;
  }
 .recommended-authors .list p {
    margin-top: 2px;
    font-size: 12px;
    color: #969696;
  }
 .recommended-authors .find-more {
    position: absolute;
    padding: 7px 7px 7px 12px;
    left: 0;
    width: 100%;
    font-size: 13px;
    color: #787878;
    background-color: #f7f7f7;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
  }

</style>
