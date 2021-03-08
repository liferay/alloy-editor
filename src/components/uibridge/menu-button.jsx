/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

import EditorContext from '../../adapter/editor-context';
import ButtonDropdown from '../buttons/button-dropdown.jsx';

/* istanbul ignore if */
if (!CKEDITOR.plugins.get('ae_menubuttonbridge')) {
	const MENUBUTTON_DEFS = {};

	/**
	 * Generates a MenuButtonBridge React class for a given menuButton definition if it has not been
	 * already created based on the button name and definition.
	 *
	 * @private
	 * @method generateMenuButtonBridge
	 * @param {String} menuButtonName The menuButton's name
	 * @param {Object} menuButtonDefinition The menuButton's definition
	 * @return {Object} The generated or already existing React MenuButton Class
	 */
	function generateMenuButtonBridge(
		menuButtonName,
		menuButtonDefinition,
		editor
	) {
		let MenuButtonBridge = AlloyEditor.Buttons[menuButtonName];

		MENUBUTTON_DEFS[editor.name] = MENUBUTTON_DEFS[editor.name] || {};
		MENUBUTTON_DEFS[editor.name][menuButtonName] =
			MENUBUTTON_DEFS[editor.name][menuButtonName] ||
			menuButtonDefinition;

		if (!MenuButtonBridge) {
			MenuButtonBridge = class extends React.Component {
				static contextType = EditorContext;

				static displayName = menuButtonName;

				static key = menuButtonName;

				// API not yet implemented inside the menubutton
				// bridge. By mocking the unsupported method, we prevent
				// plugins from crashing if they make use of it.

				toFeature() {}

				render() {
					const editor = this.context.editor.get('nativeEditor');

					const panelMenuButtonDisplayName =
						MENUBUTTON_DEFS[editor.name][menuButtonName].name ||
						MENUBUTTON_DEFS[editor.name][menuButtonName].command ||
						menuButtonName;

					const buttonClassName = 'ae-button ae-button-bridge';

					const iconClassName =
						'ae-icon-' + panelMenuButtonDisplayName;

					const iconStyle = {};

					const cssStyle = CKEDITOR.skin.getIconStyle(
						panelMenuButtonDisplayName
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
						<div className="ae-container ae-has-dropdown">
							<button
								aria-expanded={this.props.expanded}
								aria-label={
									MENUBUTTON_DEFS[editor.name][menuButtonName]
										.label
								}
								className={buttonClassName}
								onClick={this.props.toggleDropdown}
								role="combobox"
								tabIndex={this.props.tabIndex}
								title={
									MENUBUTTON_DEFS[editor.name][menuButtonName]
										.label
								}>
								<span
									className={iconClassName}
									style={iconStyle}
								/>
							</button>
							{this.props.expanded && (
								<ButtonDropdown
									onDismiss={this.props.toggleDropdown}>
									{this._getMenuItems()}
								</ButtonDropdown>
							)}
						</div>
					);
				}

				_getMenuItems() {
					const editor = this.context.editor.get('nativeEditor');
					const items = menuButtonDefinition.onMenu();
					const menuItems = Object.keys(items).map(key => {
						const menuItem = editor.getMenuItem(key);

						if (!menuItem) {
							return null;
						}

						const menuItemDefinition =
							menuItem.definition || menuItem;
						const menuItemState = items[key];

						const className =
							'ae-toolbar-element ' +
							(menuItemState === CKEDITOR.TRISTATE_ON
								? 'active'
								: '');
						const disabled =
							menuItemState === CKEDITOR.TRISTATE_DISABLED;
						const onClick = function() {
							if (menuItemDefinition.command) {
								editor.execCommand(menuItemDefinition.command);
							} else if (menuItemDefinition.onClick) {
								menuItemDefinition.onClick.apply(
									menuItemDefinition
								);
							}
						};

						return (
							<li key={menuItem.name} role="option">
								<button
									className={className}
									disabled={disabled}
									onClick={onClick}>
									{menuItemDefinition.label}
								</button>
							</li>
						);
					});

					return menuItems;
				}
			};

			AlloyEditor.Buttons[menuButtonName] = MenuButtonBridge;
		}

		return MenuButtonBridge;
	}

	/* istanbul ignore else */
	if (!CKEDITOR.plugins.get('menubutton')) {
		CKEDITOR.UI_MENU_BUTTON = 'menubutton';

		CKEDITOR.plugins.add('menubutton', {});
	}

	/**
	 * CKEditor plugin that bridges the support offered by CKEditor MenuButton plugin. It takes over the
	 * responsibility of registering and creating menuButtons via:
	 * - editor.ui.addMenuButton(name, definition)
	 * - editor.ui.add(name, CKEDITOR.UI_MENUBUTTON, definition)
	 *
	 * @class CKEDITOR.plugins.ae_menubuttonbridge
	 * @requires CKEDITOR.plugins.ae_uibridge
	 * @requires CKEDITOR.plugins.ae_menubridge
	 * @constructor
	 */
	CKEDITOR.plugins.add('ae_menubuttonbridge', {
		requires: ['ae_uibridge', 'ae_menubridge'],

		/**
		 * Set the add handler for UI_MENUBUTTON to our own. We do this in the init phase to override
		 * the one in the native plugin in case it's present.
		 *
		 * @method init
		 * @param {Object} editor The CKEditor instance being initialized
		 */
		beforeInit(editor) {
			editor.ui.addMenuButton = function(
				menuButtonName,
				menuButtonDefinition
			) {
				this.add(
					menuButtonName,
					CKEDITOR.UI_MENUBUTTON,
					menuButtonDefinition
				);
			};

			editor.ui.addHandler(CKEDITOR.UI_MENUBUTTON, {
				add: generateMenuButtonBridge,
				create(menuButtonDefinition) {
					const menuButtonName =
						'buttonBridge' + ((Math.random() * 1e9) >>> 0);
					const MenuButtonBridge = generateMenuButtonBridge(
						menuButtonName,
						menuButtonDefinition
					);

					return new MenuButtonBridge();
				},
			});
		},
	});
}
