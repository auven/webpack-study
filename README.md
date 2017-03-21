### webpack安装和命令行

#### 第一步 初始化（我这里使用的是淘宝镜像cnpm）
```cnpm init```

#### 第二步 安装webpack
```cnpm install webpack --save-dev```

#### 第三步 安装处理css的loader
```cnpm instal css-loader style-loader --save-dev```

#### 第四步 在hello.js中引入其他文件，hello.js作为打包时的入口
```js

require('./world.js');
require('style-loader!css-loader!./style.css');
/*
这里的loader也可以直接在命令行中写，即
webpack hello.js hello.bundle.js --module-bind 'css=style-loader!css-loader'
使用的是webpack的参数“--module-bind”
*/

```

#### 第五步 打包,将多个文件打包进hello.bundle.js里
```webpack hello.js hello.bundle.js```

#### 一些参数
- 观测文件改变，自动打包 `--watch`
```webpack hello.js hello.bundle.js --watch```

- 打包百分比读条`--progress`
```webpack hello.js hello.bundle.js --progress```

- 显示打包的模块loader `--display-modules`
```webpack hello.js hello.bundle.js --progress --display-modules```

- 打包原因 `--display-reasons`
```webpack hello.js hello.bundle.js --progress --display-modules --display-reasons```

### webpack基本配置

新建配置文件webpack.config.js
```js

module.exports = {
    entry: './src/js/main.js',
    output: {
        path: './dist/js',
        filename: 'bundle.js'
    }
}

```
在控制台中输入webpack默认会执行这个脚本，也可以指定`--config`来选择脚本

entry入口可以单个也可以多个，多个时需要打包在不同的js中。

[name]:是文件名;
[hash]是本次打包的哈希;
[chunkhash]是每个文件的哈希，文件内容改变时才会改变

### 生成项目中的html页面

首先安装`html-webpack-plugin`插件: `cnpm install html-webpack-plugin --save-dev`

#### 如何使用
```js

//首先引入
var htmlWebpackPlugin = require('html-webpack-plugin');

plugins: [
        new htmlWebpackPlugin({
            template: 'index.html', //以这个为模板生成页面
            // filename: 'index-[hash].html', //为生成的html文件指定名称
            filename: 'index.html',
            inject: false, //规定js插入是在头部还是body把标签里，默认是body尾部，改为false时不插入
            title: 'webpack is good', //设置属性，用于在模板(template)里调用
            date: new Date(),
            minify: {
                removeComments: true, // 删除注释
                collapseWhitespace: true // 删除空白
            }
        })
    ]


```

支持ejs模板语法，直接在html中使用
```html

<head>
    <meta charset="UTF-8">
    <!--在这里调用了在webpack.config.js里设置的title-->
    <title><%= htmlWebpackPlugin.options.title %></title>

    <script type="text/javascript" src="<%= htmlWebpackPlugin.files.chunks.main.entry %>"></script>

</head>

<body>
    <% for (var key in htmlWebpackPlugin) { %>
        <%= key %>
    <% } %>
</body>

```

#### 生成多页面

多次使用`new htmlWebpackPlugin()`并配置相关参数。

```js

        new htmlWebpackPlugin({
            template: 'index.html',
            filename: 'b.html',
            inject: 'body',
            title: 'this is b',
            // chunks: ['b'], //为该页面指定要包含的js
            excludeChunks: ['a', 'c'] //为该页面指定要排除的js
        }),
        new htmlWebpackPlugin({
            template: 'index.html',
            filename: 'c.html',
            inject: 'body',
            title: 'this is c',
            // chunks: ['c'],
            excludeChunks: ['a', 'b']
        })

```

#### 将js直接插入页面

```html

<%= compilation.assets[htmlWebpackPlugin.files.chunks.main.entry.substr(htmlWebpackPlugin.files.publicPath.length)].source() %>

```