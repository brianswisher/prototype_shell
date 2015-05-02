var React = require('react');
var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;

var App = require('./app/Index.jsx');
var PageOne = require('./app/PageOne.jsx');

module.exports =
  React.createClass({

    displayName: 'Res',

    _getScriptPath: function(){
      var filename = 'app.bundle.js';

      if (this.props.ENV === 'development') {
        filename =  '__' + filename;
      }

      return '/' + filename;
    },

    _getJson: function(){
      return '{"ENV":"' + this.props.ENV +
        '","path":"' + this.props.path +
        '","host":"' + this.props.host +
        '","is_mobile":' + this.props.is_mobile +
        '}';
    },

    render: function(){
      return (
        <html>
          <head lang="en">
              <meta charSet="UTF-8"/>
              <title>React App</title>
          </head>
          <body data-json={this._getJson()}>
            <div id="viewport">
              <Locations path={this.props.path}>
                  <Location {...this.props}
                            path="/" handler={App} />
                  <Location {...this.props}
                            path="/page-one" handler={PageOne} />
              </Locations>
            </div>
            <script type="text/javascript"
                    src={this._getScriptPath()}></script>
          </body>
         </html>
      )
    }
  });
