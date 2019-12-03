const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const baseconfig = require("./webpack.base");


module.exports = merge(baseconfig, {
  mode: "development",
  devServer: {
    open: true,
    port: 8080,
    host: "127.0.0.1"
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
})