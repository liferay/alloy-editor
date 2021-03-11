/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

import Lang from '../../oop/lang';

/**
 * ToolbarButtons is a mixin which provides a list of buttons which have
 * to be displayed on the current toolbar depending on user preferences
 * and given state.
 *
 * @class ToolbarButtons
 */
const ToolbarButtons = {
	/**
	 * Analyses the current selection and returns the buttons or button
	 * groups to be rendered.
	 *
	 * @instance
	 * @method getToolbarButtonGroups
	 * @param {Array} buttons The buttons could be shown, prior to the state filtering.
	 * @param {Object} additionalProps Additional props that should be passed down to the buttons.
	 * @return {Array} An Array which contains the buttons or button groups that should be rendered.
	 */
	getToolbarButtonGroups(buttons, additionalProps) {
		const instance = this;

		if (Lang.isFunction(buttons)) {
			buttons = buttons.call(this) || [];
		}

		return buttons.reduce((list, button) => {
			if (Array.isArray(button)) {
				list.push(instance.getToolbarButtons(button, additionalProps));

				return list;
			} else {
				return instance.getToolbarButtons(buttons, additionalProps);
			}
		}, []);
	},

	/**
	 * Analyzes the current selection and the buttons exclusive mode value to figure out which
	 * buttons should be present in a given state.
	 *
	 * @instance
	 * @memberof ToolbarButtons
	 * @method getToolbarButtons
	 * @param {Array} buttons The buttons could be shown, prior to the state filtering.
	 * @param {Object} additionalProps Additional props that should be passed down to the buttons.
	 * @return {Array} An Array which contains the buttons that should be rendered.
	 */
	getToolbarButtons(buttons, additionalProps) {
		const buttonProps = {};

		const nativeEditor = this.props.editor.get('nativeEditor');
		const buttonCfg = nativeEditor.config.buttonCfg || {};

		if (Lang.isFunction(buttons)) {
			buttons = buttons.call(this) || [];
		}

		const toolbarButtons = this.filterExclusive(
			buttons
				.filter(button => {
					return (
						button &&
						(AlloyEditor.Buttons[button] ||
							AlloyEditor.Buttons[button.name])
					);
				})
				.map(button => {
					if (Lang.isString(button)) {
						buttonProps[button] = buttonCfg[button];
						button = AlloyEditor.Buttons[button];
					} else if (Lang.isString(button.name)) {
						buttonProps[
							AlloyEditor.Buttons[button.name].key
						] = CKEDITOR.tools.merge(buttonCfg[button], button.cfg);
						button = AlloyEditor.Buttons[button.name];
					}

					return button;
				})
		).map(function(button, index) {
			let props = this.mergeExclusiveProps(
				{
					editor: this.props.editor,
					key:
						button.key !== 'separator'
							? button.key
							: `${button.key}-${index}`,
					tabKey: button.key,
					tabIndex:
						this.props.trigger &&
						this.props.trigger.props.tabKey === button.key
							? 0
							: -1,
					trigger: this.props.trigger,
				},
				button.key
			);

			props = this.mergeDropdownProps(props, button.key);

			if (additionalProps) {
				props = CKEDITOR.tools.merge(props, additionalProps);
			}

			props = CKEDITOR.tools.merge(props, buttonProps[button.key]);

			return React.createElement(button, props);
		}, this);

		return toolbarButtons;
	},
};

export default ToolbarButtons;
