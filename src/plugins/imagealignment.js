/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import SelectionTest from '../selections/selection-test';

if (!CKEDITOR.plugins.get('ae_imagealignment')) {
	/**
	 * Enum for supported image alignments
	 * @type {Object}
	 */
	const IMAGE_ALIGNMENT = {
		CENTER: 'center',
		LEFT: 'left',
		RIGHT: 'right',
	};

	/**
	 * Enum values for supported image alignments
	 * @type {Array}
	 */
	const ALIGN_VALUES = [
		IMAGE_ALIGNMENT.LEFT,
		IMAGE_ALIGNMENT.RIGHT,
		IMAGE_ALIGNMENT.CENTER,
	];

	/**
	 * Necessary styles for the left|center|right alignment
	 * @type {Array.<Object>}
	 */
	const IMAGE_STYLE_ALIGNMENT = {
		[IMAGE_ALIGNMENT.LEFT]: [
			{
				name: 'display',
				value: 'inline-block',
			},
			{
				name: 'float',
				value: 'left',
			},
			{
				name: 'margin-right',
				value: '1.2rem',
			},
		],
		[IMAGE_ALIGNMENT.CENTER]: [
			{
				name: 'display',
				value: 'block',
			},
			{
				name: 'margin-left',
				value: 'auto',
			},
			{
				name: 'margin-right',
				value: 'auto',
			},
		],
		[IMAGE_ALIGNMENT.RIGHT]: [
			{
				name: 'display',
				value: 'inline-block',
			},
			{
				name: 'float',
				value: 'right',
			},
			{
				name: 'margin-left',
				value: '1.2rem',
			},
		],
	};

	/**
	 * Retrieves the alignment value of an image.
	 *
	 * @param {CKEDITOR.dom.element} image The image element
	 * @return {String} The alignment value
	 */
	const getImageAlignment = function(image) {
		let imageAlignment = image.getStyle('float');

		if (
			!imageAlignment ||
			imageAlignment === 'inherit' ||
			imageAlignment === 'none'
		) {
			imageAlignment = image.getAttribute('align');
		}

		if (!imageAlignment) {
			let centeredImage = IMAGE_STYLE_ALIGNMENT[
				IMAGE_ALIGNMENT.CENTER
			].every(style => {
				let styleCheck = image.getStyle(style.name) === style.value;

				if (!styleCheck && style.vendorPrefixes) {
					styleCheck = style.vendorPrefixes.some(vendorPrefix => {
						return (
							image.getStyle(vendorPrefix + style.name) ===
							style.value
						);
					});
				}

				return styleCheck;
			});

			if (!imageAlignment) {
				const imageContainer = image.$.parentNode;

				if (imageContainer.style.textAlign == IMAGE_ALIGNMENT.CENTER) {
					IMAGE_STYLE_ALIGNMENT[IMAGE_ALIGNMENT.CENTER].forEach(
						style => {
							image.setStyle(style.name, style.value);

							if (style.vendorPrefixes) {
								style.vendorPrefixes.forEach(vendorPrefix => {
									image.setStyle(
										vendorPrefix + style.name,
										style.value
									);
								});
							}
						}
					);
					centeredImage = true;
					imageContainer.style.textAlign = '';
				}
			}

			imageAlignment = centeredImage ? IMAGE_ALIGNMENT.CENTER : null;
		}

		if (!CKEDITOR.env.edge && CKEDITOR.env.ie) {
			const p = image.findOne('p');
			if (p) {
				imageAlignment = p.getStyle('text-align');
			}
		}

		return imageAlignment;
	};

	/**
	 * Removes the alignment value of an image
	 *
	 * @param {CKEDITOR.dom.element} image The image element
	 * @param {String} imageAlignment The image alignment value to be removed
	 */
	const removeImageAlignment = function(image, imageAlignment) {
		if (
			imageAlignment === IMAGE_ALIGNMENT.LEFT ||
			imageAlignment === IMAGE_ALIGNMENT.RIGHT
		) {
			if (imageAlignment === getImageAlignment(image)) {
				image.removeAttribute('align');
			}
		} else if (imageAlignment === IMAGE_ALIGNMENT.CENTER) {
			const imageContainer = image.$.parentNode;

			if (imageContainer.style.textAlign == IMAGE_ALIGNMENT.CENTER) {
				imageContainer.style.textAlign = '';
			}
		}

		const styles = IMAGE_STYLE_ALIGNMENT[imageAlignment];

		if (styles) {
			styles.forEach(style => {
				image.removeStyle(style.name);

				if (style.vendorPrefixes) {
					style.vendorPrefixes.forEach(vendorPrefix => {
						image.removeStyle(vendorPrefix + style.name);
					});
				}
			});
		}
	};

	/**
	 * Sets the alignment value of an image
	 *
	 * @param {CKEDITOR.dom.element} image The image element
	 * @param {String} imageAlignment The image alignment value to be set
	 */
	const setImageAlignment = function(image, imageAlignment) {
		removeImageAlignment(image, getImageAlignment(image));

		const styles = IMAGE_STYLE_ALIGNMENT[imageAlignment];

		if (styles) {
			styles.forEach(style => {
				image.setStyle(style.name, style.value);

				if (style.vendorPrefixes) {
					style.vendorPrefixes.forEach(vendorPrefix => {
						image.setStyle(vendorPrefix + style.name, style.value);
					});
				}
			});
		}
	};

	/**
	 * CKEditor plugin which modifies the justify commands to properly align images. This
	 * plugin is an excerpt of CKEditor's original image one that can be found at
	 * https://github.com/ckeditor/ckeditor-dev/blob/master/plugins/image/plugin.js
	 *
	 * @class CKEDITOR.plugins.ae_imagealignment
	 */
	CKEDITOR.plugins.add('ae_imagealignment', {
		/**
		 * Initialization of the plugin, part of CKEditor plugin lifecycle.
		 * The function registers a 'paste' event on the editing area.
		 *
		 * @method afterInit
		 * @param {Object} editor The current editor instance
		 */
		afterInit(editor) {
			const self = this;

			ALIGN_VALUES.forEach(value => {
				const command = editor.getCommand('justify' + value);

				if (command) {
					command.on('exec', event => {
						const selectionData = editor.getSelectionData();

						if (
							selectionData &&
							SelectionTest.image({
								data: {selectionData},
							})
						) {
							const image = selectionData.element;

							const imageAlignment = getImageAlignment(image);

							if (imageAlignment === value) {
								removeImageAlignment(image, value);
							} else {
								setImageAlignment(image, value);
							}

							event.cancel();

							self.refreshCommands(
								editor,
								new CKEDITOR.dom.elementPath(image)
							);
						}
					});

					command.on('refresh', function(event) {
						const selectionData = {
							element: event.data.path.lastElement,
						};

						if (
							SelectionTest.image({
								data: {selectionData},
							})
						) {
							const imageAlignment = getImageAlignment(
								selectionData.element
							);

							this.setState(
								imageAlignment === value
									? CKEDITOR.TRISTATE_ON
									: CKEDITOR.TRISTATE_OFF
							);

							event.cancel();
						}
					});
				}
			});
		},

		/**
		 * Forces a refresh of the modified justify commands. This is needed because the applied changes
		 * do not modify the selection, so the refresh is never triggered and the UI does not update
		 * properly until the next selectionChange event.
		 *
		 * @param {CKEDITOR.editor} editor The editor instance
		 * @param {CKEDITOR.dom.elementPath} elementPath The path of the selected image
		 */
		refreshCommands(editor, elementPath) {
			ALIGN_VALUES.forEach(value => {
				const command = editor.getCommand('justify' + value);

				if (command) {
					command.refresh(editor, elementPath);
				}
			});
		},
	});
}
