const path = require('path');

module.exports = {
	mode: 'production',
	devServer: {
	  contentBase: "./",
	  compress: false,
	  port: 9000
	},
	entry: './'
};