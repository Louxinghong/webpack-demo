// 动态生成多文件入口

const glob = require("glob");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugin = [];

  const entryFiles = glob.sync(path.join(__dirname, "./src/js/*.js"));

  Object.keys(entryFiles).map(index => {
    const entryFile = entryFiles[index];
    const pageName = entryFile.replace(/(.*\/)*([^.]+).*/gi, "$2");

    entry[pageName] = entryFile;
    htmlWebpackPlugin.push(
      new HtmlWebpackPlugin({
        hash: true,
        title: `${pageName}`,
        template: path.resolve(__dirname, `./src/html/${pageName}.html`),
        filename: `html/${pageName}.[hash:8].html`,
        chunks: [`${pageName}`],
        minify: {
          collapseWhitespace: true //折叠空白区域 也就是压缩代码
        }
      })
    );
  });

  return { entry, htmlWebpackPlugin };
};

const { entry, htmlWebpackPlugin } = setMPA();

module.exports = {
  entry,
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
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:8].css",
      chunkFilename: "[id].css"
    })
  ].concat(htmlWebpackPlugin)
};

// 传统方法配置多文件入口

/* const path = require("path");
// const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //打包html的插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //打包css插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清理dist文件内容

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
      template: path.resolve(__dirname, "./src/html/form.html"),
      filename: "html/form.[hash:8].html",
      chunks: ["form"],
      minify: {
        collapseWhitespace: true //折叠空白区域 也就是压缩代码
      }
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: "show",
      template: path.resolve(__dirname, "./src/html/content.html"),
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
}; */
