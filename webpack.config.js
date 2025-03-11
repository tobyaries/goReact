const path = require('path');

module.exports = {
    mode: 'development', // 设置为开发模式
    devtool: 'source-map',// 添加或修改 devtool
    entry: './src/index.js', // 入口文件
    output: {
        filename: 'bundle.js', // 打包后的文件名
        path: path.resolve(__dirname, 'dist'), // 打包后的文件路径
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '/'),
        },
        compress: true,
        port: 9000,
        hot: true,
        // ... 其他 devServer 配置 ...
        open: {
            app: {
                name: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            },
        },
    },
};