var React = require('react');
var Link= require ('react-router-component').Link;

module.exports =
  React.createClass({

    displayName: 'App',

    render:function(){
      var style = {
        color: 'blue',
        fontFamily: 'arial'
      };
      var url='/page-one';

      return (
        <div className="app" style={style}>
          <Link href={url}>App</Link>
        </div>
      )
    }
  });
