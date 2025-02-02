const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlPlguin = new HtmlWebpackPlugin({
  template:'./src/index.html',
  filename:'index.html'
})
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  // 编译模式
  mode: 'development', // development  production
  // 打包入口
  entry: path.join(__dirname, './src/index.js'),
  // 输出
  output: {
    path: path.join(__dirname, './dist'), // 输出文件的存放路径
    filename: 'bundle.js' // 输出文件的名称
  },
   plugins: [htmlPlguin, new VueLoaderPlugin()],
   module:{
     rules:[
       {test: /\.css$/, use:['style-loader','css-loader','postcss-loader'] },
       {test: /\.less$/, use:['style-loader','css-loader','less-loader'] },
       {test: /\.scss$/, use:['style-loader','css-loader','sass-loader'] },
      //  limit指定图片的大小，小于limit大小的图片才会被转为base64图片
      // ？之后是loader的参数项  
       {test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,use:'url-loader?limit=16940'},
       {test: /\.js$/, use:'babel-loader',exclude:/node_modules/ },
       {test:/\.vue$/,use:'vue-loader'}
     ]
   }
}
