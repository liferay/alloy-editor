(function () {
	'use strict';

	/**
	 * The Separator class renders a simple separator.
	 *
	 * @class ButtonBold
	 * @uses ButtonCommand
	 * @uses ButtonKeystroke
	 * @uses ButtonStateClasses
	 * @uses ButtonStyle
	 */
	var Separator = createReactClass({
			// Lifecycle. Provides static properties to the widget.
			statics: {
					/**
					 * The name which will be used as an alias of the separator in the configuration.
					 *
					 * @default |
					 * @memberof Separator
					 * @property {String} key
					 * @static
					 */
					key: 'separator'
			},

			/**
			 * Lifecycle. Renders the UI of the separator.
			 *
			 * @instance
			 * @memberof Separator
			 * @method render
			 * @return {Object} The content which should be rendered.
			 */
			render: function() {
					return (
							<span className="ae-separator"></span>
					);
			}
	});

	AlloyEditor.Buttons[Separator.key] = AlloyEditor.Separator = Separator;
}());