/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

if (!CKEDITOR.plugins.get('ae_uicore')) {
	/**
	 * UICore class which will handle user interactions with the editor. These interactions
	 * might be triggered via mouse, keyboard or touch devices. The class fill fire an event via
	 * CKEditor's event system - "editorInteraction". The UI may listen to this event and
	 * execute some actions - for example to show/hide toolbars.
	 *
	 * By default if user presses the Esc key, 'editorInteraction' event won't be fired. However, this behaviour can be changed
	 * by setting {{#crossLink "CKEDITOR.plugins.ae_uicore/allowEsc:attribute"}}{{/crossLink}} config property in editor's configuration to true.
	 *
	 * @class ae_uicore
	 */

	/**
	 * Fired when user interacts somehow with the browser. This may be clicking with the mouse, pressing keyboard button,
	 * or touching screen. This even will be not fired after each interaction. It will be debounced. By default the timeout
	 * is 50ms. This value can be overwritten via {{#crossLink "CKEDITOR.plugins.ae_uicore/timeout:attribute"}}{{/crossLink}}
	 * property of editor's configuration, like: editor.config.uicore.timeout = 100
	 *
	 * @memberof ae_uicore
	 * @event ae_uicore#editorInteraction
	 * @param {Object} data An object which contains the following properties:
	 * - nativeEvent - The event as received from CKEditor.
	 * - selectionData - The data, returned from {{#crossLink "CKEDITOR.plugins.ae_selectionregion/getSelectionData:method"}}{{/crossLink}}
	 */

	/**
	 * Fired by UI elements like Toolbars or Buttons when their state changes. The listener updates the live region with the provided data.
	 *
	 * @memberof ae_uicore
	 * @event ae_uicore#ariaUpdate
	 * @param {Object} data An object which contains the following properties:
	 * - message - The provided message from the UI element.
	 */

	/**
	 * If set to true, the editor will still fire {{#crossLink "CKEDITOR.plugins.ae_uicore/editorInteraction:event"}}{{/crossLink}} event,
	 * if user presses Esc key.
	 *
	 * @memberof ae_uicore
	 * @attribute allowEsc
	 * @default false
	 * @type Boolean
	 */

	/**
	 * Specifies the default timeout after which the {{#crossLink "CKEDITOR.plugins.ae_uicore/editorInteraction:event"}}{{/crossLink}} event
	 * will be fired.
	 *
	 * @memberof ae_uicore
	 * @attribute timeout
	 * @default 50 (ms)
	 * @type Number
	 */

	CKEDITOR.plugins.add('ae_uicore', {
		/**
		 * Initializer lifecycle implementation for the UICore plugin.
		 *
		 * @memberof ae_uicore
		 * @method init
		 * @param {Object} editor The current CKEditor instance.
		 * @protected
		 */
		init(editor) {
			let ariaState = [];

			const ariaElement = this._createAriaElement(editor.id);

			const uiTasksTimeout = editor.config.uicore
				? editor.config.uicore.timeout
				: 50;

			const handleUI = CKEDITOR.tools.debounce(event => {
				ariaState = [];

				if (
					event.name !== 'keyup' ||
					event.data.$.keyCode !== 27 ||
					editor.config.allowEsc
				) {
					const selectionData = editor.getSelectionData();

					if (selectionData) {
						editor.fire('editorInteraction', {
							nativeEvent: event.data.$,
							selectionData,
						});
					}
				}
			}, uiTasksTimeout);

			const handleAria = CKEDITOR.tools.debounce(_event => {
				ariaElement.innerHTML = ariaState.join('. ');
			}, uiTasksTimeout);

			const handleMouseLeave = CKEDITOR.tools.debounce(event => {
				const aeUINodes = document.querySelectorAll('.ae-ui');

				let found;

				for (let i = 0; i < aeUINodes.length; i++) {
					if (aeUINodes[i].contains(event.data.$.relatedTarget)) {
						found = true;
						break;
					}
				}

				if (!found) {
					handleUI(event);
				}
			}, uiTasksTimeout);

			editor.on('ariaUpdate', event => {
				// handleAria is debounced function, so if it is being called multiple times, it will
				// be canceled until some time passes.
				// For that reason here we explicitly append the current message to the list of messages
				// and call handleAria. Since it is debounced, when some timeout passes,
				// all the messages will be applied to the live region and not only the last one.

				ariaState.push(event.data.message);

				handleAria();
			});

			editor.once('contentDom', () => {
				const editable = editor.editable();

				const focusHandler = editable.attachListener(
					editable,
					'focus',
					event => {
						focusHandler.removeListener();

						editable.attachListener(editable, 'keyup', handleUI);
						editable.attachListener(editable, 'mouseup', handleUI);
						editable.attachListener(
							editable,
							'mouseleave',
							handleMouseLeave
						);

						handleUI(event);
					}
				);
			});

			editor.on('destroy', _event => {
				ariaElement.parentNode.removeChild(ariaElement);

				handleUI.detach();
			});
		},

		/**
		 * Creates and applies an HTML element to the body of the document which will contain ARIA messages.
		 *
		 * @memberof ae_uicore
		 * @method _createAriaElement
		 * @param {String} id The provided id of the element. It will be used as prefix for the final element Id.
		 * @protected
		 * @return {HTMLElement} The created and applied to DOM element.
		 */
		_createAriaElement(id) {
			const statusElement = document.createElement('div');

			statusElement.className = 'ae-sr-only';

			statusElement.setAttribute('aria-live', 'polite');
			statusElement.setAttribute('role', 'status');
			statusElement.setAttribute('id', id + 'LiveRegion');

			document.body.appendChild(statusElement);

			return statusElement;
		},
	});
}
