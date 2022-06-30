const htmlWebPack = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");


//Módulo que se va a exportar
module.exports = {

    mode: 'development',

    output: {
        clean: true,
    },
    module: {
        rules: [{
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                },
            },
            {
                test: /\.css$/,
                exclude: /style.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /style.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif|svg)/,
                loader: 'file-loader',
            }
        ],
    },

    optimization: {},

    plugins: [
        new htmlWebPack({
            title: 'Módulo de Webpack Development',
            filename: 'index.html', //El nombre del archivo que va a generar
            template: './index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns: [{
                from: 'src/assets/',
                to: 'assets/',
            }]
        }),
    ],
}