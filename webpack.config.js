const path = require("path");
const webpack = require("webpack");
const { SourceMapDevToolPlugin } = require("webpack");
module.exports = {
  entry: "./src/presentation/index.js",
  output: {
    path: path.resolve(__dirname, "./public/js"),
    filename: "[name].min.js",
    sourceMapFilename: "[name].js.map",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.scss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: { implementation: require("sass") },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new SourceMapDevToolPlugin({
      filename: "[file].map",
    }),
    
  ],
  // externalsPresets: { node: true },
  // resolve: {
  //   alias: {
  //     'react-dom$': 'react-dom/profiling',
  //   }
  // }

};