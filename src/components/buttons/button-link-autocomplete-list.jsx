/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

import WidgetFocusManager from '../base/widget-focus-manager';
import ButtonDropdown from './button-dropdown.jsx';

/**
 * The ButtonLinkAutocompleteList class provides functionality for showing a list of
 * items that can be selected for the link.
 *
 * @class ButtonLinkAutocompleteList
 * @uses WidgetFocusManager
 */
class ButtonLinkAutocompleteList extends React.Component {
	/**
	 * Lifecycle. Returns the default values of the properties used in the widget.
	 *
	 * @instance
	 * @memberof ButtonLinkAutocompleteList
	 * @method getDefaultProps
	 * @return {Object} The default properties.
	 */
	static defaultProps = {
		circular: false,
		data: [],
		delay: 100,
		descendants: '.ae-toolbar-element',
		keys: {
			dismiss: [27],
			dismissNext: [39],
			dismissPrev: [37],
			next: [40],
			prev: [38],
		},
	};

	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default buttonLinkAutocompleteList
	 * @memberof ButtonLinkAutocompleteList
	 * @property {String} key
	 * @static
	 */
	static key = 'buttonLinkAutocompleteList';

	constructor(props) {
		super(props);

		this.state = {
			items: [],
		};
	}

	/**
	 * Lifecycle. Invoked when a component is receiving new props.
	 * This method is not called for the initial render.
	 *
	 * @instance
	 * @memberof ButtonLinkAutocompleteList
	 * @method componentWillReceiveProps
	 */
	componentWillReceiveProps(nextProps) {
		if (!nextProps.term || nextProps.term !== this.props.term) {
			clearTimeout(this._timeout);

			if (nextProps.term) {
				this._timeout = setTimeout(this._updateItems, this.props.delay);
			} else {
				this.setState({
					items: [],
				});
			}
		}

		if (nextProps.autocompleteSelected) {
			setTimeout(this.focus, 0);
			this.props.setAutocompleteState({
				selected: false,
			});
		}
	}

	/**
	 * Lifecycle. Invoked immediately before a component is unmounted from the DOM.
	 *
	 * @instance
	 * @memberof ButtonLinkAutocompleteList
	 * @method componentWillUnmount
	 */
	componentWillUnmount() {
		clearTimeout(this._timeout);
	}

	/**
	 * Lifecycle. Renders the UI of the list.
	 *
	 * @instance
	 * @memberof ButtonLinkAutocompleteList
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		if (!this.props.expanded || !this.state.items.length) {
			return null;
		}

		return (
			<ButtonDropdown>
				{this._renderAutocompleteItems(this.state.items)}
			</ButtonDropdown>
		);
	}

	/**
	 * Lifecycle. Invoked before rendering when new props or state are being received.
	 * This method is not called for the initial render or when forceUpdate is used.
	 *
	 * @instance
	 * @memberof ButtonLinkAutocompleteList
	 * @method  shouldComponentUpdate
	 * @return {Boolean} Returns false when the transition to the new props and state will not
	 * require a component update.
	 */
	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextProps.expanded !== this.props.expanded ||
			nextProps.term !== this.props.term ||
			nextState.items !== this.state.items
		);
	}

	/**
	 * Renders a set of list items for the provided items
	 *
	 * @instance
	 * @memberof ButtonLinkAutocompleteList
	 * @method _renderAutocompleteItems
	 * @param {Array} items List of autocomplete items to render
	 * @protected
	 * @return {Array} Rendered list item instances
	 */
	_renderAutocompleteItems(items) {
		items = items || [];

		const handleLinkAutocompleteClick = this.props
			.handleLinkAutocompleteClick;

		return items.map(item => {
			const className =
				this.props.term === item.url
					? 'ae-toolbar-element active'
					: 'ae-toolbar-element';

			return (
				<li key={item.url} role="option">
					<button
						className={className}
						data-value={item.url}
						onClick={handleLinkAutocompleteClick}>
						{item.title}
					</button>
				</li>
			);
		});
	}

	/**
	 * Retrieves the data according to {this.props.term} and calls setState() with the returned data
	 *
	 * @instance
	 * @memberof ButtonLinkAutocompleteList
	 * @method _updateItems
	 * @protected
	 */
	_updateItems() {
		if (!this.props.term) {
			return;
		}

		const promise = Promise.resolve(this.props.data(this.props.term));

		promise.then(items => {
			if (items.length && !this.props.expanded) {
				this.props.toggleDropdown();
			}

			this.setState({
				items,
			});
		});
	}
}

export default WidgetFocusManager(ButtonLinkAutocompleteList);
