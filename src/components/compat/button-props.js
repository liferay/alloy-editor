/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import PropTypes from 'prop-types';

import ButtonLinkEdit from '../buttons/button-link-edit.jsx';

/**
 * ButtonProps is a mixin that provides a style prop and some methods to apply the resulting
 * style and checking if it is present in a given path or selection.
 *
 * @class ButtonProps
 */
const ButtonProps = {
	// Allows validating props being passed to the component.

	propTypes: {
		/**
		 * The editor instance where the component is being used.
		 *
		 * @instance
		 * @memberof ButtonProps
		 * @property {Object} editor
		 */
		editor: PropTypes.object.isRequired,
	},

	/**
	 * Merges the properties, passed to the current component with user's configuration
	 * via `buttonCfg` property.
	 *
	 * @instance
	 * @memberof ButtonProps
	 * @method mergeButtonCfgProps
	 * @param {Object} props The properties to be merged with the provided configuration for this
	 * button. If not passed, the user configuration will be merged with `this.props`
	 * @return {Object} The merged properties
	 */
	mergeButtonCfgProps(props) {
		props = props || this.props;

		const nativeEditor = this.props.editor.get('nativeEditor');
		const buttonCfg = nativeEditor.config.buttonCfg || {};
		const result = CKEDITOR.tools.merge(
			props,
			buttonCfg[ButtonLinkEdit.key]
		);

		return result;
	},
};

export default ButtonProps;
