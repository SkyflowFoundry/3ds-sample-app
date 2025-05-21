const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const commonPaths = require("./paths");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  output: {
    path: commonPaths.outputPath,
    filename: '[name].[fullhash].js',
    publicPath: '/demos/3ds',
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          sourceMap: true,
        },
      }),
    ],

    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "initial",
        },
        async: {
          test: /[\\/]node_modules[\\/]/,
          name: "async",
          chunks: "async",
          minChunks: 4,
        },
      },
    },
    runtimeChunk: true,
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
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
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
              outputPath: commonPaths.prodImagesFolder,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new TerserPlugin(),
    new CleanWebpackPlugin({ cleanAfterEveryBuildPatterns: ["*.LICENSE.txt"] }),
    new HtmlWebPackPlugin({
      template: commonPaths.templatePath,
      favicon: commonPaths.faviconPath,
    }),

    new MiniCssExtractPlugin({
      filename: `[name].css`,
      chunkFilename: `[name].css`,
    }),
    new WebpackManifestPlugin(),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify({
        VAULT_ID: process.env.VAULT_ID,
        VAULT_URL: process.env.VAULT_URL,
        BACKEND_URL: process.env.BACKEND_URL,
        ORIGIN: process.env.ORIGIN,
      }),
    }),
  ],
  devtool: "source-map",
};
