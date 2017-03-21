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