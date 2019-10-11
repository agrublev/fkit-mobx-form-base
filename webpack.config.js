const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const SizePlugin = require("size-plugin");
const WebpackBar = require("webpackbar");

const config = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                exclude: /\.module\.css$/
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"
                ],
                include: /\.module\.css$/
            },
            {
                test: /\.svg$/,
                use: "file-loader"
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    devServer: {
        clientLogLevel: "debug",
        // noInfo: false,
        stats: "errors-only", //string: 'none' | 'errors-only' | 'minimal' | 'normal' | 'verbose' object
        // quiet: false,
        hot: true,
        inline: true,
        contentBase: "./dist",
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: require("html-webpack-template"),
            inject: false,
            appMountId: "root"
        }),
        new CleanWebpackPlugin(),
        // new SizePlugin(),
        new WebpackBar({ profile: true, name: "WEBPACK BOILER" })
    ],
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\\/]node_modules[\\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    }
};

module.exports = config;
