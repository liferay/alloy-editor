/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';
import ReactDOM from 'react-dom';

import EditorContext from '../../adapter/editor-context';
import Lang from '../../oop/lang';
import ToolbarButtons from '../base/toolbar-buttons';
import WidgetDropdown from '../base/widget-dropdown';
import WidgetExclusive from '../base/widget-exclusive';
import WidgetFocusManager from '../base/widget-focus-manager';

/**
 * The ToolbarStyles class hosts the buttons for styling a text selection.
 *
 * @class ToolbarStyles
 * @uses ToolbarButtons
 * @uses WidgetDropdown
 * @uses WidgetExclusive
 * @uses WidgetFocusManager
 */
class ToolbarStyles extends React.Component {
	static contextType = EditorContext;

	constructor(props) {
		super(props);

		this.state = {};
	}

	/**
	 * Lifecycle. Invoked once, only on the client (not on the server),
	 * immediately after the initial rendering occurs.
	 *
	 * @instance
	 * @memberof ToolbarStyles
	 * @method componentDidMount
	 */
	componentDidMount() {
		this._updatePosition();
	}

	/**
	 * Lifecycle. Invoked immediately after the component's updates are flushed to the DOM.
	 * This method is not called for the initial render.
	 *
	 * @instance
	 * @memberof ToolbarStyles
	 * @method componentDidUpdate
	 * @param {Object} prevProps The previous state of the component's properties.
	 * @param {Object} prevState Component's previous state.
	 */
	componentDidUpdate(_prevProps, _prevState) {
		this._updatePosition();
	}

	/**
	 * Lifecycle. Renders the buttons for adding content or hides the toolbar
	 * if user interacted with a non-editable element.
	 *
	 * @instance
	 * @memberof ToolbarStyles
	 * @method render
	 * @return {Object|null} The content which should be rendered.
	 */
	render() {
		const currentSelection = this._getCurrentSelection();

		if (currentSelection) {
			const getArrowBoxClassesFn = this._getSelectionFunction(
				currentSelection.getArrowBoxClasses
			);
			let arrowBoxClasses;

			if (getArrowBoxClassesFn) {
				arrowBoxClasses = getArrowBoxClassesFn();
			} else {
				arrowBoxClasses = this.getArrowBoxClasses();
			}

			const cssClasses = 'ae-toolbar-styles ' + arrowBoxClasses;

			let buttons = currentSelection.buttons;

			if (typeof buttons === 'object' && !Array.isArray(buttons)) {
				buttons =
					buttons[this.context.editor.get('mode')] ||
					buttons['simple'];
			}

			const buttonsGroup = this.getToolbarButtonGroups(buttons, {
				manualSelection: this.props.editorEvent
					? this.props.editorEvent.data.manualSelection
					: null,
				selectionType: currentSelection.name,
			});

			const hasGroups =
				buttonsGroup.filter(button => {
					return Array.isArray(button);
				}).length > 0;

			let className = 'ae-container';

			if (hasGroups) {
				className += ' ae-container-column';
			}

			return (
				<div
					aria-label={AlloyEditor.Strings.styles}
					className={cssClasses}
					data-tabindex={this.props.config.tabIndex || 0}
					onFocus={this.focus.bind(this)}
					onKeyDown={this.handleKey.bind(this)}
					role="toolbar"
					tabIndex="-1">
					<div className={className}>
						{buttonsGroup.map((value, index) => {
							if (Array.isArray(value)) {
								return (
									<div className="ae-row" key={index}>
										{value.map(button => {
											return button;
										})}
									</div>
								);
							} else {
								return value;
							}
						})}
					</div>
				</div>
			);
		}

		return null;
	}

	/**
	 * Retrieve a function from String. It converts a fully qualified string into the mapped function.
	 *
	 * @instance
	 * @memberof ToolbarStyles
	 * @method _getSelectionFunction
	 * @param {Function|String} selectionFn A function, or a fully qualified string pointing to the desired one (e.g. 'AlloyEditor.SelectionTest.image').
	 * @protected
	 * @return {Function} The mapped function.
	 */
	_getSelectionFunction(selectionFn) {
		let selectionFunction;

		if (Lang.isFunction(selectionFn)) {
			selectionFunction = selectionFn;
		} else if (Lang.isString(selectionFn)) {
			const parts = selectionFn.split('.');
			let currentMember = window;
			let property = parts.shift();

			while (
				property &&
				Lang.isObject(currentMember) &&
				Lang.isObject(currentMember[property])
			) {
				currentMember = currentMember[property];
				property = parts.shift();
			}

			if (Lang.isFunction(currentMember)) {
				selectionFunction = currentMember;
			}
		}

		return selectionFunction;
	}

	/**
	 * Analyzes the current editor selection and returns the selection configuration that matches.
	 *
	 * @instance
	 * @memberof ToolbarStyles
	 * @method _getCurrentSelection
	 * @protected
	 * @return {Object} The matched selection configuration.
	 */
	_getCurrentSelection() {
		const eventPayload = this.props.editorEvent
			? this.props.editorEvent.data
			: null;
		let selection;

		if (eventPayload) {
			this.props.config.selections.some(function(item) {
				const testFn = this._getSelectionFunction(item.test);
				let result;

				if (testFn) {
					result =
						eventPayload.manualSelection === item.name ||
						testFn({
							data: eventPayload,
							editor: this.context.editor,
						});
				}

				if (result) {
					selection = item;
				}

				return result;
			}, this);
		}

		return selection;
	}

	/**
	 * Calculates and sets the position of the toolbar.
	 *
	 * @instance
	 * @memberof ToolbarStyles
	 * @method _updatePosition
	 * @protected
	 */
	_updatePosition() {
		// If component is not mounted, there is nothing to do

		if (!ReactDOM.findDOMNode(this)) {
			return;
		}

		const currentSelection = this._getCurrentSelection();
		let result;

		// If current selection has a function called `setPosition`, call it
		// and check the returned value. If false, fallback to the default positioning logic.

		if (currentSelection) {
			const setPositionFn = this._getSelectionFunction(
				currentSelection.setPosition
			);

			if (setPositionFn) {
				result = setPositionFn.call(this, {
					editor: this.context.editor,
					editorEvent: this.props.editorEvent,
					selectionData: this.props.selectionData,
				});
			}
		}

		if (!result) {
			this.updatePosition();
			this.show();
		}
	}
}

/**
 * Lifecycle. Returns the default values of the properties used in the widget.
 *
 * @instance
 * @memberof ToolbarStyles
 * @method getDefaultProps
 * @return {Object} The default properties.
 */
ToolbarStyles.defaultProps = {
	circular: true,
	descendants: '.ae-input, .ae-button:not([disabled]), .ae-toolbar-element',
	keys: {
		dismiss: [27],
		next: [39, 40],
		prev: [37, 38],
	},
};

/**
 * The name which will be used as an alias of the button in the configuration.
 *
 * @default styles
 * @memberof ToolbarStyles
 * @property {String} key
 * @static
 */
ToolbarStyles.key = 'styles';

export default WidgetDropdown(
	WidgetExclusive(WidgetFocusManager(ToolbarButtons(ToolbarStyles)))
);
