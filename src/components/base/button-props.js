/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import EditorContext from '../../adapter/editor-context';

/**
 * ButtonCfgProps is a class that provides a mergeButtonCfgProps method for
 * merging React props and the native CKEDITOR's buttonCfg.
 *
 * @class ButtonProps
 */
export default WrappedComponent =>
	class ButtonProps extends WrappedComponent {
		static contextType = EditorContext;

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
		mergeButtonCfgProps(props = this.props) {
			const nativeEditor = this.context.editor.get('nativeEditor');
			const buttonCfg = nativeEditor.config.buttonCfg || {};

			return CKEDITOR.tools.merge(props, buttonCfg['linkEdit']);
		}
	};
