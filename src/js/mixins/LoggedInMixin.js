/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../stores/app-store.js');

var LoggedInMixin = function(cb){
  return {
    getInitialState:function(){
      return cb(this);
    },
    componentWillMount:function(){
      AppStore.addChangeListener(this._onChange)
    },
    componentWillUnmount:function(){
      AppStore.removeChangeListener(this._onChange)
    },
    _onChange:function(){
      alert('a')
    }
  }
}

module.exports = LoggedInMixin;