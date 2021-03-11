const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
	contentBase: path.join(__dirname, 'dist'),
	index: 'index.html',
	port: 8000,
	proxy: {
	    '/api/**': 'http://localhost:8091'
	},
	historyApiFallback: {
	    index: 'index.html'
	}
    },
});
