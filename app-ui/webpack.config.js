const path = require("path");
const production = process.env.NODE_ENV === "development";
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: production ? "production" : "development",
  devtool: "inline-source-map",
  entry: "./src/main.jsx",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    modules: ["node_modules"],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
      },
      { test: /\.ts$/, exclude: /node_modules/, loader: "ts-loader" },
    ],
  },

  devServer: {
    host: "localhost",
    port: 5000,
    compress: true,
    disableHostCheck: true,
    overlay: true,
  },
};
