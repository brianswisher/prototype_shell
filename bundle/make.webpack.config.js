/*globals __dirname, require, process */

module.exports = function(name) {
  var path = require("path");
  var webpack = require("webpack");

  var ENV = process.env.ENV;
  var filename = name + ".bundle.js";
  var entry = "./assets/javascripts/" + name + ".js";

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
        { test: /\.jsx$/, loader: "jsx-loader" },
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
        { test: /\.cjsx$/, loaders: ["coffee", "cjsx"]},
        { test: /\.coffee$/, loader: "coffee" },
        { test: /\.css$/, loader: "style-loader!css-loader" },
        { test: /\.scss$/, loader: "style!css!sass?outputStyle=expanded" },
        { test: /\.otf$/, loader: "url-loader?mimetype=font/opentype" },
        { test: /\.png$/, loader: "url-loader?mimetype=image/png" },
        { test: /\.jpg$/, loader: "url-loader?mimetype=image/jpg" }
      ]
    }
  };
};
