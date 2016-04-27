var webpack = require('webpack');
var _ = require('lodash');
var config = module.exports = require('./production.webpack.js');

config.output = _.merge(config.output, {
  filename: 'redux-infinite-scroll.min.js'
});

config.plugins.push(
  new webpack.optimize.UglifyJsPlugin({minimize: true})
);
