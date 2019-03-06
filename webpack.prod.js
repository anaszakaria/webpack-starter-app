const path = require("path")
const config = require("./webpack.config")
const merge = require("webpack-merge")
const CleanWebpackPlugin = require("clean-webpack-plugin")

module.exports = merge(config, {
    mode: "production",
    output: {
        filename: "[name].[contentHash].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [new CleanWebpackPlugin()]
})
