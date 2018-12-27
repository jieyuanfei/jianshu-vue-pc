<template>
  <div class="signUp">
    <div class="sign">
      <div class="logo"><a href="/"><img src="../../assets/img/logo.png" alt="Logo"></a></div>
      <div class="main">
        <h4 class="title">
          <div class="normal-title">
            <a @click="toSignIn()">登录</a>
            <b>·</b>
            <a id="js-sign-up-btn" class="active" @click="toSignUp()">注册</a>
          </div>
        </h4>
        <div class="js-sign-up-container">
          <form class="new_user" id="new_user" accept-charset="UTF-8">
            <div class="input-prepend restyle">
              <input placeholder="你的昵称" type="text" v-model="nickname" id="user_nickname" @focus="cancelShow('tooltip1')">
              <i class="iconfont ic-user"></i>
            </div>
            <div class="input-prepend restyle no-radius js-normal">
              <input placeholder="手机号" type="tel" id="user_mobile_number" v-model="mobileNumber" @focus="cancelShow('tooltip2')">
              <i class="iconfont ic-phonenumber"></i>
            </div>
            <div class="input-prepend">
              <input placeholder="设置密码" type="password" id="user_password" v-model="password" @focus="cancelShow('tooltip3')">
              <i class="iconfont ic-password"></i>
            </div>
            <input type="button" value="注册" @click="signUpSubmit()" class="sign-up-button" id="sign_up_btn" data-disable-with="注册">
            <p class="sign-up-msg">点击 “注册” 即表示您同意并愿意遵守简书<br> <a  href="">用户协议</a> 和 <a href="">隐私政策</a> 。</p>
          </form>
          <!-- 更多注册方式 -->
          <div class="more-sign">
            <h6>社交帐号直接注册</h6>
            <ul>
              <li><a id="weixin" class="weixin" href=""><i class="iconfont ic-wechat"></i></a></li>
              <li><a id="qq" class="qq" href=""><i class="iconfont ic-qq_connect"></i></a></li>
            </ul>
          </div>
          <div class="tooltip tooltip-error fade right" role="tooltip" id="tooltip1" style="top: 7px; left: 300px; display: block;">
            <div class="tooltip-arrow tooltip-arrow-border" style="top: 50%;"></div>
            <div class="tooltip-arrow tooltip-arrow-bg" style="top: 50%;"></div>
            <div class="tooltip-inner"><i class="iconfont ic-error"></i><span>请输入昵称</span></div>
          </div>
          <div class="tooltip tooltip-error fade right" role="tooltip" id="tooltip2" style="top: 57px; left: 300px; display: block;">
            <div class="tooltip-arrow tooltip-arrow-border" style="top: 50%;"></div>
            <div class="tooltip-arrow tooltip-arrow-bg" style="top: 50%;"></div>
            <div class="tooltip-inner"><i class="iconfont ic-error"></i><span>请输入正确的手机号</span></div>
          </div>
          <div class="tooltip tooltip-error fade right" role="tooltip" id="tooltip3" style="top: 107px; left: 300px; display: block;">
            <div class="tooltip-arrow tooltip-arrow-border" style="top: 50%;"></div>
            <div class="tooltip-arrow tooltip-arrow-bg" style="top: 50%;"></div>
            <div class="tooltip-inner"><i class="iconfont ic-error"></i><span>密码不能少于6个字符</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      nickname:'',
      mobileNumber:'',
      password:''
    }
  },
  methods:{
    toSignIn(){
      this.$router.push({path:"/signIn"})
    },
    toSignUp(){
      event.stopPropagation();
    },
    signUpSubmit(){
      let flag = 0;
      //判断输入框的输入是否为空或者是否规范
      if(this.nickname === '' || !this.nickname.match(/^[\u4e00-\u9fa5A-Za-z0-9-_]*$/)){
        let tip = document.getElementById('tooltip1');
        tip.className = 'tooltip tooltip-error right in';
        flag +=1;
      }
      if(this.mobileNumber === '' || !this.mobileNumber.match(/^\d{11}$/)){
        let tip = document.getElementById('tooltip2');
        tip.className = 'tooltip tooltip-error right in';
        flag +=1;
      }
      if(this.password === '' || this.password.match(/^[a-zA-Z]\w{5,17}$/)){
        let tip = document.getElementById('tooltip3');
        tip.className = 'tooltip tooltip-error right in';
        flag +=1;
      }
      if(flag !== 0){
        return 0;
      }else{
        //注册成功
        this.$store.dispatch('signUpUser',{
          username:this.nickname,
          mobilePhone:this.mobileNumber,
          password:this.password,
          login:true
        });
        sessionStorage.setItem('isLogin','true');
        history.back(-1);
      }
    },
    //错误提示显示之后，当鼠标聚焦在输入框中，对应的错误提示不显示
    cancelShow(id){
      let tip = document.getElementById(id);
      tip.className = 'tooltip tooltip-error right fade';
    }
  }
}
</script>

<style>
.signUp {
  margin-top: -30px;
  height: 100%;
  min-width: 960px;
  min-height: 750px;
  text-align: center;
  font-size: 14px;
  background-color: #f1f1f1;
}
.signUp .title .active {
  font-weight: 700;
  color: #ea6f5a;
  border-bottom: 2px solid #ea6f5a;
}
.signUp .logo {
  position: absolute;
  top: 28px;
  /*margin-left: 50px;*/
}
.signUp .logo img {
  width: 170px;
}
.signUp .main {
  width: 400px;
  margin: 60px auto 0;
  padding: 50px 50px 30px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0,0,0,.1);
  vertical-align: middle;
  display: inline-block;
}
.signUp .title {
  margin: 0 auto 50px;
  padding: 10px;
  font-weight: 400;
  color: #969696;
}
.signUp .title a  {
  padding: 10px;
  color: #969696;
}
.signUp .title b {
  padding: 10px;
}
.signUp .js-sign-up-container {
  position: relative;
}
.signUp form {
  margin-bottom: 30px;
}
.signUp form .restyle {
  margin-bottom: 0;
}
.signUp form .input-prepend {
  position: relative;
  width: 100%;
}
.signUp form .input-prepend input {
  width: 100%;
  height: 50px;
  margin-bottom: 0;
  padding: 4px 12px 4px 35px;
  border: 1px solid #c8c8c8;
  border-radius: 0 0 4px 4px;
  background-color: hsla(0,0%,71%,.1);
  vertical-align: middle;
}
.signUp form .input-prepend i {
  position: absolute;
  top: 14px;
  left: 10px;
  font-size: 18px;
  color: #969696;
}
.signUp form .restyle input {
  border-bottom: none;
  border-radius: 4px 4px 0 0;
}
.signUp form .no-radius input {
  border-radius: 0;
}
.signUp form .no-radius input {
  border-radius: 0;
}
.signUp .sign-up-button {
  margin-top: 20px;
  width: 100%;
  padding: 9px 18px;
  font-size: 18px;
  border: none;
  border-radius: 25px;
  color: #fff;
  background: #42c02e;
  cursor: pointer;
  outline: none;
  display: block;
  clear: both;
}
.signUp .sign-up-msg {
  margin: 10px 0;
  padding: 0;
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  color: #969696;
}
.signUp .sign-up-msg a, .signUp .sign-up-msg a:hover {
  color: #3194d0;
}
.signUp .more-sign {
  margin-top: 20px;
}
.signUp .more-sign h6 {
  position: relative;
  margin: 0 0 10px;
  font-size: 12px;
  color: #b5b5b5;
}
.signUp .more-sign ul {
  margin-bottom: 10px;
  list-style: none;
}
.signUp .more-sign ul li {
  margin: 0 5px;
  display: inline-block;
}
.signUp .more-sign ul a {
  width: 50px;
  height: 50px;
  line-height: 50px;
  display: block;
}
.signUp .more-sign ul i {
  font-size: 28px;
}
.signUp .more-sign .ic-wechat {
  color: #00bb29;
}
.signUp .more-sign .ic-qq_connect {
  color: #498ad5;
}

/*------------错误提示-----------*/
.sign .tooltip-error {
  font-size: 14px;
  line-height: 25px;
  white-space: nowrap;
  background: none;
  position: absolute;
}
.tooltip.fade {
  opacity: 0;
  transition: opacity .15s linear;
}
.tooltip.right {
  margin-left: 3px;
  padding: 0 5px;
}
.tooltip.in {
  opacity: .9;
  filter: alpha(opacity=90);
}
.sign .tooltip-error.right .tooltip-arrow-border {
  border-right-color: #ea6f5a;
}
.tooltip.right .tooltip-arrow {
  top: 50%;
  left: 0;
  margin-top: -5px;
  border-width: 5px 5px 5px 0;
  border-right-color: #000;
}
.tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}
.sign .tooltip-error.right .tooltip-arrow-bg {
  left: 2px;
  border-right-color: #fff;
}
.sign .tooltip-error .tooltip-inner {
  max-width: 280px;
  color: #333;
  border: 1px solid #ea6f5a;
  background-color: #fff;
}
.tooltip-inner {
  max-width: 200px;
  padding: 3px 8px;
  color: #fff;
  text-align: center;
  background-color: #000;
  border-radius: 4px;
}
.sign .tooltip-error .tooltip-inner i {
  position: static;
  margin-right: 5px;
  font-size: 20px;
  color: #ea6f5a;
  vertical-align: middle;
}
.sign .tooltip-error .tooltip-inner span {
  vertical-align: middle;
  display: inline-block;
  /*white-space: normal;*/
  max-width: 230px;
}
</style>
