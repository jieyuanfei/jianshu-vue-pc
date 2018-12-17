<template>
  <div id="app">
    <header>
      <header-component v-show="display"></header-component>
    </header>

    <main class="app-main">
      <router-view
        class="view"
        keep-alive
        transition
        transition-mode="out-in">
      </router-view>
    </main>
  </div>
</template>

<script>
  import HeaderComponent from "./components/HeaderComponent.vue"

  export default {
    name: 'App',
    components: {
      HeaderComponent
    },
    data() {
      return {
        display: true
      }
    },
    created() {
      sessionStorage.setItem('isLogin', 'false');
    },
    mounted() {
      let path = this.$route.path;
      if (path === '/signIn' || path === '/signUp' || path === '/articleWrite') {
        this.display = false
      }
    },
    watch: {
      $route(to, from) {
        if (to.path === '/signIn' || to.path === '/signUp' || to.path === '/articleWrite') {
          this.display = false;
        } else {
          this.display = true;
        }
      }
    }
  }
</script>
<style>

</style>
<style>

  @import './assets/icon/iconfont.css';
  @import '../static/style.css';
  @import '../static/index.css';

  * {
    list-style: none;
  }

  html, body {
    height: 100%;
    padding: 0;
    margin: 0;
    border: 0;
  }
  #app{
    box-sizing: border-box;
    height: 100%;
    width: 100%;
  }

  .app-main {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
  }

  #app {
    overflow: hidden;
  }

  .app-main {
    overflow-y: auto;
  }

  .app-main::-webkit-scrollbar { /*滚动条整体样式*/
    width: 1px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  .app-main::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 1px;
    -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.2);
    background: #ec7259;
  }

  .app-main::-webkit-scrollbar-track { /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.2);
    border-radius: 1px;
    background: white;
  }
</style>
