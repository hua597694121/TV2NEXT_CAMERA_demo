#  ProtoBuffer在TS项目中的使用

主要手段: 安装工具: protobufjs 对proto文件进行反射编码为js文件并生成接口文件 *.d.ts

## 参考链接
NPM: https://www.npmjs.com/package/protobufjs#usage-with-typescript

Using protocol buffers with Node.js + Swagger + Angular:

https://medium.com/francesco-pongetti/using-protocol-buffers-in-a-node-js-angular-web-application-fba17df8ab51

protobufjs 介绍:

https://www.jianshu.com/p/da48fb06b29f


## 介绍
protobuf.js是一个纯JavaScript实现，支持Node.js和浏览器的TypeScript，它容易使用速度快速，可以直接反射.proto文件，不需要生成任何文件。

protobuf.js是基于ByteBuffer.js的Protocol Buffers纯JavaScript实现，主要功能是解析.proto文件，构建Message类，编码解码。

GitHub地址: https://github.com/protobufjs/protobuf.js

## 安装
```shell
sudo npm install -g protobufjs
```
首先需要安装一个全局环境下的protobufjs工具集来提供CLI.
安装完成后, 执行如下命令, 会继续安装所需依赖包.
```
sudo pbjs
```

## 将.proto文件转换为.js文件
单个.proto文件转js
```shell
pbjs -t static_module -w commonjs -o [目标js文件] [原始proto文件]
 ```

 多个.proto文件转js (不推荐)
```shell
pbjs -t static-module -w commonjs -o [目标js文件] *.proto
```

## 将生成的js文件转ts
```shell
pbts -o [目标 .d.ts文件] [之前生成的js文件]
```

## 外部引用
因为生成的接口都添加了namespace范围限定(这里我们指定namespace的值为Gmt),因此声明每个接口类型需要在前面用Gmt. 点出接口类型, 并且每个接口类型都自定添加了I (Interface)前缀, 如使用接口:

Gmt.IAccountBaseInfo

## 注意事项
1.转成的ts文件中有namespace的概念。

因此每一个proto文件头部需显示声明文件所属package, 对应于.d.ts中的namespace。
否则一个接口字段中引入其他接口类型时会发生导入错乱,找不到对应接口。

2.proto一些数值类型字段转 .d.ts文件时会标识为 (number|Long|null), Long是非法类型,
js/ts基本数值类型只有number一种, 因此需要将 |Long 全部剔除.
在对应目录下一键替换:
```shell
sed -i "s/|Long//g" *.d.ts
```

3.生成的d.ts声明文件包含如下导入信息:
```ts
import * as $protobuf from "protobufjs";
```
因此项目中也要安装protobufjs工具到node_module中:
```shell
npm install protobufjs --save
```




## pbjs 命令参数说明
```code
protobuf.js v6.7.0 CLI for JavaScript
在文件格式之间转换并生成静态代码
  -t, --target 指定目标格式，可以接受需要自定义目标的路径。
                   json          JSON
                   json-module   JSON表示为模块
                   proto2        Protocol Buffers, Version 2
                   proto3        Protocol Buffers, Version 3
                   static        无反射的静态代码（本身不起作用）
                   static-module 无反射模块的静态代码
  -p, --path 将某个目录添加到包含路径中
  -o, --out 保存文件而非写入到标准输出
  --sparse 只导出从主文件引用的类型（实验）
  仅限模块目标：
  -w, --wrap       指定要使用的包装器，可接受需要自定义包装器的路径。
                   default   默认包装器支持CommonJS与AMD标准
                   commonjs  CommonJS包装器
                   amd       AMD包装器
                   es6       ES6包装器
                   closure   添加到全局protobuf的protobuf.roots上的闭包
  --dependency     指定protobuf版本，可接受有效的模块ID。
  -r, --root       指定备用的protobuf.roots名称
  -l, --lint       Linter配置，默认protbuf.js兼容规则:
                   eslint-disable block-scoped-var, id-length,
                   no-control-regex, no-magic-numbers, no-prototype-builtins,
                   no-redeclare, no-shadow, no-var, sort-vars
  --es6            启用ES6语法
  仅限原始源:
  --keep-case      保留字段大小写而非是转换为驼峰大小写
  仅限静态目标:
  --no-create      不生成用于反射兼容性的创建函数.
  --no-encode      不生成编码函数.
  --no-decode      不生成解码函数.
  --no-verify      不生成验证函数.
  --no-convert     不生成转换函数
  --no-delimited   不生成风格的编码/解码函数.
  --no-beautify    不美化生成的代码.
  --no-comments    不输出任何JSDoc注释.
  --force-long     强制对s-/u-/int64和s-/fixed64字段使用Long
  --force-number   强制对s-/u-/int64和s-/fixed64字段使用number
  --force-message  强制使用消息而非普通对象
usage: pbjs [options] file1.proto file2.json ...  (or pipe)  other | pbjs [options] -
```



