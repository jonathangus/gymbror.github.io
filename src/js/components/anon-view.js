/** @jsx React.DOM */
var React = require('react');
var Auth = require('./auth/app-auth.js');

var AnonView =
  React.createClass({

    render:function(){
      return  (
        <div>
          <Auth />
          <div className="App-video">
            <video muted autoPlay>
              <source src="assets/insp.mp4" type="video/mp4"></source>
              </video>
          </div>
        </div>
        )
    }
  });
module.exports = AnonView;