/*globals __dirname, require, process */

module.exports = function(name) {
  var path = require("path");
  var webpack = require("webpack");

  var ENV = process.env.ENV;
  var filename = name + ".bundle.js";
  var entry = "./assets/javascripts/" + name + ".jsx";

  if (ENV === "development") {
    filename = "__" + filename;
  }

  var plugins = [
    new webpack.optimize.OccurenceOrderPlugin()
  ];

  if (ENV !== "development") {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        preserveComments: false,
        beautify: true,
        compress: {
          warnings: false
        }
      })
    );
  }

  return {
    context: __dirname,
    entry: entry,
    output: {
      filename: filename,
      path: '../public/'
    },
    plugins: plugins,
    resolve: {
      root: [path.join(__dirname, "assets/javascripts")],
      extensions: ["", ".js", ".jsx"]
    },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
        { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader?optional=runtime' },
        { test: /\.css$/, loader: "style-loader!css-loader" },
        { test: /\.otf$/, loader: "url-loader?mimetype=font/opentype" },
        { test: /\.png$/, loader: "url-loader?mimetype=image/png" },
        { test: /\.jpg$/, loader: "url-loader?mimetype=image/jpg" }
      ]
    }
  };
};
