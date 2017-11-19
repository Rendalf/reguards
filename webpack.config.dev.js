require('react-hot-loader/patch')

const webpack = require('webpack')
const path = require('path')

const publicPath = path.resolve(__dirname, './public')
const srcPath = path.resolve(__dirname, './src')

module.exports = {
  entry: {
    index: [
      'react-hot-loader/patch',
      './src/dev/index.tsx',
    ],
  },

  output: {
    path: publicPath,
    filename: '[name].js',
    publicPath: '/js'
  },

  resolve: {
    modules: [
      srcPath,
      'node_modules',
    ],
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: [
          'react-hot-loader/webpack',
          'ts-loader'
        ],
      },
    ],
  },

  devtool: 'eval',
  cache: true,
  watch: true,

  devServer: {
    host: '0.0.0.0',
    port: 3000,
    publicPath: '/',
    hot: true,
    hotOnly: true,
    inline: true,
    contentBase: publicPath,
    stats: {
      colors: true,
      publicPath: true,
      // for profiling
      chunks: false,
      timings: true,
      reasons: false
    },
    historyApiFallback: true,
  },
}
