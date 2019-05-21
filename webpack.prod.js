const path = require("path")
const config = require("./webpack.config")
const merge = require("webpack-merge")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = merge(config, {
    mode: "production",
    output: {
        filename: "[name].[contentHash].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(), // minify css
            new TerserPlugin() // default javascript minify
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), // clean dist folder before every build
        new MiniCssExtractPlugin({
            filename: '[name].[contentHash].css'
        }),
        new HtmlWebpackPlugin({
            template: './src/template.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, // 3. Exract CSS into files
                    "css-loader", // 2. Turns css into commonjs
                    "sass-loader" // 1. Turns sass into css
                ]
            }
        ]
    }
})
