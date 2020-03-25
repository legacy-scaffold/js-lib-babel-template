const path = require("path");


module.exports = {
  devtool: "source-map",
  entry: path.resolve(__dirname, "../example/index.js"),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src/"),
    },
    extensions: [".js", ".css", ".less", ".scss"]
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [{ loader: "babel-loader" }],
      exclude: /(node_modules)/
    }, {
      test: /\.less$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "less-loader",
        options: { javascriptEnabled: true }
      }]
    }, {
      test: /\.(png|jpg)/,
      use: [{ loader: "file-loader" }]
    }]
  }
};

