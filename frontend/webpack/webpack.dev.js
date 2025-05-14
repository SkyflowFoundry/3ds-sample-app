const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const commonPaths = require("./paths");

module.exports = {
  mode: "development",
  entry: {
    main: commonPaths.entryPath,
  },
  output: {
    path: commonPaths.outputPath,
    filename: "[name].[fullhash].js",
    publicPath: "/",
  },

  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        loader: "eslint-loader",
        exclude: /(node_modules)/,
        options: {
          emitWarning: true,
        },
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /(node_modules)/,
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
              camelCase: true,
              localIdentName: "[local]___[hash:base64:5]",
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              limit: 8192,
              outputPath: commonPaths.devImagesFolder,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    port: 8080,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template: commonPaths.templatePath,
      favicon: commonPaths.faviconPath,
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify({
        VAULT_ID: process.env.VAULT_ID,
        VAULT_URL: process.env.VAULT_URL,
        BEFFE_URL: process.env.BEFFE_URL,
      }),
    }),
  ],
};
