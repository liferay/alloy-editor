import * as AlloyEditor from '../../src/adapter/main';
import React from 'react';
import PropTypes from 'prop-types';

if (typeof window !== 'undefined') {
	window.CKEDITOR.disableAutoInline = true;
	window.AlloyEditor = AlloyEditor;
	AlloyEditor.React = React;
	AlloyEditor.React.PropTypes = PropTypes;
	AlloyEditor.VERSION = require('./version');
}

export {AlloyEditor};
