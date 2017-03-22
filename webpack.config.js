var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require("path"); // ，引入node.js的API，获取当前目录的绝对路径

module.exports = {
    //context: , //运行环境的上下文，即运行目录
    context: __dirname, // 指定为当前目录

    // entry: './src/js/main.js',
    // entry: ['./src/js/main.js', './src/js/a.js'],
    // entry: {
    //     main: './src/js/main.js',
    //     a: './src/js/a.js',
    //     b: './src/js/b.js',
    //     c: './src/js/c.js'
    // },
    entry: './src/app.js',
    output: {
        // path: './dist/js',
        // filename: 'bundle.js',
        // filename: '[name]-[hash].js' hash是本次打包的哈希
        // filename: '[name]-[chunkhash].js' // chunkhash是本次每个文件的哈希，该文件改变时才会改变
        path: './dist',
        // filename: 'js/[name]-[chunkhash].js', //将js文件打包在js目录下
        filename: 'js/[name].bundle.js'
        // publicPath: 'http://abcd.com/' //类似地址占位符，比如我们要上线，将前缀替换成我们的网站
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',  // 最新版本的webpack，不让简写loader，所以必须加上“-loader”
                exclude: path.resolve(__dirname, 'node_modules'), // 不处理在这个文件夹里的ES6文件，即指定不打包的范围，必须是绝对路径
                include: path.resolve(__dirname, 'src/'), // 指定打包的范围，必须是绝对路径
                query: {
                    presets: ['latest'] // 告诉babel如何去处理我们的ES6，以哪个版本的ES6规则来处理，这里的lastest是所有的版本
                }
            },
            // {
            //     test: /\.css$/,
            //     loader: 'style-loader!css-loader!postcss-loader' // 使用感叹号串联loader
            //     // loaders: ["style-loader", "css-loader", "postcss-loader"] // loader的另一种写法
            // },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function () {
                            return [
                                require('postcss-import'), // 处理css中的@import
                                require('autoprefixer')  // 自动添加浏览器前缀
                            ];
                        }
                    }
                }]
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function () {
                            return [
                                require('postcss-import'), // 处理css中的@import
                                require('autoprefixer')  // 自动添加浏览器前缀
                            ];
                        }
                    }
                }, 'less-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function () {
                            return [
                                require('postcss-import'), // 处理css中的@import
                                require('autoprefixer')  // 自动添加浏览器前缀
                            ];
                        }
                    }
                }, 'sass-loader']
            }
        ]
    },
    // postcss: [
    //     require('autoprefixer')({
    //         browsers: ['last 5 versions']
    //     })
    // ],
    // plugins: [
    //     new htmlWebpackPlugin({
    //         template: 'index.html', //以这个为模板生成页面
    //         // filename: 'index-[hash].html', //为生成的html文件指定名称
    //         filename: 'a.html',
    //         inject: false, //规定js插入是在头部还是body把标签里，默认是body尾部，改为false时不插入
    //         title: 'this is a', //设置属性，用于在模板(template)里调用
    //         // date: new Date(),
    //         // minify: {
    //         //     removeComments: true, // 删除注释
    //         //     collapseWhitespace: true // 删除空白
    //         // }
    //         // chunks: ['main', 'a'] //为该页面指定要包含的js
    //         excludeChunks: ['b', 'c'] //为该页面指定要排除的js
    //     }),
    //     new htmlWebpackPlugin({
    //         template: 'index.html',
    //         filename: 'b.html',
    //         inject: false,
    //         title: 'this is b',
    //         // chunks: ['b'],
    //         excludeChunks: ['a', 'c']
    //     }),
    //     new htmlWebpackPlugin({
    //         template: 'index.html',
    //         filename: 'c.html',
    //         inject: false,
    //         title: 'this is c',
    //         // chunks: ['c'],
    //         excludeChunks: ['a', 'b']
    //     })
    // ]
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'body'
        })
    ]
};
