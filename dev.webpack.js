var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');
var fs = require('fs');

var devEntryFiles = fs.readdirSync('./dev/src').filter(function(file) {
	return file.match(/.*\.js$/);
});

devEntryFiles = devEntryFiles.map(function(file) {
	return './dev/src/' + file
});

var config = module.exports = {
	context: __dirname,
	entry: ['./src/ReduxInfiniteScroll.jsx'].concat(devEntryFiles)
};

config.output = {
	path: path.join(__dirname, 'dev'),
	filename: 'main.js',
	libraryTarget: 'umd',
	library: 'ReduxInfiniteScroll'
};

config.module = {
	loaders: [
		{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loaders: ['babel-loader']
		}
	]
};

config.externals = {
	'react': 'React',
	'react-dom': 'ReactDOM'
};

config.plugins = [
	new webpack.optimize.OccurenceOrderPlugin()
];

config.resolve = {
	// tell webpack which extensions to auto search when it resolves modules. With this,
	// you'll be able to do `require('./utils')` instead of `require('./utils.js')`
	extensions: ['', '.js', '.jsx'],
	// by default, webpack will search in `web_modules` and `node_modules`. Because we're using
	// Bower, we want it to look in there too
	modulesDirectories: [ 'node_modules']
};
