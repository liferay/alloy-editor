const path = require('path');

module.exports = ({actions, stage}) => {
	let module = {};

	if (stage === 'build-html') {
		module = {
			rules: [
				{
					test: /wowjs|clay-charts|clay-alert|clay-badge|clay-button|clay-dropdown|clay-tooltip|metal-clipboard|wedeploy/,
					loader: 'null-loader',
				},
			],
		};
	}

	actions.setWebpackConfig({
		module,
		resolve: {
			modules: [path.resolve(__dirname, 'src'), 'node_modules'],
			alias: {
				$components: path.resolve(__dirname, '../src/components'),
			},
		},
	});
};
