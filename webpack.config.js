module.exports = {
    // entry: './src/js/main.js',
    // entry: ['./src/js/main.js', './src/js/a.js'],
    entry: {
        main: './src/js/main.js',
        a: './src/js/a.js'
    },
    output: {
        path: './dist/js',
        // filename: 'bundle.js',
        // filename: '[name]-[hash].js' hash是本次打包的哈希
        filename: '[name]-[chunkhash].js' // chunkhash是本次每个文件的哈希，该文件改变时才会改变
    }
};
