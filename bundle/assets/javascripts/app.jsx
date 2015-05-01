require("../stylesheets/app.css");
require("../stylesheets/fonts.css");

var App = require('./app/Index.jsx');
var React = require('react');

React.render(
  <App />,
  document.getElementById('viewport')
);
