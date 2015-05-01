var React = require('react');

export default React.createClass({
  displayName: 'App',

  render:function(){
    var style = {
      color: 'blue',
      fontFamily: 'arial'
    };

    return (
      <div className="app" style={style}>
        App
      </div>
    )
  }
});
