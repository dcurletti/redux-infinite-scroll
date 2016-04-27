var webpack = require('webpack');
var _ = require('lodash');
var path = require('path');
var config = module.exports = require('./main.webpack.js');

config.output = _.merge(config.output, {
  filename: 'redux-infinite-scroll.js',
  libraryTarget: 'umd',
  library: 'ReduxInfiniteScroll'
});

config.externals = {
  'react': 'React',
  'react-dom': 'ReactDOM'
};

config.module.loaders.push(
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loaders: ['babel-loader']
  }
);

config.plugins.push(
  new webpack.optimize.OccurenceOrderPlugin()
);
