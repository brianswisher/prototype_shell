var App = require('./app/Index.jsx');
var React = require('react');

React.render(
  <App />,
  document.getElementById('viewport')
);

var React = require('react');
var App = React.createFactory(require('./Res.jsx'));

if (typeof window !== 'undefined') {
    window.onload = function() {
      var json = JSON.parse(document.body.getAttribute('data-json'));
      var getHost = function() {
        var host = json.host.split('//').join('').split('1/').join('0');

        if (json.ENV === 'development') {
          return host.substring(0, host.length - 1) + 1;
        } else {
          return host;
        }
      }

      React.render(
        App({
          path: json.path,
          is_mobile: json.is_mobile,
          ENV: json.ENV,
          host: getHost()
        }),
        document.getElementById("viewport"));
    }
}
