var path = require('path');
var webpack = require('webpack');

var config = module.exports = {
  context: __dirname,
  entry: ['./src/ReduxInfiniteScroll.jsx']
};

config.output = {
  path: path.join(__dirname, 'dist'),

  filename: 'redux-infinite-scroll.js'
};

config.module = {
  loaders: []
};

config.plugins = [];

config.resolve = {
  // tell webpack which extensions to auto search when it resolves modules. With this,
  // you'll be able to do `require('./utils')` instead of `require('./utils.js')`
  extensions: ['', '.js', '.jsx'],
  // by default, webpack will search in `web_modules` and `node_modules`. Because we're using
  // Bower, we want it to look in there too
  modulesDirectories: [ 'node_modules']
};
