/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import '../core';

import '../plugins';

import '../components/uibridge';

import React from 'react';
import ReactDOM from 'react-dom';

import {removeImageCommand} from '../commands';
import UI from '../components/main.jsx';
import Base from '../oop/base';
import Lang from '../oop/lang';
import extend from '../oop/oop';
import Selections from '../selections/selections';
import EditorContext from './editor-context';

const EMBED_VIDEO_WIDTH = 560;
const EMBED_VIDEO_HEIGHT = 315;

/**
 * AlloyEditor main class. Creates instance of the editor and provides the user configuration
 * to the UI.
 *
 * @class Core
 * @constructor
 * @param {Object} config The configuration to be used.
 */
function Core(config) {
	Core.superclass.constructor.call(this, config);
}

extend(
	Core,
	Base,
	{
		/**
		 * Initializer lifecycle implementation for the AlloyEditor class. Creates a CKEditor
		 * instance, passing it the provided configuration attributes.
		 *
		 * @memberof Core
		 * @instance
		 * @protected
		 * @method initializer
		 * @param {Object} config Configuration object literal for the editor.
		 */
		initializer(config) {
			const node = this.get('srcNode');

			if (this.get('enableContentEditable')) {
				node.setAttribute('contenteditable', 'true');
			}

			const editor = CKEDITOR.inline(node);

			editor.config.allowedContent = this.get('allowedContent');

			editor.config.toolbars = this.get('toolbars');

			editor.config.removePlugins = this.get('removePlugins');

			editor.config.extraPlugins = this.get('extraPlugins');

			editor.config.embedProviders = this.get('embedProviders');

			editor.config.placeholderClass = this.get('placeholderClass');

			editor.config.pasteFromWordRemoveStyles = false;
			editor.config.pasteFromWordRemoveFontStyles = false;

			editor.config.selectionKeystrokes = this.get('selectionKeystrokes');

			editor.config.spritemap = this.get('spritemap');

			Lang.mix(editor.config, config);

			if (CKEDITOR.env.ie && !CKEDITOR.env.edge) {
				const plugin = 'ae_dragresize_ie11';

				editor.config.extraPlugins = editor.config.extraPlugins.replace(
					'ae_dragresize',
					plugin
				);
				editor.config.removePlugins = editor.config.removePlugins.replace(
					'ae_dragresize',
					plugin
				);
			}

			editor.once('contentDom', () => {
				this._addReadOnlyLinkClickListener(editor);

				const editable = editor.editable();

				const extraCommands = this.get('extraCommands');

				const extraCommandKeys = Object.keys(extraCommands);
				for (let i = 0; i < extraCommandKeys.length; i++) {
					const commandName = extraCommandKeys[i];

					if (editor.commands[commandName]) {
						continue;
					}

					editor.addCommand(commandName, extraCommands[commandName]);
				}

				editable.addClass('ae-editable');
			});

			this._editor = editor;

			AlloyEditor.loadLanguageResources(this._renderUI.bind(this));
		},

		/**
		 * Destructor lifecycle implementation for the AlloyEdtor class. Destroys the CKEditor
		 * instance and destroys all created toolbars.
		 *
		 * @memberof Core
		 * @instance
		 * @protected
		 * @method destructor
		 */
		destructor() {
			this._destroyed = true;

			if (this._editorUIElement) {
				ReactDOM.unmountComponentAtNode(this._editorUIElement);
				this._editorUIElement.parentNode.removeChild(
					this._editorUIElement
				);
			}

			const nativeEditor = this.get('nativeEditor');

			if (nativeEditor) {
				const editable = nativeEditor.editable();

				if (editable) {
					editable.removeClass('ae-editable');

					if (this.get('enableContentEditable')) {
						this.get('srcNode').setAttribute(
							'contenteditable',
							'false'
						);
					}
				}

				this._clearSelections();

				nativeEditor.destroy();
			}
		},

		/**
		 * Clear selections from window object
		 *
		 * @memberof Core
		 * @instance
		 * @protected
		 * @method _clearSelections
		 */
		_clearSelections() {
			const nativeEditor = this.get('nativeEditor');
			const isMSSelection = typeof window.getSelection != 'function';

			if (isMSSelection) {
				nativeEditor.document.$.selection.empty();
			} else {
				nativeEditor.document
					.getWindow()
					.$.getSelection()
					.removeAllRanges();
			}
		},

		/**
		 * Method to set default link behavior
		 *
		 * @memberof Core
		 * @instance
		 * @protected
		 * @method _addReadOnlyLinkClickListener
		 * @param {Object} editor
		 */
		_addReadOnlyLinkClickListener(editor) {
			editor.editable().on('click', this._defaultReadOnlyClickFn, this, {
				editor,
			});
		},

		/**
		 * Called on `click` event when the editor is in read only mode. Navigates to link's URL or opens
		 * the link in a new window.
		 *
		 * @memberof Core
		 * @instance
		 * @event readOnlyClick
		 * @protected
		 * @method _defaultReadOnlyClickFn
		 * @param {Object} event The fired `click` event payload
		 */
		_defaultReadOnlyClickFn(event) {
			const mouseEvent = event.data.$;
			const hasCtrlKey = mouseEvent.ctrlKey || mouseEvent.metaKey;
			const shouldOpen = this._editor.config.readOnly || hasCtrlKey;

			mouseEvent.preventDefault();

			if (!shouldOpen) {
				return;
			}

			if (
				event.listenerData.editor
					.editable()
					.editor.fire('readOnlyClick', event.data) !== false
			) {
				const ckElement = new CKEDITOR.dom.elementPath(
					event.data.getTarget(),
					this
				);
				const link = ckElement.lastElement;

				if (link) {
					const href = link.$.attributes.href
						? link.$.attributes.href.value
						: null;
					const target = hasCtrlKey
						? '_blank'
						: link.$.attributes.target
						? link.$.attributes.target.value
						: null;
					this._redirectLink(href, target);
				}
			}
		},

		/**
		 * Retrieves the native CKEditor instance. Having this, the developer may use the API of CKEditor OOTB.
		 *
		 * @memberof Core
		 * @instance
		 * @protected
		 * @method _getNativeEditor
		 * @return {Object} The current instance of CKEditor.
		 */
		_getNativeEditor() {
			return this._editor;
		},

		/**
		 * Redirects the browser to a given link
		 *
		 * @memberof Core
		 * @instance
		 * @protected
		 * @method _redirectLink
		 * @param {string} href The href to take the browser to
		 * @param {string=} target Specifies where to display the link
		 */
		_redirectLink(href, target) {
			if (target && href) {
				window.open(href, target);
			} else if (href) {
				window.location.href = href;
			}
		},

		/**
		 * Renders the specified from the user toolbars.
		 *
		 * @memberof Core
		 * @instance
		 * @protected
		 * @method _renderUI
		 */
		_renderUI() {
			if (!this._destroyed) {
				const editorUIElement = document.createElement('div');
				editorUIElement.className = 'ae-ui';

				const uiNode = this.get('uiNode') || document.body;

				uiNode.appendChild(editorUIElement);

				const callbackRef = element => {
					if (!this._mainUI && element) {
						this._mainUI = element;
						this.get('nativeEditor').fire('uiReady');
					}
				};

				ReactDOM.render(
					<EditorContext.Provider value={{editor: this}}>
						<UI
							eventsDelay={this.get('eventsDelay')}
							ref={callbackRef}
							toolbars={this.get('toolbars')}
						/>
					</EditorContext.Provider>,
					editorUIElement
				);

				this._editorUIElement = editorUIElement;
			}
		},

		/**
		 * The function returns an HTML element from the passed value. If the passed value is a string, it should be
		 * the Id of the element which have to be retrieved from the DOM.
		 * If an HTML Element is passed, the element itself will be returned.
		 *
		 * @memberof Core
		 * @instance
		 * @method _toElement
		 * @protected
		 * @param {!(String|HTMLElement)} value String, which have to correspond to an HTML element from the DOM,
		 * or the HTML element itself. If Id is passed, the HTML element will be retrieved from the DOM.
		 * @return {HTMLElement} An HTML element.
		 */
		_toElement(value) {
			if (Lang.isString(value)) {
				value = document.getElementById(value);
			}

			return value;
		},

		/**
		 * Validates the allowed content attribute. Look
		 * [here](http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-allowedContent) for more information about the
		 * supported values.
		 *
		 * @memberof Core
		 * @instance
		 * @protected
		 * @method _validateAllowedContent
		 * @param {Any} value The value to be checked
		 * @return {Boolean} True if the current value is valid configuration, false otherwise
		 */
		_validateAllowedContent(value) {
			return (
				Lang.isString(value) ||
				Lang.isObject(value) ||
				Lang.isBoolean(value)
			);
		},

		/**
		 * Validates the value of toolbars attribute
		 *
		 * @memberof Core
		 * @instance
		 * @protected
		 * @method _validateToolbars
		 * @param {Any} value The value to be checked
		 * @return {Boolean} True if the current value is valid toolbars configuration, false otherwise
		 */
		_validateToolbars(value) {
			return Lang.isObject(value) || Lang.isNull(value);
		},
	},
	{
		ATTRS: {
			/**
			 * Configures the allowed content for the current instance of AlloyEditor.
			 * Look on the [official CKEditor API](http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-allowedContent)
			 * for more information about the valid values.
			 *
			 * @memberof Core
			 * @instance
			 * @property allowedContent
			 * @default true
			 * @writeOnce
			 * @type {Boolean, String, Object}
			 */
			allowedContent: {
				validator: '_validateAllowedContent',
				value: true,
				writeOnce: true,
			},

			/**
			 * Callback to be invoked when clicking on the
			 * <code>src/components/buttons/button-link-edit-browse.jsx</code>
			 * component.
			 *
			 * @memberof Core
			 * @instance
			 * @propety documentBrowseLinkCallback
			 * @default undefined
			 * @type {Function|undefined}
			 */
			documentBrowseLinkCallback: {
				validator: Lang.isFunction,
				value: undefined,
			},

			/**
			 * Configuration for the
			 * <code>src/components/buttons/button-link-edit-browse.jsx</code>
			 * component.
			 *
			 * @memberof Core
			 * @instance
			 * @propety documentBrowseLinkUrl
			 * @default undefined
			 * @type {String|undefined}
			 */
			documentBrowseLinkUrl: {
				validator: Lang.isString,
				value: undefined,
			},

			/**
			 * List of embed providers for videos
			 *
			 * @memberof Core
			 * @instance
			 * @property embedProviders
			 * @default []
			 * @type Array}
			 */
			embedProviders: {
				validator: Lang.isArray,
				value: [
					{
						id: 'facebook',
						tpl: `<iframe allowFullScreen="true" allowTransparency="true"
												 frameborder="0" height="${EMBED_VIDEO_HEIGHT}"
												 src="https://www.facebook.com/plugins/video.php?href={embedId}'
												 &show_text=0&width=${EMBED_VIDEO_WIDTH}&height=${EMBED_VIDEO_HEIGHT}" scrolling="no"
												 style="border:none;overflow:hidden" width="${EMBED_VIDEO_WIDTH}}"></iframe>`,
						type: 'video',
						urlSchemes: [
							'(https?:\\/\\/(?:www\\.)?facebook.com\\/\\S*\\/videos\\/\\S*)',
						],
					},
					{
						id: 'twitch',
						tpl: `<iframe allowfullscreen="true" frameborder="0"
												 height="${EMBED_VIDEO_HEIGHT}"
												 src="https://player.twitch.tv/?autoplay=false&video={embedId}"
												 scrolling="no" width="${EMBED_VIDEO_WIDTH}"></iframe>`,
						type: 'video',
						urlSchemes: [
							'https?:\\/\\/(?:www\\.)?twitch.tv\\/videos\\/(\\S*)$',
						],
					},
					{
						id: 'vimeo',
						tpl: `<iframe allowfullscreen frameborder="0" height="${EMBED_VIDEO_HEIGHT}"
												 mozallowfullscreen src="https://player.vimeo.com/video/{embedId}"
												 webkitallowfullscreen width="${EMBED_VIDEO_WIDTH}"></iframe>`,
						type: 'video',
						urlSchemes: [
							'https?:\\/\\/(?:www\\.)?vimeo\\.com\\/album\\/.*\\/video\\/(\\S*)',
							'https?:\\/\\/(?:www\\.)?vimeo\\.com\\/channels\\/.*\\/(\\S*)',
							'https?:\\/\\/(?:www\\.)?vimeo\\.com\\/groups\\/.*\\/videos\\/(\\S*)',
							'https?:\\/\\/(?:www\\.)?vimeo\\.com\\/(\\S*)$',
						],
					},
					{
						id: 'youtube',
						tpl: `<iframe allow="autoplay; encrypted-media" allowfullscreen
												 height="${EMBED_VIDEO_HEIGHT}" frameborder="0"
												 src="https://www.youtube.com/embed/{embedId}?rel=0"
												 width="${EMBED_VIDEO_WIDTH}"></iframe>`,
						type: 'video',
						urlSchemes: [
							'https?:\\/\\/(?:www\\.)?youtube.com\\/watch\\?v=(\\S*)$',
						],
					},
				],
			},

			/**
			 * Specifies whether AlloyEditor set the contenteditable attribute
			 * to "true" on its srcNode.
			 *
			 * @memberof Core
			 * @instance
			 * @property enableContentEditable
			 * @type Boolean
			 * @default true
			 * @writeOnce
			 */
			enableContentEditable: {
				validator: Lang.isBoolean,
				value: true,
				writeOnce: true,
			},

			/**
			 * The delay (timeout), in ms, after which events such like key or mouse events will be processed.
			 *
			 * @memberof Core
			 * @instance
			 * @property eventsDelay
			 * @type {Number}
			 */
			eventsDelay: {
				validator: Lang.isNumber,
				value: 100,
			},

			/**
			 * The list of extra commands to be added to the editor.
			 *
			 * @memberof Core
			 * @instance
			 * @property extraCommands
			 * @type {Object}
			 */
			extraCommands: {
				validator: Lang.isObject,
				value: {
					removeImage: removeImageCommand,
				},
				writeOnce: true,
			},

			/**
			 * Specifies the extra plugins which have to be loaded to the current CKEditor instance in order to
			 * make AlloyEditor to work properly.
			 *
			 * @memberof Core
			 * @instance
			 * @property extraPlugins
			 * @default 'uicore,selectionregion,dragresize,addimages,placeholder,tabletools,tableresize,autolink'
			 * @writeOnce
			 * @type {String}
			 */
			extraPlugins: {
				validator: Lang.isString,
				value:
					'ae_uicore,ae_selectionregion,ae_selectionkeystrokes,ae_imagealignment,ae_addimages,ae_placeholder,' +
					'ae_tabletools,ae_tableresize,ae_autolink,ae_embed,ae_autolist,ae_dragresize,' +
					'ae_uibridge,ae_richcombobridge,ae_panelmenubuttonbridge,ae_menubridge,ae_menubuttonbridge,ae_buttonbridge,font,colorbutton',
				writeOnce: true,
			},

			/**
			 * Specifies the "mode" for alloy editor
			 * @memberof Core
			 * @instance
			 * @property mode
			 * @default 'simple'
			 * @writeOnce
			 * @type {String}
			 */
			mode: {
				validator: Lang.isString,
				value: 'simple',
			},

			/**
			 * Retrieves the native CKEditor instance. Having this, the developer may use the full API of CKEditor.
			 *
			 * @memberof Core
			 * @instance
			 * @property nativeEditor
			 * @readOnly
			 * @type {Object}
			 */
			nativeEditor: {
				getter: '_getNativeEditor',
				readOnly: true,
			},

			/**
			 * Specifies the class, which should be added by Placeholder plugin
			 * {{#crossLink "CKEDITOR.plugins.ae_placeholder}}{{/crossLink}}
			 * when editor is not focused.
			 *
			 * @memberof Core
			 * @instance
			 * @property placeholderClass
			 * @default 'ae-placeholder'
			 * @writeOnce
			 * @type {String}
			 */
			placeholderClass: {
				validator: Lang.isString,
				value: 'ae-placeholder',
				writeOnce: true,
			},

			/**
			 * Specifies the plugins, which come by default with CKEditor, but which are not needed by AlloyEditor.
			 * These plugins add the default UI for CKeditor, which is no more needed. Please note that AlloyEdtor
			 * comes with its own highly optimized copy of CKEditor (just customized via their official download page).
			 * This version does not come with the unneeded plugins, so the value of this property won't be needed.
			 * However, if you decide to go with the OOTB version of CKEditor, you will have to remove some of the
			 * plugins if you decide to use AlloyEditor. Keep in mind that removing these plugins doesn't remove them
			 * entirely from CKEditor. It just removes them from its current instance, in which you will use different
			 * UI - those of AlloyEditor. You will be fully able to use both OOTB CKEditor and AlloyEditor on the same
			 * page!
			 *
			 * @memberof Core
			 * @instance
			 * @property removePlugins
			 * @default 'contextmenu,toolbar,elementspath,resize,liststyle,link'
			 * @writeOnce
			 * @type {String}
			 */
			removePlugins: {
				validator: Lang.isString,
				value: 'contextmenu,toolbar,elementspath,resize,liststyle,link',
				writeOnce: true,
			},

			/**
			 * Array of manual selection triggers. They can be configured to manually show a specific selection toolbar
			 * by forcing the selection type. A selectionKeystroke item consists of a keys property with a [CKEditor keystroke
			 * definition](http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-keystrokes) and a selection property with
			 * the selection name to trigger.
			 *
			 * @memberof Core
			 * @instance
			 * @property selectionKeystrokes
			 * @type {Array}
			 */
			selectionKeystrokes: {
				validator: Lang.isArray,
				value: [
					{
						keys: CKEDITOR.CTRL + 76 /* L*/,
						selection: 'link',
					},
					{
						keys: CKEDITOR.CTRL + CKEDITOR.SHIFT + 76 /* L*/,
						selection: 'embed',
					},
				],
			},

			/**
			 * The path to the spritemap SVG used for icons
			 *
			 * @memberof Core
			 * @instance
			 * @property spritemap
			 * @type String
			 * @writeOnce
			 */
			spritemap: {
				validator: Lang.isString,
				value:
					(window.ALLOYEDITOR_BASEPATH || 'alloy-editor/') +
					'assets/icons/icons.svg',
				writeOnce: true,
			},

			/**
			 * The Node ID or HTMl node, which AlloyEditor should use as an editable area.
			 *
			 * @memberof Core
			 * @instance
			 * @property srcNode
			 * @type String | Node
			 * @writeOnce
			 */
			srcNode: {
				setter: '_toElement',
				writeOnce: true,
			},

			/**
			 * The toolbars configuration for this editor instance
			 *
			 * @memberof Core
			 * @instance
			 * @property {Object} toolbars
			 */
			toolbars: {
				validator: '_validateToolbars',
				value: {
					add: {
						buttons: [
							'imageFromFile',
							'embed',
							'camera',
							'hline',
							'table',
						],
						tabIndex: 2,
					},
					styles: {
						selections: Selections,
						tabIndex: 1,
					},
				},
			},

			/**
			 * The Node ID or HTMl node, where AlloyEditor's UI should be rendered.
			 *
			 * @memberof Core
			 * @instance
			 * @property uiNode
			 * @type String | Node
			 * @writeOnce
			 */
			uiNode: {
				setter: '_toElement',
				writeOnce: true,
			},
		},
	}
);

CKEDITOR.event.implementOn(Core);

export default Core;
