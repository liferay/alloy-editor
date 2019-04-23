require('./src/styles/main.scss');
require('react-app-polyfill/ie11');

const svg4everybody = require('svg4everybody');

svg4everybody();

// A stub function is needed because gatsby won't load this file otherwise
// (https://github.com/gatsbyjs/gatsby/issues/6759)
exports.onClientEntry = () => {};
