# SEU-Bookyard

一个图书管理系统界面

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## 项目结构

seu-bookyard/
├── public/                   # 静态资源目录
│   ├── index.html            # 主HTML文件
│   └── favicon.ico           # 网站图标
├── src/                      # 源代码目录
│   ├── assets/               # 存放静态资源，如图片、样式文件等
│   ├── components/           # 可复用的Vue组件
│   │   └── Header.vue        # 头部导航组件
│   │   └── Aside.vue         # 侧边导航组件
│   │   └── Validate.vue      # 验证码组件
│   ├── views/                # 页面级别的组件，通常用于路由映射
│   ├── router/               # 路由配置
│   │   └── index.js          # 路由配置文件
│   ├── store/                # Vuex状态管理仓库
│   │   └── index.js          # Vuex状态管理配置文件
│   ├── main.ts               # 应用入口文件（如果是TypeScript项目）
│   ├── main.js               # 应用入口文件（如果是JavaScript项目）
│   ├── App.vue               # 根组件
├── .env                      # 环境变量文件
├── .gitignore                # Git忽略规则文件
├── babel.config.js           # Babel配置文件
├── package.json              # 项目配置文件，包括依赖项和脚本命令
├── tsconfig.json             # TypeScript编译选项配置文件（如果有使用TypeScript）
└── README.md                 # 项目说明文档

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
