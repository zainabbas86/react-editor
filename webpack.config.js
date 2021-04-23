const path = require("path");
let webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, "./src/index.js"),
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, "./public")
    },
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [ 
            {
                test: /\.js$/i,
                use: "babel-loader"
            },
            { 
                test: /\.html$/, 
                loader: 'html-loader' 
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: [
                    "css-loader"
                ],
            },
        ]
    },
    optimization: {
        minimize: false
    },
    plugins: [
        new webpack.ProvidePlugin({
            "React": "react",
        }),
    ],
}