/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

const isIE = CKEDITOR.env.ie;

if (!CKEDITOR.plugins.get('ae_addimages')) {
	/**
	 * CKEditor plugin which allows Drag&Drop of images directly into the editable area. The image will be encoded
	 * as Data URI. An event `beforeImageAdd` will be fired with the list of dropped images. If any of the listeners
	 * returns `false` or cancels the event, the images won't be added to the content. Otherwise,
	 * an event `imageAdd` will be fired with the inserted element into the editable area.
	 *
	 * @class CKEDITOR.plugins.ae_addimages
	 */

	/**
	 * Fired before adding images to the editor.
	 *
	 * @event CKEDITOR.plugins.ae_addimages#beforeImageAdd
	 * @instance
	 * @memberof CKEDITOR.plugins.ae_addimages
	 * @param {Array} imageFiles Array of image files
	 */

	/**
	 * Fired when an image is being added to the editor successfully.
	 *
	 * @event CKEDITOR.plugins.ae_addimages#imageAdd
	 * @instance
	 * @memberof CKEDITOR.plugins.ae_addimages
	 * @param {CKEDITOR.dom.element} el The created image with src as Data URI
	 * @param {File} file The image file
	 */

	CKEDITOR.plugins.add('ae_addimages', {
		/**
		 * Initialization of the plugin, part of CKEditor plugin lifecycle.
		 * The function registers a 'dragenter', 'dragover', 'drop' and `paste` events on the editing area.
		 *
		 * @instance
		 * @memberof CKEDITOR.plugins.ae_addimages
		 * @method init
		 * @param {Object} editor The current editor instance
		 */
		init(editor) {
			editor.once('contentDom', () => {
				const editable = editor.editable();

				editable.attachListener(
					editable,
					'dragenter',
					this._onDragEnter,
					this,
					{
						editor,
					}
				);

				editable.attachListener(
					editable,
					'dragover',
					this._onDragOver,
					this,
					{
						editor,
					}
				);

				editable.attachListener(
					editable,
					'drop',
					this._onDragDrop,
					this,
					{
						editor,
					}
				);

				editable.attachListener(
					editable,
					'paste',
					this._onPaste,
					this,
					{
						editor,
					}
				);
			});
		},

		/**
		 * Accepts an array of dropped files to the editor. Then, it filters the images and sends them for further
		 * processing to {{#crossLink "CKEDITOR.plugins.ae_addimages/_processFile:method"}}{{/crossLink}}
		 *
		 * @fires CKEDITOR.plugins.ae_addimages#beforeImageAdd
		 * @instance
		 * @memberof CKEDITOR.plugins.ae_addimages
		 * @method _handleFiles
		 * @param {Array} files Array of dropped files. Only the images from this list will be processed.
		 * @param {Object} editor The current editor instance
		 * @protected
		 */
		_handleFiles(files, editor) {
			let file;
			let i;

			const imageFiles = [];

			for (i = 0; i < files.length; i++) {
				file = files[i];

				if (file.type.indexOf('image') === 0) {
					imageFiles.push(file);
				}
			}

			const result = editor.fire('beforeImageAdd', {
				imageFiles,
			});

			if (result) {
				for (i = 0; i < imageFiles.length; i++) {
					file = imageFiles[i];

					this._processFile(file, editor);
				}
			}

			return false;
		},

		/**
		 * Handles drag drop event. The function will create a selection from the current
		 * point and will send a list of files to be processed to
		 * {{#crossLink "CKEDITOR.plugins.ae_addimages/_handleFiles:method"}}{{/crossLink}} method.
		 *
		 * @instance
		 * @memberof CKEDITOR.plugins.ae_addimages
		 * @method _onDragDrop
		 * @param {CKEDITOR.dom.event} event dragdrop event, as received natively from CKEditor
		 * @protected
		 */
		_onDragDrop(event) {
			const nativeEvent = event.data.$;

			const transferFiles = nativeEvent.dataTransfer.files;

			if (transferFiles.length > 0) {
				new CKEDITOR.dom.event(nativeEvent).preventDefault();

				const editor = event.listenerData.editor;

				event.listenerData.editor.createSelectionFromPoint(
					nativeEvent.clientX,
					nativeEvent.clientY
				);

				this._handleFiles(transferFiles, editor);
			}
		},

		/**
		 * Handles drag enter event. In case of IE, this function will prevent the event.
		 *
		 * @instance
		 * @memberof CKEDITOR.plugins.ae_addimages
		 * @method _onDragEnter
		 * @param {DOM event} event dragenter event, as received natively from CKEditor
		 * @protected
		 */
		_onDragEnter(event) {
			if (isIE) {
				this._preventEvent(event);
			}
		},

		/**
		 * Handles drag over event. In case of IE, this function will prevent the event.
		 *
		 * @instance
		 * @memberof CKEDITOR.plugins.ae_addimages
		 * @method _onDragOver
		 * @param {DOM event} event dragover event, as received natively from CKEditor
		 * @protected
		 */
		_onDragOver(event) {
			if (isIE) {
				this._preventEvent(event);
			}
		},

		/**
		 * Checks if the pasted data is image and passes it to
		 * {{#crossLink "CKEDITOR.plugins.ae_addimages/_processFile:method"}}{{/crossLink}} for processing.
		 *
		 * @instance
		 * @memberof CKEDITOR.plugins.ae_addimages
		 * @method _onPaste
		 * @param {CKEDITOR.dom.event} event A `paste` event, as received natively from CKEditor
		 * @protected
		 */
		_onPaste(event) {
			if (
				event.data &&
				event.data.$ &&
				event.data.$.clipboardData &&
				event.data.$.clipboardData.items &&
				event.data.$.clipboardData.items.length > 0
			) {
				const pastedData = event.data.$.clipboardData.items[0];

				if (pastedData.type.indexOf('image') === 0) {
					const imageFile = pastedData.getAsFile();

					this._processFile(imageFile, event.listenerData.editor);
				}
			}
		},

		/**
		 * Prevents a native event.
		 *
		 * @instance
		 * @memberof CKEDITOR.plugins.ae_addimages
		 * @method _preventEvent
		 * @param {DOM event} event The event to be prevented.
		 * @protected
		 */
		_preventEvent(event) {
			event = new CKEDITOR.dom.event(event.data.$);

			event.preventDefault();
			event.stopPropagation();
		},

		/**
		 * Processes an image file. The function creates an img element and sets as source
		 * a Data URI, then fires an 'imageAdd' event via CKEditor's event system.
		 *
		 * @fires CKEDITOR.plugins.ae_addimages#imageAdd
		 * @instance
		 * @memberof CKEDITOR.plugins.ae_addimages
		 * @method _preventEvent
		 * @param {DOM event} event The event to be prevented.
		 * @protected
		 */
		_processFile(file, editor) {
			const reader = new FileReader();

			reader.addEventListener('loadend', () => {
				const bin = reader.result;

				const el = CKEDITOR.dom.element.createFromHtml(
					'<img src="' + bin + '">'
				);

				editor.insertElement(el);

				const imageData = {
					el,
					file,
				};

				editor.fire('imageAdd', imageData);
			});

			reader.readAsDataURL(file);
		},
	});
}
