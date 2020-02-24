/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

import WidgetFocusManager from '../base/widget-focus-manager';
import ButtonCommandListItem from './button-command-list-item.jsx';

/**
 * The ButtonCommandsList class provides functionality for showing a list of commands that can be
 * executed to the current selection..
 *
 * @class ButtonCommandsList
 * @uses WidgetFocusManager
 */
class ButtonCommandsList extends React.Component {
	/**
	 * Lifecycle. Returns the default values of the properties used in the widget.
	 *
	 * @instance
	 * @memberof ButtonCommandsList
	 * @method getDefaultProps
	 * @return {Object} The default properties.
	 */
	static defaultProps = {
		circular: false,
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
	 * @default buttonCommandsList
	 * @memberof ButtonCommandsList
	 * @property {String} key
	 * @static
	 */
	static key = 'buttonCommandsList';

	constructor(props) {
		super(props);
		this._ref = React.createRef();
	}

	/**
	 * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
	 *
	 * Focuses on the list node to allow keyboard interaction.
	 *
	 * @instance
	 * @memberof ButtonCommandsList
	 * @method componentDidMount
	 */
	componentDidMount() {
		this._ref.current.focus();
	}

	/**
	 * Lifecycle. Renders the UI of the list.
	 *
	 * @instance
	 * @memberof ButtonCommandsList
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		return (
			<div
				className="ae-arrow-box ae-arrow-box-top-left ae-dropdown"
				onFocus={this.focus}
				onKeyDown={this.handleKey}
				ref={this._ref}
				tabIndex="0">
				<ul
					className="ae-listbox"
					id={this.props.listId}
					role="listbox">
					{this._renderActions(this.props.commands)}
				</ul>
			</div>
		);
	}

	/**
	 * Renders instances of ButtonCommandListItem with the description of the row action that will be executed.
	 *
	 * @instance
	 * @memberof ButtonCommandsList
	 * @method _renderActions
	 * @protected
	 * @return {Array} Rendered instances of ButtonCommandListItem class
	 */
	_renderActions(commands) {
		let items;

		if (commands && commands.length) {
			items = commands.map(item => {
				return (
					<li key={item.command} role="option">
						<ButtonCommandListItem
							command={item.command}
							description={
								typeof item.label === 'string'
									? item.label
									: item.label()
							}
							icon={item.icon}
						/>
					</li>
				);
			});
		}

		return items;
	}
}

export default WidgetFocusManager(ButtonCommandsList);
