# dingtalk[![Build Status](https://travis-ci.org/nashaofu/dingtalk.svg?branch=master)](https://travis-ci.org/nashaofu/dingtalk)[![Build status](https://ci.appveyor.com/api/projects/status/jptk80n78gdogd18/branch/master?svg=true)](https://ci.appveyor.com/project/nashaofu/dingtalk/branch/master)
钉钉桌面版，基于electron和钉钉网页版开发，支持Windows、Linux和macOS

## 安装步骤
> 直接从[GitHub releases](https://github.com/nashaofu/dingtalk/releases/latest)页面下载最新版安装包即可

## 国内仓库与版本安装包
* 国内git地址：[https://gitee.com/nashaofu/dingtalk](https://gitee.com/nashaofu/dingtalk)
* 安装包：[https://pan.baidu.com/s/12pM3fi5nphCdgGH9WAnXvw](https://pan.baidu.com/s/12pM3fi5nphCdgGH9WAnXvw)

### 特别说明，提issue请尽量到[GitHub](https://github.com/nashaofu/dingtalk)，分别处理多个仓库实在精力有限

## 手动构建
```bash
# 安装依赖
# linux系统构建rpm请运行如下命令，否则可能会打包失败
# sudo apt-get -qq update
# sudo apt-get install --no-install-recommends -y gcc-multilib g++-multilib
# sudo apt-get install --no-install-recommends -y rpm

npm install

# 打包源码
npm run build

# 生成安装包
npm run pack
```

## 贡献指南
非常欢迎有兴趣的小伙伴一起来贡献力量，我写了一份很简单的[贡献指南](./CONTRIBUTING.md)，希望能帮助你快速上手

## 截图效果
1. 二维码登录页面
![1.png](./screenshot/1.png)
2. 账号密码登录页面
![2.png](./screenshot/2.png)
3. 登录后页面展示
![3.png](./screenshot/3.png)
4. 邮箱打开效果
![4.png](./screenshot/4.png)
5. 截图效果预览
![5.png](./screenshot/5.png)
6. 网络错误页面
![6.png](./screenshot/6.png)
7. 系统设置界面
![7.png](./screenshot/7.png)
8. 关于界面
![8.png](./screenshot/8.png)

## 功能说明
1. 本版本是基于网页版钉钉和electron制作的
2. 本版本与网页版的区别
    * 解决了网页版钉钉内容区域无法最大化的问题
    * 除了少数的功能未能够完全实现，其余的使用体验和PC版钉钉基本一致
3. 支持屏幕截图，并且支持多显示器截图。截图快捷键为`ctrl+alt+a`
4. 添加应用分类，[Linux系统分类](https://specifications.freedesktop.org/menu-spec/latest/apa.html#main-category-registry)
5. 目前已经支持Linux、macOS和Windows三个平台

## 更新说明
1. 支持屏幕截图，并且支持多显示器截图。截图快捷键为`ctrl+alt+a`，2017-10-23
2. 支持网络错误页面提示，网络恢复自动跳转到登陆页面，2017-12-28
3. 修改网络错误页面，支持快捷键设置，2018-02-07
4. 更新截图功能，支持多显示器截图，目前确认支持Ubuntu16，Ubuntu17不支持，其他Linux系统未测试，其中使用了[shortcut-capture](https://github.com/nashaofu/shortcut-capture)模块来实现截图；修复设置页面不修改快捷键时，点击保存时提示错误的BUG，2018-03-03
5. 整个项目采用webpack打包，采用electron-builder来构建应用，分别构建生成三大平台安装包，2018-03-22
6. 添加关于页面，文件下载进度支持，消息提示不弹出问题修复，修复Linux更新问题，2018-04-01
7. 修复消息提示node-notifier图标显示问题，2018-04-07
8. 修改消息提示太多不能关闭导致卡顿问题，支持rpm打包，升级截图工具，2018-05-30
9. 修复视频点击之后页面跳转问题，支持一下Mac，升级一下electron，2018-08-13

## TODO
- [x] 支持网络断开时显示错误页
- [x] 添加关于页面
- [x] 消息提示在windows上不出来的BUG，或者替换为node-notifier模块
- [x] windows弹出下载提示问题
- [ ] 邮箱打不开问题

## 关于支持加密信息的说明
加密信息暂不支持，详情请看[企业信息加密相关](https://github.com/nashaofu/dingtalk/issues/2)，也欢迎各位朋友能够去研究一下，帮助实现这个功能

## 打赏
如果你觉得作者的辛苦付出有帮助到你，你可以给作者买杯咖啡！🤣
![打赏](./screenshot/reward.png)

# 贡献指南

对于想要给项目提交pr的小伙伴，请关注一下以下内容，这里将介绍项目的相关结构，以帮助你更快的能够开发你想要的功能。贡献代码，你需要掌握[electron](https://github.com/electron/electron)、[vue](https://github.com/vuejs/vue)、[webpack](https://github.com/webpack/webpack)、[node](https://github.com/nodejs/node)相关知识，并且对操作系统有一定的了解。

## 项目结构说明

1. 项目整体划分：项目整体划分为3个部分，分别为**main**、**preload**、**renderer**，三个部分分别为：
  * **main**: 主进程相关内容
  * **preload**: 由于本程序的主要界面是直接基于钉钉的网页版做的，所以再网页版页面做成的主窗口界面的功能都是通过动态注入js实现的，所以这一部分都被归类为**preload**，其中涉及了两个窗口，程序主窗口和钉邮窗口
  * **renderer**: 该部分的页面是钉钉本来没有，在由网页版改为桌面版的过程中，为了满足部分功能需要，而添加的窗口，包含关于、设置和网络错误窗口
2. 项目窗口：项目中窗口主要包含聊天主窗口(mainWin)、钉邮(emailWin)、设置(settingWin)、关于(aboutWin)和网络错误窗口(errorWin)，其中mainWin和emailWin的渲染进程代码位于**preload**文件夹下，且是采用原生js编写，其余几个窗口都位于**renderer**文件夹下，都是采用vue编写
3. 文件夹说明：
  * **build**文件夹：该文件夹主要是webpack打包相关的配置文件，子目录分别对应项目整体划分的3各部分
  * **icon**文件夹：该文件夹是存放钉钉图标文件的，除了会在项目源码中引用，还会在编译为各个平台安装包的时候作为程序icon
  * **screenshot**文件夹：该文件夹是用来存放程序截图的文件夹，开发中几乎不会使用到
  * **src**文件夹：该文件夹为项目的源码文件，包含了主进程和渲染进程的全部代码
4. 编译打包：编译打包使用了[electron-builder](https://github.com/electron-userland/electron-builder)这个模块，用了这个模块之后可以配合**electron-updater**提供自动升级功能，可以说炒鸡好用

## 代码风格：

1. 在主进程(main)和preload中，为了减小单个文件的大小，并且合理管理代码，所有的功能模块都是通过**高阶函数**的方式加载进来的，使用高阶函数的目的是为了让我们在所有的模块代码中都可以访问到dingtalk对象
2. 主进程的入口文件在调试环境时使用**index.dev.js**，正式环境使用**index.js**
3. rendder部分和普通vue项目一样，具体请参考vue光放提出的编码风格指南
4. 在所有的进程中，如果需要访问图片资源或者其他资源，请通过`path.join(app.getAppPath(), './icon/32x32.png')`的方式来获取，因为打包之后相对的目录结构不能保证一致，所以请务必注意
5. 编码时请使用ES6语法，并遵守ESLint的规则，在提交pr的时候请尽量在代码中补充好注释，并去掉不必要的代码，也好减轻review的工作量

## pr流程
1. 请在提交pr的时候详细说明修改的内容
2. 在提交pr之前，请同步代码到最新，不要提交很久以前版本的代码过来
3. pr提交代码，请提交到**dev**分支，因为**dev**分支是最新的

## 关于Issues
1. 能够提供上图的尽量上图
2. 描述尽可能详细一点，这样我们这边才能更快的了解情况，减少反复交流的时间成本

以上内容比较简陋，很多地方都没能说得很详细，如有疑问，欢迎直接交流。写得不好的地方也欢迎修改
