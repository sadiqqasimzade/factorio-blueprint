const path = require("path");
const webpack = require("webpack");
const { SourceMapDevToolPlugin } = require("webpack");
module.exports = {
  entry: "./src/presentation/index.tsx",
  output: {
    path: path.resolve(__dirname, "./public/js"),
    filename: "[name].min.js",
    sourceMapFilename: "[name].js.map",
    publicPath: "/public/js/",
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
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
  },
  optimization: {
    minimize: true,
  },
  
  plugins: [
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
