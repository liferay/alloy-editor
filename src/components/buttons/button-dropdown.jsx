import WidgetFocusManager from '../base/widget-focus-manager.js';
import React from 'react';

/**
 * The ButtonDropdown class provides markup and keyboard navigation behaviour to a dropdown
 * opened from a button.
 *
 * @class ButtonDropdown
 */
class ButtonDropdown extends React.Component {
	/**
	 * Lifecycle. Returns the default values of the properties used in the widget.
	 *
	 * @instance
	 * @memberof ButtonDropdown
	 * @method getDefaultProps
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
	 * The name which will be used as an alias of the dropdown in the configuration.
	 *
	 * @default dropdown
	 * @memberof ButtonDropdown
	 * @property {String} key
	 * @static
	 */
	static key = 'dropdown';

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonDropdown
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		return (
			<div
				className="ae-dropdown ae-arrow-box ae-arrow-box-top-left"
				onFocus={this.focus}
				onKeyDown={this.handleKey}
				tabIndex="0">
				<ul className="ae-listbox" role="listbox">
					{this.props.children}
				</ul>
			</div>
		);
	}
}

export default WidgetFocusManager(ButtonDropdown);
