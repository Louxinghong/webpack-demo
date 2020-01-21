const path = require("path");
// const glob = require("glob");

const HtmlWebpackPlugin = require("html-webpack-plugin"); //打包html的插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //打包css插件
// const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清理dist文件内容
// let formCss = new ExtractTextWebpackPlugin("form.css");

module.exports = {
  watch: true, // 监听修改自动打包
  entry: {
    content: path.resolve(__dirname, "./src/js/content.js"),
    form: path.resolve(__dirname, "./src/js/form.js")
    // index: path.resolve(__dirname, "./src/js/index.js")
  },
  output: {
    filename: "js/[name].[hash:8].js",
    path: path.resolve(__dirname, "./dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
      }
    ]
  },
  plugins: [
    // 清理dist文件内容
    new CleanWebpackPlugin(),
    // html打包插件
    new HtmlWebpackPlugin({
      hash: true,
      title: "form",
      template: path.resolve(__dirname, "./src/html/form-show.html"),
      filename: "html/form.[hash:8].html",
      chunks: ["form"],
      minify: {
        collapseWhitespace: true //折叠空白区域 也就是压缩代码
      }
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: "show",
      template: path.resolve(__dirname, "./src/html/show-content.html"),
      filename: "html/show.[hash:8].html",
      chunks: ["content"],
      minify: {
        collapseWhitespace: true //折叠空白区域 也就是压缩代码
      }
    }),

    // css打包插件
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:8].css",
      chunkFilename: "[id].css"
    })
  ]
};
