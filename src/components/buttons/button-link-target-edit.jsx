/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

import ButtonIcon from './button-icon.jsx';
import ButtonTargetList from './button-target-list.jsx';

/**
 * The ButtonLinkTargetEdit class provides functionality for changing the target of a link
 * in the document.
 *
 * @class ButtonLinkTargetEdit
 */
class ButtonLinkTargetEdit extends React.Component {
	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default linkTargetEdit
	 * @memberof ButtonLinkTargetEdit
	 * @property {String} key
	 * @static
	 */
	static key = 'linkTargetEdit';

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonLinkTargetEdit
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		const handleLinkTargetChange = this.props.handleLinkTargetChange;
		const allowedLinkTargets = this.props.allowedTargets;

		return (
			<div
				className="ae-container-dropdown ae-container-dropdown-medium ae-container-edit-link-target ae-has-dropdown"
				tabIndex="0">
				<button
					aria-expanded={this.props.expanded}
					aria-label={this.props.selectedTarget}
					className="ae-toolbar-element"
					onClick={this.props.toggleDropdown}
					role="combobox"
					tabIndex={this.props.tabIndex}
					title={this.props.selectedTarget}>
					<div className="ae-container">
						<span className="ae-container-dropdown-selected-item">
							{this.props.selectedTarget}
						</span>
						<ButtonIcon symbol="caret-bottom" />
					</div>
				</button>
				{this.props.expanded && (
					<ButtonTargetList
						allowedLinkTargets={allowedLinkTargets}
						handleLinkTargetChange={handleLinkTargetChange}
						onDismiss={this.props.toggleDropdown}
						selectedTarget={this.props.selectedTarget}
					/>
				)}
			</div>
		);
	}

	/**
	 * Lifecycle. Invoked before rendering when new props or state are being received.
	 * This method is not called for the initial render or when forceUpdate is used.
	 *
	 * @instance
	 * @memberof ButtonLinkTargetEdit
	 * @method  shouldComponentUpdate
	 * @return {Boolean} Returns false when the transition to the new props and state will not
	 * require a component update.
	 */
	shouldComponentUpdate(nextProps) {
		return (
			nextProps.expanded !== this.props.expanded ||
			nextProps.selectedTarget !== this.props.selectedTarget
		);
	}
}

export default ButtonLinkTargetEdit;
