import Lang from '../../oop/lang.js';
import React from 'react';

/**
 * ToolbarButtons is a mixin which provides a list of buttons which have to be
 * displayed on the current toolbar depending on user preferences and given state.
 *
 * @class ToolbarButtons
 */
export default WrappedComponent =>
	class extends WrappedComponent {
		/**
		 * Analayses the current selection and returns the buttons or button groups to be rendered.
		 *
		 * @instance
		 * @method getToolbarButtonGroups
		 * @param {Array} buttons The buttons could be shown, prior to the state filtering.
		 * @param {Object} additionalProps Additional props that should be passed down to the buttons.
		 * @return {Array} An Array which contains the buttons or button groups that should be rendered.
		 */
		getToolbarButtonGroups(buttons, additionalProps) {
			if (Lang.isFunction(buttons)) {
				buttons = buttons.call(this) || [];
			}

			return buttons.reduce((list, button) => {
				if (Array.isArray(button)) {
					list.push(this.getToolbarButtons(button, additionalProps));
					return list;
				} else {
					return this.getToolbarButtons(buttons, additionalProps);
				}
			}, []);
		}

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
			let buttonProps = {};

			let nativeEditor = this.props.editor.get('nativeEditor');
			let buttonCfg = nativeEditor.config.buttonCfg || {};

			if (Lang.isFunction(buttons)) {
				buttons = buttons.call(this) || [];
			}

			let toolbarButtons = this.filterExclusive(
				buttons
					.filter(function(button) {
						return (
							button &&
							(AlloyEditor.Buttons[button] ||
								AlloyEditor.Buttons[button.name])
						);
					})
					.map(function(button) {
						if (Lang.isString(button)) {
							buttonProps[button] = buttonCfg[button];
							button = AlloyEditor.Buttons[button];
						} else if (Lang.isString(button.name)) {
							buttonProps[
								AlloyEditor.Buttons[button.name].key
							] = CKEDITOR.tools.merge(
								buttonCfg[button],
								button.cfg
							);
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
		}
	};
