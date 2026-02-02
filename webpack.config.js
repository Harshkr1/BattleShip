const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // Change to 'production' for final build
  entry: './src/index.js', // Your main JS file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Cleans the dist folder before each build
  },
  devtool: 'eval-source-map', // Helps with debugging
  devServer: {
    watchFiles: ['./src/template.html'], // Watches for HTML changes
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Your source HTML file
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};