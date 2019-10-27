var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: "./client/src/index.js", //relative to root of the application
    output: {
        filename: "./client/src/build/bundle.js" //relative to root of the application
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Welcome to ParkBud',
            myPageHeader: 'ParkBud',
            template: './src/index.html',
            filename: './client/src/build/index.html' //relative to root of the application
        })
    ]
};