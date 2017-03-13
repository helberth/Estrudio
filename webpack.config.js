// var path = require('path')
var webpack = require('webpack') // Requiring the webpack lib
var path = require('path');

module.exports = {
  //context: path.join(__dirname, "app"),
  entry: [
    'webpack-dev-server/client?http://localhost:8080', // Setting the URL for the hot reload
    'webpack/hot/only-dev-server', // Reload only the dev server
    'react-hot-loader/patch',
    './app/index.jsx'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      // loaders: ['react-hot', 'babel-loader']
      // include: path.join(__dirname, 'app')
      loaders: ['babel'] // 'react-hot!babel'
    },
      {
        test: /\.css$/,
        loader: 'style!css' // We add the css loader
      },
      {
        test: /\.json$/,
        loaders: ['json'],
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, '/dist'),
    //path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    inline: true,
    hot: true, // Activate hot loading
    progress: true,
    host: '0.0.0.0'
    /*
    proxy: {
      '*': 'http://localhost:3000' // Your external server being proxied
    }
    */
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin() // Wire in the hot loading plugin
  ]
}
