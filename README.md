# moobox

moobox 是一个简单的图片列表预览模块，支持全屏展示图片，快速翻页，滚轮放大，是个看妹子的好工具。喜欢的同学点个关注点个赞


##### 演示地址
[Javascript index.html](https://kyomic.github.io/moobox/ "Editor.md")

![Image text](https://kyomic.github.io/moobox/images/main.jpg)

## 使用说明
> npmjs 帐号暂不可用，待推送至npm


### 原生Javascript 项目引入流程

#### 1. 安装脚本
```javascript
npm -i @cookee/moobox
```

#### 2.插入HTML代码
> 1. 在列表项指中指定 data-moobox
> 2. href 指定大图地址
> 3. img节点的src指定缩略图地址
```html
<div >
  <a data-moobox="moobox" class="pics_pics" href="https://t7.baidu.com/it/u=2397542458,3133539061&fm=193&f=GIF">
    <img src="https://t7.baidu.com/it/u=2397542458,3133539061&fm=193&f=GIF" title="圣诞兔女郎写真" style="width: auto; height: 84px;"></a>
  <a data-moobox="moobox" class="pics_pics" href="https://t7.baidu.com/it/u=2763645735,2016465681&fm=193&f=GIF">
    <img src="https://t7.baidu.com/it/u=2763645735,2016465681&fm=193&f=GIF" title="圣诞兔女郎写真" style="width: auto; height: 84px;"></a>
</div>
```
#### 3.插入调用代码
```javascript
import { autoInstall } from '@cookee/moobox'
autoInstall()
```

### Vue 项目引入流程

#### TODO

# 后续迭代功能
1. 完善文档，支持Vue，NPM相关的安装包
2. 提供chrome插件
3. 支持图片下载功能（浏览器下载）



#关于我 

联系：<http://www.shareme.cn>  邮箱：[mailto:kyomic[at]163.com](mailto:kyomic[at]163.com)
> @kyomic

### End
