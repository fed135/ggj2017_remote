const webpack = require('webpack');

module.exports = {
	entry: './src/index.js',
	output: {
		path: '.',
		filename: 'bundle.js',
		publicPath: 'http://localhost:8080/'
	},
	//devtool: 'source-map',
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel-loader'
		}]
	},
	devServer: {
		contentBase: './',
		port: 8080,
		noInfo: true,
		hot: false,
		inline: false,
		proxy: {
			'/': {
				bypass: function (req, res, proxyOptions) {
					// Check if it's file serving or internal routing
					if (req.path.includes('.')) return '/public' + req.path;
					return '/public/index.html';
				}
			}
		}
	},
	plugins: [
		//new webpack.HotModuleReplacementPlugin()
	]
};
