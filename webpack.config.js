var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //context: , //运行环境的上下文，即运行目录

    // entry: './src/js/main.js',
    // entry: ['./src/js/main.js', './src/js/a.js'],
    entry: {
        main: './src/js/main.js',
        a: './src/js/a.js',
        b: './src/js/b.js',
        c: './src/js/c.js'
    },
    output: {
        // path: './dist/js',
        // filename: 'bundle.js',
        // filename: '[name]-[hash].js' hash是本次打包的哈希
        // filename: '[name]-[chunkhash].js' // chunkhash是本次每个文件的哈希，该文件改变时才会改变
        path: './dist',
        filename: 'js/[name]-[chunkhash].js', //将js文件打包在js目录下
        publicPath: 'http://abcd.com/' //类似地址占位符，比如我们要上线，将前缀替换成我们的网站
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'index.html', //以这个为模板生成页面
            // filename: 'index-[hash].html', //为生成的html文件指定名称
            filename: 'a.html',
            inject: false, //规定js插入是在头部还是body把标签里，默认是body尾部，改为false时不插入
            title: 'this is a', //设置属性，用于在模板(template)里调用
            // date: new Date(),
            // minify: {
            //     removeComments: true, // 删除注释
            //     collapseWhitespace: true // 删除空白
            // }
            // chunks: ['main', 'a'] //为该页面指定要包含的js
            excludeChunks: ['b', 'c'] //为该页面指定要排除的js
        }),
        new htmlWebpackPlugin({
            template: 'index.html',
            filename: 'b.html',
            inject: false,
            title: 'this is b',
            // chunks: ['b'],
            excludeChunks: ['a', 'c']
        }),
        new htmlWebpackPlugin({
            template: 'index.html',
            filename: 'c.html',
            inject: false,
            title: 'this is c',
            // chunks: ['c'],
            excludeChunks: ['a', 'b']
        })
    ]
};
