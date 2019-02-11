import React from 'react';
import ButtonDropdown from '../buttons/button-dropdown.jsx';
import EditorContext from '../../adapter/editor-context';

/* istanbul ignore if */
if (!CKEDITOR.plugins.get('ae_panelmenubuttonbridge')) {
	let PANEL_MENU_DEFS = {};

	/**
	 * Generates a PanelMenuButtonBridge React class for a given panelmenubutton definition if it has not been
	 * already created based on the panelmenubutton name and definition.
	 *
	 * @private
	 * @method generatePanelMenuButtonBridge
	 * @param {String} panelMenuButtonName The panel button name
	 * @param {Object} panelMenuButtonDefinition The panel button definition
	 * @return {Object} The generated or already existing React PanelMenuButton Class
	 */
	let generatePanelMenuButtonBridge = function(
		panelMenuButtonName,
		panelMenuButtonDefinition,
		editor
	) {
		let PanelMenuButtonBridge = AlloyEditor.Buttons[panelMenuButtonName];

		PANEL_MENU_DEFS[editor.name] = PANEL_MENU_DEFS[editor.name] || {};
		PANEL_MENU_DEFS[editor.name][panelMenuButtonName] =
			PANEL_MENU_DEFS[editor.name][panelMenuButtonName] ||
			panelMenuButtonDefinition;

		if (!PanelMenuButtonBridge) {
			PanelMenuButtonBridge = class extends React.Component {
				static contextType = EditorContext;

				static displayName = panelMenuButtonName;

				static key = panelMenuButtonName;

				// API not yet implemented inside the panel menu button bridge. By mocking the unsupported methods, we
				// prevent plugins from crashing if they make use of them.
				createPanel() {}

				render() {
					let editor = this.context.editor.get('nativeEditor');

					let panelMenuButtonDisplayName =
						PANEL_MENU_DEFS[editor.name][panelMenuButtonName]
							.name ||
						PANEL_MENU_DEFS[editor.name][panelMenuButtonName]
							.command ||
						panelMenuButtonName;

					let buttonClassName = 'ae-button ae-button-bridge';

					let iconClassName = 'ae-icon-' + panelMenuButtonDisplayName;

					let iconStyle = {};

					let cssStyle = CKEDITOR.skin.getIconStyle(
						panelMenuButtonDisplayName
					);

					if (cssStyle) {
						let cssStyleParts = cssStyle.split(';');

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

					let panel;

					if (this.props.expanded) {
						panel = this._getPanel();
					}

					return (
						<div className="ae-container ae-has-dropdown">
							<button
								aria-expanded={this.props.expanded}
								aria-label={
									PANEL_MENU_DEFS[editor.name][
										panelMenuButtonName
									].label
								}
								className={buttonClassName}
								onClick={this.props.toggleDropdown}
								role="combobox"
								tabIndex={this.props.tabIndex}
								title={
									PANEL_MENU_DEFS[editor.name][
										panelMenuButtonName
									].label
								}>
								<span
									className={iconClassName}
									style={iconStyle}
								/>
							</button>
							{panel}
						</div>
					);
				}

				_getPanel() {
					let editor = this.context.editor.get('nativeEditor');

					let panelMenuButtonOnBlock =
						PANEL_MENU_DEFS[editor.name][panelMenuButtonName]
							.onBlock;

					let panel = {
						hide: this.props.toggleDropdown,
						show: this.props.toggleDropdown,
					};

					let blockElement = new CKEDITOR.dom.element('div');

					let block = {
						element: blockElement,
						keys: {},
					};

					/* istanbul ignore else */
					if (panelMenuButtonOnBlock) {
						panelMenuButtonOnBlock.call(this, panel, block);
					}

					// TODO
					// Use block.keys to configure the panel keyboard navigation

					return (
						<ButtonDropdown onDismiss={this.props.toggleDropdown}>
							<div
								className={blockElement.getAttribute('class')}
								dangerouslySetInnerHTML={{
									__html: blockElement.getHtml(),
								}}
							/>
						</ButtonDropdown>
					);
				}
			};

			AlloyEditor.Buttons[panelMenuButtonName] = PanelMenuButtonBridge;
		}

		return PanelMenuButtonBridge;
	};

	/* istanbul ignore else */
	if (!CKEDITOR.plugins.get('panelmenubutton')) {
		CKEDITOR.UI_PANELBUTTON = 'panelmenubutton';

		CKEDITOR.plugins.add('panelmenubutton', {});
	}

	/* istanbul ignore else */
	if (!CKEDITOR.plugins.get('panelbutton')) {
		CKEDITOR.UI_PANELBUTTON = 'panelbutton';

		CKEDITOR.plugins.add('panelbutton', {});
	}

	/**
	 * CKEditor plugin that bridges the support offered by CKEditor PanelButton plugin. It takes over the
	 * responsibility of registering and creating buttons via:
	 * - editor.ui.addPanelMenuButton(name, definition)
	 * - editor.ui.add(name, CKEDITOR.UI_PANELBUTTON, definition)
	 *
	 * @class CKEDITOR.plugins.ae_panelmenubuttonbridge
	 * @requires CKEDITOR.plugins.ae_uibridge
	 * @constructor
	 */
	CKEDITOR.plugins.add('ae_panelmenubuttonbridge', {
		requires: ['ae_uibridge'],

		/**
		 * Set the add handler for UI_PANELBUTTON to our own. We do this in the init phase to override
		 * the one in the native plugin in case it's present
		 *
		 * @method init
		 * @param {Object} editor The CKEditor instance being initialized
		 */
		beforeInit: function(editor) {
			editor.ui.addPanelMenuButton = function(
				panelMenuButtonName,
				panelMenuButtonDefinition
			) {
				this.add(
					panelMenuButtonName,
					CKEDITOR.UI_PANELBUTTON,
					panelMenuButtonDefinition
				);
			};

			editor.ui.addHandler(CKEDITOR.UI_PANELBUTTON, {
				add: generatePanelMenuButtonBridge,
				create: function(panelMenuButtonDefinition) {
					let panelMenuButtonName =
						'panelMenuButtonBridge' + ((Math.random() * 1e9) >>> 0);
					let PanelMenuButtonBridge = generatePanelMenuButtonBridge(
						panelMenuButtonName,
						panelMenuButtonDefinition
					);

					return new PanelMenuButtonBridge();
				},
			});
		},
	});
}
