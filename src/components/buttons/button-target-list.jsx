/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';
import ReactDOM from 'react-dom';

import WidgetFocusManager from '../base/widget-focus-manager';
import ButtonDropdown from './button-dropdown.jsx';

/**
 * The ButtonTargetList class provides functionality for changing the target of a link
 * in the document.
 *
 * @class ButtonTargetList
 * @uses WidgetFocusManager
 */
class ButtonTargetList extends React.Component {
	/**
	 * Lifecycle. Returns the default values of the properties used in the widget.
	 *
	 * @instance
	 * @memberof ButtonTargetList
	 * @method getDefaultProps
	 */
	static defaultProps = {
		circular: true,
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
	 * @default linkTargetEdit
	 * @memberof ButtonTargetList
	 * @property {String} key
	 * @static
	 */
	static key = 'targetList';

	/**
	 * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
	 *
	 * @instance
	 * @memberof ButtonTargetList
	 * @method componentDidMount
	 */
	componentDidMount() {
		ReactDOM.findDOMNode(this).focus();
	}

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonTargetList
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		const listTargets = this._renderListTargets();

		return <ButtonDropdown {...this.props}>{listTargets}</ButtonDropdown>;
	}

	/**
	 * Returns the the allowed link target items.
	 *
	 * @instance
	 * @memberof ButtonTargetList
	 * @method _getAllowedTargetItems
	 * @protected
	 * @return {Array} The allowed target items.
	 */
	_getAllowedTargetItems() {
		return (
			this.props.allowedLinkTargets || [
				{
					label: AlloyEditor.Strings.linkTargetDefault,
					value: '',
				},
				{
					label: AlloyEditor.Strings.linkTargetSelf,
					value: '_self',
				},
				{
					label: AlloyEditor.Strings.linkTargetBlank,
					value: '_blank',
				},
				{
					label: AlloyEditor.Strings.linkTargetParent,
					value: '_parent',
				},
				{
					label: AlloyEditor.Strings.linkTargetTop,
					value: '_top',
				},
			]
		);
	}

	/**
	 * Renders the allowed link target items.
	 *
	 * @instance
	 * @memberof ButtonTargetList
	 * @method _renderListTargets
	 * @protected
	 * @return {Object} Returns the rendered link items
	 */
	_renderListTargets() {
		let targets = this._getAllowedTargetItems();

		const handleLinkTargetChange = this.props.handleLinkTargetChange;

		targets = targets.map(target => {
			const className =
				this.props.selectedTarget === target.value
					? 'ae-toolbar-element active'
					: 'ae-toolbar-element';

			return (
				<li key={target.value} role="option">
					<button
						className={className}
						data-value={target.value}
						onClick={handleLinkTargetChange}>
						{target.label}
					</button>
				</li>
			);
		});

		return targets;
	}
}

export default WidgetFocusManager(ButtonTargetList);
