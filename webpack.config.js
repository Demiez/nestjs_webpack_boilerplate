const path = require('path'),
  webpack = require('webpack'),
  nodeExternals = require('webpack-node-externals');
HtmlWebpackPlugin = require('html-webpack-plugin');

// const clientConfig = {
//   mode: process.env.NODE_ENV || 'development',
//   entry: {
//     app: ['./client/app/App.tsx'],
//     vendor: ['react', 'react-dom'],
//   },
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'js/[name].bundle.js',
//   },
//   devtool: 'eval-source-map',
//   resolve: {
//     extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(ts|tsx)$/,
//         loader: 'ts-loader',
//         options: {
//           configFile: 'tsconfig.client.json',
//         },
//       },
//       { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
//     ],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: path.resolve(__dirname, 'client', 'app', 'index.html'),
//       favicon: './client/assets/images/favicon.ico',
//     }),
//     new webpack.HotModuleReplacementPlugin(),
//   ],
// };

const serverConfig = {
  mode: process.env.NODE_ENV || 'development',
  entry: './server/main.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: 'tsconfig.server.json',
        },
      },
      {
        test: /load-package\.util\.js$/,
        loader: 'string-replace-loader',
        options: {
          search: 'require[(]([^\'"])',
          replace: '__non_webpack_require__($1',
          flags: 'g',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.mjs', '.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'eval-source-map',
  target: 'node',
  node: {
    __dirname: false,
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
    }),
  ],
  externals: [nodeExternals()],
};

module.exports = serverConfig;
