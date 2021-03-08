/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

import EditorContext from '../../adapter/editor-context';

/* istanbul ignore if */
if (!CKEDITOR.plugins.get('ae_buttonbridge')) {
	const BUTTON_DEFS = {};

	/**
	 * Generates a ButtonBridge React class for a given button definition if it has not been
	 * already created based on the button name and definition.
	 *
	 * @private
	 * @method generateButtonBridge
	 * @param {String} buttonName The button's name
	 * @param {Object} buttonDefinition The button's definition
	 * @return {Object} The generated or already existing React Button Class
	 */

	function generateButtonBridge(buttonName, buttonDefinition, editor) {
		let ButtonBridge = AlloyEditor.Buttons[buttonName];

		BUTTON_DEFS[editor.name] = BUTTON_DEFS[editor.name] || {};
		BUTTON_DEFS[editor.name][buttonName] =
			BUTTON_DEFS[editor.name][buttonName] || buttonDefinition;

		if (!ButtonBridge) {
			ButtonBridge = class extends React.Component {
				static contextType = EditorContext;

				static displayName = buttonName;

				static key = buttonName;

				// API not yet implemented inside the button
				// bridge. By mocking the unsupported method, we prevent
				// plugins from crashing if they make use of it.

				toFeature() {}

				render() {
					const editor = this.context.editor.get('nativeEditor');

					const buttonClassName = 'ae-button ae-button-bridge';

					const buttonDisplayName =
						BUTTON_DEFS[editor.name][buttonName].name ||
						BUTTON_DEFS[editor.name][buttonName].command ||
						buttonName;

					const buttonLabel =
						BUTTON_DEFS[editor.name][buttonName].label;

					const buttonType = 'button-' + buttonDisplayName;

					const iconClassName = 'ae-icon-' + buttonDisplayName;

					const iconStyle = {};

					const cssStyle = CKEDITOR.skin.getIconStyle(
						buttonDisplayName
					);

					if (cssStyle) {
						const cssStyleParts = cssStyle.split(';');

						iconStyle.backgroundImage = cssStyleParts[0].substring(
							cssStyleParts[0].indexOf(':') + 1
						);
						iconStyle.backgroundPosition = cssStyleParts[1].substring(
							cssStyleParts[1].indexOf(':') + 1
						);
						iconStyle.backgroundSize = cssStyleParts[2].substring(
							cssStyleParts[2].indexOf(':') + 1
						);
					}

					return (
						<button
							aria-label={buttonLabel}
							className={buttonClassName}
							data-type={buttonType}
							onClick={this._handleClick}
							tabIndex={this.props.tabIndex}
							title={buttonLabel}>
							<span className={iconClassName} style={iconStyle} />
						</button>
					);
				}

				_handleClick = () => {
					const editor = this.context.editor.get('nativeEditor');

					const buttonCommand =
						BUTTON_DEFS[editor.name][buttonName].command;

					const buttonOnClick =
						BUTTON_DEFS[editor.name][buttonName].onClick;

					if (buttonOnClick) {
						buttonOnClick.call(this);
					} else {
						editor.execCommand(buttonCommand);
					}

					editor.fire('actionPerformed', this);
				};
			};

			AlloyEditor.Buttons[buttonName] = ButtonBridge;
		}

		return ButtonBridge;
	}

	/* istanbul ignore else */
	if (!CKEDITOR.plugins.get('button')) {
		CKEDITOR.UI_BUTTON = 'button';

		CKEDITOR.plugins.add('button', {});
	}

	/**
	 * CKEditor plugin that bridges the support offered by CKEditor Button plugin. It takes over the
	 * responsibility of registering and creating buttons via:
	 * - editor.ui.addButton(name, definition)
	 * - editor.ui.add(name, CKEDITOR.UI_BUTTON, definition)
	 *
	 * @class CKEDITOR.plugins.ae_buttonbridge
	 * @requires CKEDITOR.plugins.ae_uibridge
	 * @constructor
	 */
	CKEDITOR.plugins.add('ae_buttonbridge', {
		requires: ['ae_uibridge'],

		/**
		 * Set the add handler for UI_BUTTON to our own. We do this in the init phase to override
		 * the one in the native plugin in case it's present.
		 *
		 * @method init
		 * @param {Object} editor The CKEditor instance being initialized
		 */
		beforeInit(editor) {
			editor.ui.addButton = function(buttonName, buttonDefinition) {
				this.add(buttonName, CKEDITOR.UI_BUTTON, buttonDefinition);
			};

			editor.ui.addHandler(CKEDITOR.UI_BUTTON, {
				add: generateButtonBridge,
				create(buttonDefinition) {
					const buttonName =
						'buttonBridge' + ((Math.random() * 1e9) >>> 0);
					const ButtonBridge = generateButtonBridge(
						buttonName,
						buttonDefinition
					);

					return new ButtonBridge();
				},
			});
		},
	});
}
