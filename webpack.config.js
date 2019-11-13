const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin"); //打包html的插件

const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //打包css插件

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
    // html打包插件
    new HtmlWebpackPlugin({
      chunks: ["form", "index"],
      template: "./src/html/form-show.html",
      filename: "form.html"
    }),
    new HtmlWebpackPlugin({
      chunks: ["content", "index"],
      template: "./src/html/show-content.html",
      filename: "qr-content.html"
    }),

    // css打包插件
    new MiniCssExtractPlugin({
      filename: "css/[name]_[hash].css"
    })
  ]
};
