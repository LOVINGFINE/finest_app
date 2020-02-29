const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, './src/index.html'),
    filename: 'index.html'
})
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const vueLoaderPlugin = new VueLoaderPlugin()
module.exports = {
    mode: 'development',
    stats: {
        children: false
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/,
                use: 'url-loader'
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ]
    },
    plugins: [
        htmlWebpackPlugin,
        vueLoaderPlugin
    ],
    resolve: {
        alias: {
            // 设置导入包时的文件路径
            // "vue$":"vue/dist/vue.js"
        }
    },
    
    devServer: {
        proxy: {
            '/api': {
              target: 'https://api.zhuishushenqi.com/',
              pathRewrite: {'^/api' : ''},
              changeOrigin: true, 
              secure: false,          // 设置支持https协议的代理
            },
            '/api2': {
                target: 'https://chapter2.zhuishushenqi.com/',
                pathRewrite: {'^/api2' : ''},
                changeOrigin: true, 
                secure: false,          // 设置支持https协议的代理
              }
        }
    }        
}

