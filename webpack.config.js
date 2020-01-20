const path = require("path");
const glob = require("glob");

const HtmlWebpackPlugin = require("html-webpack-plugin"); //打包html的插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //打包css插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清理dist文件内容

glob("./src/components/**/*.js", function(er, files) {
  console.log(files);
  return files;
});
module.exports = {
  entry: {
    content: "./src/js/content.js",
    form: "./src/js/form.js",
    index: "./src/js/index.js"
  },
  output: {
    filename: "js/[name]_bundle_[hash].js",
    path: __dirname + "/dist"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    // 清理dist文件内容
    new CleanWebpackPlugin(),
    // html打包插件
    new HtmlWebpackPlugin({
      chunks: ["form", "index"],
      template: "./src/html/form-show.html",
      filename: "html/form.html"
    }),
    new HtmlWebpackPlugin({
      chunks: ["content", "index"],
      template: "./src/html/show-content.html",
      filename: "html/qr-content.html"
    }),

    // css打包插件
    new MiniCssExtractPlugin({
      filename: "css/[name]_[hash].css"
    })
  ]
};
