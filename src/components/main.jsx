/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

import EditorContext from '../adapter/editor-context';
import WidgetExclusive from './base/widget-exclusive';
import WidgetFocusManager from './base/widget-focus-manager';

/**
 * The main editor UI class manages a hierarchy of widgets (toolbars and buttons).
 *
 * @class UI
 * @uses WidgetExclusive
 * @uses WidgetFocusManager
 */
class UI extends React.Component {
	static contextType = EditorContext;

	/**
	 * Lifecycle. Returns the default values of the properties used in the widget.
	 *
	 * @instance
	 * @memberof UI
	 * @method getDefaultProps
	 * @return {Object} The default properties.
	 */
	static defaultProps = {
		circular: true,
		descendants: '[class^=ae-toolbar-]',
		eventsDelay: 0,
		keys: {
			next: 9,
		},
	};

	static propTypes = {
		/**
		 * Localized messages for live aria updates. Should include the following messages:
		 * - noToolbar: Notification for no available toolbar in the editor.
		 * - oneToolbar: Notification for just one available toolbar in the editor.
		 * - manyToolbars: Notification for more than one available toolbar in the editor.
		 *
		 * @instance
		 * @memberof UI
		 * @property {Object} ariaUpdates
		 */
		ariaUpdates: PropTypes.object,

		/**
		 * The delay (ms), after which key or mouse events will be processed.
		 *
		 * @instance
		 * @memberof UI
		 * @property {Number} eventsDelay
		 */
		eventsDelay: PropTypes.number,

		/**
		 * The toolbars configuration for this editor instance
		 *
		 * @instance
		 * @memberof UI
		 * @property {Object} toolbars
		 */
		toolbars: PropTypes.object.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			hidden: false,
		};
	}

	/**
	 * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
	 *
	 * @instance
	 * @memberof UI
	 * @method componentDidMount
	 */
	componentDidMount() {
		const editor = this.context.editor.get('nativeEditor');

		editor.on('editorInteraction', this._onEditorInteraction, this);
		editor.on('actionPerformed', this._onActionPerformed, this);
		editor.on('key', this._onEditorKey, this);

		// Set up events for hiding the UI when user stops interacting with the editor.
		// This may happen when he just clicks outside of the editor. However,
		// this does not include a situation when he clicks on some button, part of
		// editor's UI.

		// It is not easy to debounce _setUIHidden on mousedown, because if we
		// debounce it, when the handler is being invoked, the target might be no more part
		// of the editor's UI - onActionPerformed causes re-render.

		this._mousedownListener = event => {
			this._setUIHidden(event.target);
		};

		this._keyDownListener = CKEDITOR.tools.debounce(
			_event => {
				this._setUIHidden(document.activeElement);
			},
			this.props.eventsDelay,
			this
		);

		document.addEventListener('mousedown', this._mousedownListener);
		document.addEventListener('keydown', this._keyDownListener);
	}

	/**
	 * Lifecycle. Invoked immediately after the component's updates are flushed to the DOM.
	 * Fires `ariaUpdate` event passing ARIA related messages.
	 * Fires `editorUpdate` event passing the previous and current properties and state.
	 *
	 * @instance
	 * @memberof UI
	 * @method componentDidUpdate
	 */
	componentDidUpdate(prevProps, prevState) {
		const domNode = ReactDOM.findDOMNode(this);

		const editor = this.context.editor.get('nativeEditor');

		if (domNode) {
			editor.fire('ariaUpdate', {
				message: this._getAvailableToolbarsMessage(domNode),
			});
		}

		editor.fire('editorUpdate', {
			prevProps,
			prevState,
			props: this.props,
			state: this.state,
		});
	}

	_getAriaUpdateTemplate(ariaUpdate) {
		if (!this._ariaUpdateTemplates) {
			this._ariaUpdateTemplates = {};
		}

		if (!this._ariaUpdateTemplates[ariaUpdate]) {
			this._ariaUpdateTemplates[ariaUpdate] = new CKEDITOR.template(
				this._getAriaUpdates()[ariaUpdate]
			);
		}

		return this._ariaUpdateTemplates[ariaUpdate];
	}

	/**
	 * Returns the templates for ARIA messages.
	 *
	 * @instance
	 * @memberof UI
	 * @protected
	 * @method _getAriaUpdates
	 * @return {Object} ARIA relates messages. Default:
	 * {
	 *      noToolbar: AlloyEditor.Strings.ariaUpdateNoToolbar,
	 *      oneToolbar: AlloyEditor.Strings.ariaUpdateOneToolbar,
	 *      manyToolbars: AlloyEditor.Strings.ariaUpdateManyToolbars
	 *  }
	 */
	_getAriaUpdates() {
		return (
			this.props.ariaUpdates || {
				noToolbar: AlloyEditor.Strings.ariaUpdateNoToolbar,
				oneToolbar: AlloyEditor.Strings.ariaUpdateOneToolbar,
				manyToolbars: AlloyEditor.Strings.ariaUpdateManyToolbars,
			}
		);
	}

	/**
	 * Returns an ARIA message which represents the number of currently available toolbars.
	 *
	 * @instance
	 * @memberof UI
	 * @method _getAvailableToolbarsMessage
	 * @protected
	 * @param {CKEDITOR.dom.element} domNode The DOM node from which the available toolbars will be retrieved.
	 * @return {String} The ARIA message for the number of available toolbars
	 */
	_getAvailableToolbarsMessage(domNode) {
		const toolbarsNodeList = domNode.querySelectorAll('[role="toolbar"]');

		if (!toolbarsNodeList.length) {
			return this._getAriaUpdates().noToolbar;
		} else {
			const toolbarNames = Array.prototype.slice
				.call(toolbarsNodeList)
				.map(toolbar => {
					return toolbar.getAttribute('aria-label');
				});

			const ariaUpdate =
				toolbarNames.length === 1 ? 'oneToolbar' : 'manyToolbars';

			return this._getAriaUpdateTemplate(ariaUpdate).output({
				toolbars: toolbarNames
					.join(',')
					.replace(/,([^,]*)$/, ' and ' + '$1'),
			});
		}
	}

	/**
	 * Lifecycle. Invoked immediately before a component is unmounted from the DOM.
	 *
	 * @instance
	 * @memberof UI
	 * @method componentWillUnmount
	 */
	componentWillUnmount() {
		if (this._mousedownListener) {
			document.removeEventListener('mousedown', this._mousedownListener);
		}

		if (this._keyDownListener) {
			this._keyDownListener.detach();
			document.removeEventListener('keydown', this._keyDownListener);
		}
	}

	/**
	 * Lifecycle. Renders the UI of the editor. This may include several toolbars and buttons.
	 * The editor's UI also takes care of rendering the items in exclusive mode.
	 *
	 * @instance
	 * @memberof UI
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		if (this.state.hidden) {
			return null;
		}

		let toolbars = Object.keys(this.props.toolbars).map(toolbar => {
			return AlloyEditor.Toolbars[toolbar] || window[toolbar];
		});

		toolbars = this.filterExclusive(toolbars).map(toolbar => {
			const props = this.mergeExclusiveProps(
				{
					config: this.props.toolbars[toolbar.key],
					editor: this.context.editor,
					editorEvent: this.state.editorEvent,
					key: toolbar.key,
					onDismiss: this._onDismissToolbarFocus,
					selectionData: this.state.selectionData,
				},
				toolbar.key
			);

			return React.createElement(toolbar, props);
		});

		return (
			<div className="ae-toolbars" onKeyDown={this.handleKey}>
				{toolbars}
			</div>
		);
	}

	/**
	 * Listener to the editor's `actionPerformed` event. Sets state and redraws the UI of the editor.
	 *
	 * @instance
	 * @memberof UI
	 * @protected
	 * @method _onActionPerformed
	 * @param {SynteticEvent} event The provided event
	 */
	_onActionPerformed(_event) {
		const editor = this.context.editor.get('nativeEditor');

		editor.focus();

		this.setState({
			itemExclusive: null,
			selectionData: editor.getSelectionData(),
		});
	}

	/**
	 * Executed when a dismiss key is pressed over a toolbar to return the focus to the editor.
	 *
	 * @instance
	 * @memberof UI
	 * @protected
	 * @method _onDismissToolbarFocus
	 */
	_onDismissToolbarFocus = () => {
		const editor = this.context.editor.get('nativeEditor');

		editor.focus();
	};

	/**
	 * Listener to the editor's `userInteraction` event. Retrieves the data about the user selection and
	 * provides it via component's state property.
	 *
	 * @instance
	 * @memberof UI
	 * @protected
	 * @method _onEditorInteraction
	 * @param {SynteticEvent} event The provided event
	 */
	_onEditorInteraction(event) {
		this.setState({
			editorEvent: event,
			hidden: false,
			itemExclusive: null,
			selectionData: event.data.selectionData,
		});
	}

	/**
	 * Focuses on the active toolbar when the combination ALT+F10 is pressed inside the editor.
	 *
	 * @instance
	 * @memberof UI
	 * @protected
	 * @method _onEditorKey
	 */
	_onEditorKey(event) {
		const nativeEvent = event.data.domEvent.$;

		if (nativeEvent.altKey && nativeEvent.keyCode === 121) {
			this.focus();
		}
	}

	/**
	 * Checks if the target with which the user interacted is part of editor's UI or it is
	 * the editable area. If none of these, sets the state of editor's UI to be hidden.
	 *
	 * @instance
	 * @memberof UI
	 * @protected
	 * @method _setUIHidden
	 * @param {DOMElement} target The DOM element with which user interacted lastly.
	 */
	_setUIHidden(target) {
		const domNode = ReactDOM.findDOMNode(this);

		if (domNode) {
			const editable = this.context.editor.get('nativeEditor').editable();
			const parentNode = target.parentNode;
			const targetNode = new CKEDITOR.dom.node(target);

			if (!editable) {
				this.setState({
					hidden: true,
				});
			} else {
				let res =
					editable.$ === target ||
					editable.contains(targetNode) ||
					new CKEDITOR.dom.element(domNode).contains(targetNode);

				if (parentNode) {
					res = res || parentNode.id === 'ckimgrsz';
				}

				if (!res) {
					this.setState({
						hidden: true,
					});
				}
			}
		}
	}
}

/**
 * Fired when component updates and when it is rendered in the DOM.
 * The payload consists from a `message` property containing the ARIA message.
 *
 * @event ariaUpdate
 */

/**
 * Fired when component updates. The payload consists from an object with the following
 * properties:
 * - prevProps - The previous properties of the component
 * - prevState - The previous state of the component
 * - props - The current properties of the component
 * - state - The current state of the component
 *
 * @event ariaUpdate
 */

export default WidgetExclusive(WidgetFocusManager(UI));
