+ 由于guthub库搜索vue2项目大部分都是element移动端，因此本人仿照简书官网做了pc端的实操项目。
+ 本项目为纯前端实现，所有数据均为前端自造。且仅实现了部分功能。

#### 实现的功能
1. 主页，主题页，下载页，登陆注册静态页（样式均copy自简书官网）
2. 实现登陆，注册，并将登陆信息显示在头部。
3. 用户登陆成功之后，进入主题页点击关注/取消关注之后，关注数量实时+-1。在此次关闭浏览器之前，再次进入该主题页能够看到上次操作后关注的状态。
4. 路由跳转

#### 未实现及bug
1. 轮播器的显示存在bug(主页中的轮播器实现方式参考https://blog.csdn.net/qwezxc24680/article/details/77194341)
2. 主题页侧边栏专题公告的展开与收起
3. 回到顶部
4. 浏览后浏览次数+1
5. 文章列表的懒加载

#### 如下为仿简书的效果图：
1. 主页：用户登陆成功之后，红色区域显示用户信息；蓝色区域均为公用模板；橙色区域为主页中的独有内容，因此直接写在homepage.vue中
![image](https://github.com/Tempta36/fangjianshu/raw/master/src/assets/index.jpg)
2. 主题页：用户登陆之后，点击红色区域关注按钮，红色区域“2133443人关注”人数实时+1，反之亦然。
![image](https://github.com/Tempta36/fangjianshu/raw/master/src/assets/article.jpg)
3. 注册页：
![image](https://github.com/Tempta36/fangjianshu/raw/master/src/assets/signUp.jpg)
4. 其他页面无需特别说明，故未展示。

#### 版本说明
>node v8.11.3
>vue  v2.9.6

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

