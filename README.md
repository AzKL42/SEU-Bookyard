# SEU-Bookyard

一个图书管理系统界面

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## 项目结构

```sh
seu-bookyard/
├── public/                   # 静态资源目录
│   ├── index.html            # 主HTML文件
│   └── favicon.ico           # 网站图标
├── src/                      # 源代码目录
│   ├── assets/               # 存放静态资源，如图片、样式文件等
│   ├── components/           # 可复用的Vue组件
│   │   └── AnnouncementInHome.vue      # 首页公告组件组件
│   │   └── Aside.vue                   # 侧边导航组件
│   │   └── Bookcard.vue                # 书本展示卡片组件
│   │   └── BookRecommendation.vue      # 首页图书推荐组件
│   │   └── Carousel.vue                # 首页轮播图（走马灯）组件
│   │   └── Header.vue                  # 头部导航组件
│   │   └── UserInfo.vue                # 用户信息组件
│   │   └── Validate.vue                # 验证码组件
│   ├── layout/               # 主界面布局
│   │   └── Layout.vue        # 主界面布局页面
│   ├── router/               # 路由配置
│   │   └── index.js          # 路由配置文件
│   ├── store/                # Vuex状态管理仓库
│   │   └── index.js          # Vuex状态管理配置文件
│   ├── utils/                # 请求封装?
│   │   └── request.js        # 请求封装文件?
│   ├── views/                # 页面级别的组件，通常用于路由映射
│   │   └── Announcement.vue            # 首页公告组件组件
│   │   └── AnnouncementDetail.vue      # 公告页面
│   │   └── Catalog.vue                 # 全部图书目录页面
│   │   └── CatalogByCategory.vue       # 分类图书页面
│   │   └── ChangePassword.vue          # 修改密码页面
│   │   └── Forget.vue                  # 密码重置页面（登录界面处的密码重置）
│   │   └── Login.vue                   # 登录页面
│   │   └── Profile.vue                 # 个人中心页面
│   │   └── Records.vue                 # 借阅记录页面
│   │   └── Register.vue                # 注册页面
│   │   └── Renew.vue                   # 用户续借界面
│   │   └── Reservation.vue             # 用户预约界面
│   │   └── Toggle.vue                  # 集合了登录和注册的页面，并添加以切换效果
│   ├── main.js               # 应用入口文件
│   ├── App.vue               # 根组件
├── .env                      # 环境变量文件
├── .gitignore                # Git忽略规则文件
├── babel.config.js           # Babel配置文件
├── package.json              # 项目配置文件，包括依赖项和脚本命令
├── jsconfig.json             # JavaScript编译选项配置文件
└── README.md                 # 项目说明文档
```

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
