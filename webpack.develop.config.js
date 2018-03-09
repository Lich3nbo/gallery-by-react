/**
 * webpack开发阶段配置文件
 */
var path = require('path');
var webpack = require('webpack');
var OpenBrowserPlugin=require('open-browser-webpack-plugin')

module.exports = {
    entry: path.resolve(__dirname,'src/js/app.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        // webpack1的写法
        loaders: [
             //{
             //    test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
             //    loader: 'babel-loader',// webpack2不允许少写-loader
             //    query: {
             //        presets: ['es2015', 'react']
             //    }
             //},
             //{
             //    test: /\.css$/,
             //    loader: 'style-loader!css-loader'
             //},
             //{
             //    test: /\.scss$/,
             //    loader: 'style-loader!css-loader!sass-loader'
             //}
        ],

        rules:[
           
            {
                test: /\.jsx?$/,
                exclude:/node_modules/,
                use:[
                    {
                        loader:"babel-loader",
                    }
                ]

            },

            {
                test: /\.css$/,
                use:['style-loader','css-loader'],
            },
  
            {
                test: /\.scss$/,
                use:['style-loader','css-loader','sass-loader'],
            },
    
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'url-loader?limit=25000'
            },

            {
                test: /\.(eot|woff|ttf|woff2|svg)$/,
                use: 'url-loader?limit=25000'
            }
        ]
    },

    plugins: [
        new OpenBrowserPlugin({url:'http://localhost:8080',browser:'chrome'})
    ]
}
