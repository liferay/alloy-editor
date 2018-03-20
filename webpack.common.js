const webpack = require('webpack');
const path = require('path');

module.exports = {
	config: {
		entry: './src/adapter/main.js',
		output: {
            filename: 'alloy-editor-all-min.js',
            library: 'AlloyEditor',
            libraryTarget: 'window',
			path: path.resolve('dist/alloy-editor')
		},
        module: {
            rules: [
                {
                    include: __dirname,
                    exclude: /(node_modules)/,
					loader: "babel-loader",
                }
            ]
        },
	}
};
