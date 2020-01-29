module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'], // ['Chrome'], for debugging
    files: [
      { pattern: 'testing.webpack.js', watched: false }
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      'testing.webpack.js': ['webpack', 'sourcemap']
    },
    reporters: ['dots'],
    singleRun: true,
    webpack: {
      devtool: 'inline-source-map',
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }
        ]
      },
      resolve: {
        extensions: [ '.js', '.jsx']
      },
      watch: true
    },
    webpackServer: {
      noInfo: true
    },
    webpackMiddleware: {
      noInfo: true
    }
  });
};
