/**
 * webpack开发阶段配置文件
 */
var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app:path.resolve(__dirname,'src/js/app.js'),
        vendors:['react','react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules:[
      
            {
                test: /\.jsx?$/,
                exclude:/node_modules/,
                use:"babel-loader"
            },

            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
       
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader', 'sass-loader']
                })
            },
        
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'url-loader?limit=25000&name=images/[name].[ext]'
            },
     
            {
                test: /\.(eot|woff|ttf|woff2|svg)$/,
                use: 'url-loader?limit=25000&name=fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
  
        new CleanPlugin(['dist']),
 
        new webpack.optimize.CommonsChunkPlugin({name:'vendors', filename:'vendors.js'}),
 
        new ExtractTextPlugin('app.css'),

        new HtmlWebpackPlugin({
            template:'./src/template.html',
            htmlWebpackPlugin:{
                "files":{
                    "css":["app.css"],
                    "js":["vendors.js","bundle.js"]
                }
            },
            minify:{
                removeComments:true,
                collapseWhitespace:true,
                removeAttributeQuotes:true
            }
        }),

         new webpack.optimize.UglifyJsPlugin({
                compress:{
                    warnings:false
                }
            }
        ),  

        // new webpack.DefinePlugin({
        //     'process.env':{
        //         NODE_ENV:'"production"'
        //     }
        // })
    ]
}
