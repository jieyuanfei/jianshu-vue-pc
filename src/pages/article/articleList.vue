<template>
  <div class="list-container">
    <ul class="note-list">
      <li class="have-img" v-for="item in articleList">
        <a href="#" class="wrap-img"><img :src="item.img" alt="" class="img-blur-done"></a>
        <div class="content">
          <a href="#" class="title" v-text="item.title"></a>
          <p class="abstract" v-text="item.content"></p>
          <div class="meta">
            <a href="#" class="nickname" v-text="item.author"></a>
            <a href="#" v-text="item.command"><i class="iconfont ic-list-comments"></i></a>
            <span v-text="item.like"><i class="iconfont ic-list-like"></i></span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "articleList",
        props:['articleList']
    }
</script>

<style scoped>

</style>
