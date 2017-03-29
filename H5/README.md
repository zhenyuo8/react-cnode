# 汽车大全H5

## 注意
html下根目录index.html为主页面，其他html均是为了响应跳转做的页面，代码和index.html一样（说服不了给做服务器代理）

## 安装

```
npm install -g fis3
npm install
```
安装后把 `beforeLess/index.js` 替换 `node_modules/fis-parse-less/index.js`

## 本地开发和调试

```
fis3 server start //启动本地服务器
fis3 release -wL  //发布到本地服务器，并开启监听和自动刷新
```

## 发布

```
fis3 release test  //生成代码到dist2，对应135测试环境
fis3 release prod  //生成代码到dist_prod，对应线上环境
```