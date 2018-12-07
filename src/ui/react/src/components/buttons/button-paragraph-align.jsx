(function () {
	'use strict';

	/**
	 * The ButtonParagraphAlign class provides functionality to work with table rows.
	 *
	 * @class ButtonParagraphAlign
	 */
	var ButtonParagraphAlign = createReactClass({
			// Allows validating props being passed to the component.
			propTypes: {
					/**
					 * List of the commands the button is able to handle.
					 *
					 * @instance
					 * @memberof ButtonParagraphAlign
					 * @property {Array} commands
					 */
					commands: PropTypes.arrayOf(PropTypes.object),

					/**
					 * The editor instance where the component is being used.
					 *
					 * @instance
					 * @memberof ButtonParagraphAlign
					 * @property {Object} editor
					 */
					editor: PropTypes.object.isRequired,

					/**
					 * Indicates whether the styles list is expanded or not.
					 *
					 * @instance
					 * @memberof ButtonParagraphAlign
					 * @property {Boolean} expanded
					 */
					expanded: PropTypes.bool,

					/**
					 * The label that should be used for accessibility purposes.
					 *
					 * @instance
					 * @memberof ButtonParagraphAlign
					 * @property {String} label
					 */
					label: PropTypes.string,

					/**
					 * The tabIndex of the button in its toolbar current state. A value other than -1
					 * means that the button has focus and is the active element.
					 *
					 * @instance
					 * @memberof ButtonParagraphAlign
					 * @property {Number} tabIndex
					 */
					tabIndex: PropTypes.number,

					/**
					 * Callback provided by the button host to notify when the styles list has been expanded.
					 *
					 * @instance
					 * @memberof ButtonParagraphAlign
					 * @property {Function} toggleDropdown
					 */
					toggleDropdown: PropTypes.func
			},

			// Lifecycle. Provides static properties to the widget.
			statics: {
					/**
					 * The name which will be used as an alias of the button in the configuration.
					 *
					 * @default paragraphAlign
					 * @memberof ButtonParagraphAlign
					 * @property {String} key
					 * @static
					 */
					key: 'paragraphAlign'
			},

			/**
			 * Lifecycle. Renders the UI of the button.
			 *
			 * @instance
			 * @memberof ButtonParagraphAlign
			 * @method render
			 * @return {Object} The content which should be rendered.
			 */
			render: function() {
					var activeAlignment = AlloyEditor.Strings.alignLeft;

					var buttonCommandsList;
					var buttonCommandsListId;

					if (this.props.expanded) {
							buttonCommandsListId = ButtonParagraphAlign.key + 'List';
							buttonCommandsList = <AlloyEditor.ButtonCommandsList commands={this._getCommands()} editor={this.props.editor} listId={buttonCommandsListId} inlineIcons={false} onDismiss={this.props.toggleDropdown} />
					}

					var editor = this.props.editor.get('nativeEditor');

					var activeCommand = this._getCommands().filter(
						alignment => {
							var command = editor.getCommand(alignment.command);

							return command ? command.state === CKEDITOR.TRISTATE_ON : false;
						}
					).pop();

					var iconClassName = `ae-icon-${activeCommand.icon}`;

					return (
						<div className="ae-container-dropdown ae-container-dropdown-xsmall ae-has-dropdown">
							<button aria-expanded={this.props.expanded} aria-label={activeCommand.label} aria-owns={buttonCommandsListId} className="ae-toolbar-element" onClick={this.props.toggleDropdown} role="combobox" tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.row}>
								<div className="ae-container">
									<span className={iconClassName}></span>
									<span className="ae-icon-arrow"></span>
								</div>
							</button>
							{buttonCommandsList}
						</div>
					);
			},

			/**
			 * Returns a list of commands. If a list of commands was passed
			 * as property `commands`, it will take a precedence over the default ones.
			 *
			 * @instance
			 * @memberof ButtonParagraphAlign
			 * @method _getCommands
			 * @protected
			 * @return {Array} The list of available commands.
			 */
			_getCommands: function () {
					return this.props.commands || [
							{
									command: 'justifyleft',
									icon: 'align-left',
									label: AlloyEditor.Strings.alignLeft
							},
							{
									command: 'justifycenter',
									icon: 'align-center',
									label: AlloyEditor.Strings.alignCenter
							},
							{
									command: 'justifyright',
									icon: 'align-right',
									label: AlloyEditor.Strings.alignRight
							},
							{
								command: 'justifyblock',
								icon: 'align-justified',
								label: AlloyEditor.Strings.alignJustify
							}
					];
			}
	});

	AlloyEditor.Buttons[ButtonParagraphAlign.key] = AlloyEditor.ButtonParagraphAlign = ButtonParagraphAlign;
}());