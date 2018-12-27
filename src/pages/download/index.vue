<template>
  <div class="download">
    <div class="container top-part">
      <div class="top-logo">
        <img class="logo" src="../../assets/img/download-logo.png" alt="Misc logo">
        <div class="info">
          <div class="title">创作你的创作</div>
          <div class="slogan">一个优质创作社区</div>
        </div>
      </div>
      <img class="background-img" src="../../assets/img/download-bg.png" alt="Misc background">
      <img class="phone-img" src="../../assets/img/phone.png" alt="Misc phone">
      <div class="top-qrcode">
        <img src="../../assets/img/qrcode.png" alt="Download apps page top qrcode">
        <div class="title">扫码下载简书App</div>
        <div class="description">随时随地发现和创作内容</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>
<style>
.download {
  position: relative;
  margin-top: 110px;
}
.top-part {
  position: relative;
  margin-top: 50px;
  text-align: center;
}
.top-part .top-logo {
  margin-bottom: 40px;
}
.top-part .top-logo .logo {
  width: 100px;
  height: 100px;
}
.top-part .top-logo .info {
  display: inline-block;
  margin-left: 20px;
  text-align: left;
  vertical-align: middle;
}
.top-part .top-logo .info .title {
  font-size: 30px;
}
.top-part .top-logo .info .slogan {
  font-size: 24px;
  font-weight: 300;
}
.background-img {
  width: 765px;
  height: 172px;
  position: absolute;
  left: 50%;
  margin-left: -380px;
  z-index: -1;
}
.top-part .background-img {
  margin-top: -100px;
}
.top-part .phone-img {
  width: 410px;
  height: 314px;
}
.top-part .top-qrcode {
  display: inline-block;
  margin: 0 0 40px 40px;
  vertical-align: bottom;
  text-align: left;
}
.top-part .top-qrcode img {
  margin-left: -2px;
  width: 140px;
  height: 140px;
}
.top-part .top-qrcode .title {
  margin-top: 4px;
  font-size: 24px;
}
.top-part .top-qrcode .description {
  margin-top: 4px;
  font-size: 16px;
  font-weight: 300;
}
</style>
