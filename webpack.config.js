const path = require('path');

module.exports = {
    entry: path.join(__dirname, "example", "src", "index.js"),
    output: {
        path: path.join(__dirname, "example"),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: "babel-loader", include: [path.join(__dirname, 'example') ]}
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'example')
    }
};
