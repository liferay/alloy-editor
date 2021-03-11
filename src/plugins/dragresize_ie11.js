/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

(function() {
	if (CKEDITOR.plugins.get('ae_dragresize_ie11')) {
		return;
	}

	const template = '<img alt="" src="" />';

	const templateBlock = new CKEDITOR.template(
		'<figure class="{captionedClass}">' +
			template +
			'<figcaption>{captionPlaceholder}</figcaption>' +
			'</figure>'
	);

	const alignmentsObj = {left: 0, center: 1, right: 2};

	const regexPercent = /^\s*(\d+%)\s*$/i;

	CKEDITOR.plugins.add('ae_dragresize_ie11', {
		requires: 'widget',
		onLoad() {
			CKEDITOR.addCss(
				'.cke_image_nocaption{' +
					// This is to remove unwanted space so resize
					// wrapper is displayed property.

					'line-height:0' +
					'}' +
					'.cke_editable.cke_image_ne, .cke_editable.cke_image_ne *{cursor:ne-resize !important}' +
					'.cke_editable.cke_image_nw, .cke_editable.cke_image_nw *{cursor:nw-resize !important}' +
					'.cke_editable.cke_image_sw, .cke_editable.cke_image_sw *{cursor:sw-resize !important}' +
					'.cke_editable.cke_image_se, .cke_editable.cke_image_se *{cursor:se-resize !important}' +
					'.cke_image_resizer{' +
					'display:none;' +
					'position:absolute;' +
					'width:10px;' +
					'height:10px;' +
					'background:#000;' +
					'outline:1px solid #fff;' +
					// Prevent drag handler from being misplaced (#11207).

					'line-height:0;' +
					'cursor:se-resize;' +
					'}' +
					'.cke_image_resizer_wrapper{' +
					'position:relative;' +
					'display:inline-block;' +
					'line-height:0;' +
					'}' +
					// Top-right corner style of the resizer.

					'.cke_image_resizer.cke_image_resizer_ne{' +
					'cursor:ne-resize;' +
					'left:auto;' +
					'right:-5px;' +
					'top:-5px;' +
					'}' +
					// Top-left corner style of the resizer.

					'.cke_image_resizer.cke_image_resizer_nw{' +
					'cursor:nw-resize;' +
					'left:-5px;' +
					'right:auto;' +
					'top:-5px;' +
					'}' +
					// Bottom-right corner style of the resizer.

					'.cke_image_resizer.cke_image_resizer_se{' +
					'bottom:-5px;' +
					'cursor:se-resize;' +
					'left:auto;' +
					'right:-5px;' +
					'}' +
					// Bottom-left corner style of the resizer.

					'.cke_image_resizer.cke_image_resizer_sw{' +
					'bottom:-5px;' +
					'cursor:sw-resize;' +
					'left:-5px;' +
					'right:auto;' +
					'}' +
					'.cke_widget_wrapper:hover .cke_image_resizer,' +
					'.cke_image_resizing>.cke_image_resizer{' +
					'display:block' +
					'}' +
					// Expand widget wrapper when linked inline image.

					'.cke_widget_wrapper>a{' +
					'display:inline-block' +
					'}'
			);
		},

		init(editor) {
			// Adapts configuration from original image plugin. Should be removed
			// when we'll rename ae_dragresize_ie11 to image.

			const image = widgetDef(editor);

			// Register the widget.

			editor.widgets.add('image', image);

			// Add a listener to handle selection change events and properly detect editor
			// interactions on the widgets without messing with widget native selection

			editor.on('selectionChange', _event => {
				const selection = editor.getSelection();

				if (selection) {
					const element = selection.getSelectedElement();

					if (element) {
						const widgetElement = element.findOne('img');

						if (widgetElement) {
							const region = element.getClientRect();

							const scrollPosition = new CKEDITOR.dom.window(
								window
							).getScrollPosition();
							region.left -= scrollPosition.x;
							region.top += scrollPosition.y;

							region.direction = CKEDITOR.SELECTION_BOTTOM_TO_TOP;

							editor.fire('editorInteraction', {
								nativeEvent: {},
								selectionData: {
									element: widgetElement,
									region,
								},
							});
						}
					}
				}
			});
		},

		afterInit(editor) {
			// Integrate with align commands (justify plugin).

			const align = {left: 1, right: 1, center: 1, block: 1};

			const integrate = alignCommandIntegrator(editor);

			for (const value in align) {
				if (Object.prototype.hasOwnProperty.call(align, value)) {
					integrate(value);
				}
			}
		},
	});

	// Widget states (forms) depending on alignment and configuration.
	//
	// Non-captioned widget (inline styles)
	// 		┌──────┬───────────────────────────────┬─────────────────────────────┐
	// 		│Align │Internal form                  │Data                         │
	// 		├──────┼───────────────────────────────┼─────────────────────────────┤
	// 		│none  │<wrapper>                      │<img />                      │
	// 		│      │ <img />                       │                             │
	// 		│      │</wrapper>                     │                             │
	// 		├──────┼───────────────────────────────┼─────────────────────────────┤
	// 		│left  │<wrapper style=”float:left”>   │<img style=”float:left” />   │
	// 		│      │ <img />                       │                             │
	// 		│      │</wrapper>                     │                             │
	// 		├──────┼───────────────────────────────┼─────────────────────────────┤
	// 		│center│<wrapper>                      │<p style=”text-align:center”>│
	// 		│      │ <p style=”text-align:center”> │  <img />                    │
	// 		│      │   <img />                     │</p>                         │
	// 		│      │ </p>                          │                             │
	// 		│      │</wrapper>                     │                             │
	// 		├──────┼───────────────────────────────┼─────────────────────────────┤
	// 		│right │<wrapper style=”float:right”>  │<img style=”float:right” />  │
	// 		│      │ <img />                       │                             │
	// 		│      │</wrapper>                     │                             │
	// 		└──────┴───────────────────────────────┴─────────────────────────────┘
	//
	// Non-captioned widget (config.ae_dragresize_ie11_alignClasses defined)
	// 		┌──────┬───────────────────────────────┬─────────────────────────────┐
	// 		│Align │Internal form                  │Data                         │
	// 		├──────┼───────────────────────────────┼─────────────────────────────┤
	// 		│none  │<wrapper>                      │<img />                      │
	// 		│      │ <img />                       │                             │
	// 		│      │</wrapper>                     │                             │
	// 		├──────┼───────────────────────────────┼─────────────────────────────┤
	// 		│left  │<wrapper class=”left”>         │<img class=”left” />         │
	// 		│      │ <img />                       │                             │
	// 		│      │</wrapper>                     │                             │
	// 		├──────┼───────────────────────────────┼─────────────────────────────┤
	// 		│center│<wrapper>                      │<p class=”center”>           │
	// 		│      │ <p class=”center”>            │ <img />                     │
	// 		│      │   <img />                     │</p>                         │
	// 		│      │ </p>                          │                             │
	// 		│      │</wrapper>                     │                             │
	// 		├──────┼───────────────────────────────┼─────────────────────────────┤
	// 		│right │<wrapper class=”right”>        │<img class=”right” />        │
	// 		│      │ <img />                       │                             │
	// 		│      │</wrapper>                     │                             │
	// 		└──────┴───────────────────────────────┴─────────────────────────────┘
	//
	// Captioned widget (inline styles)
	// 		┌──────┬────────────────────────────────────────┬────────────────────────────────────────┐
	// 		│Align │Internal form                           │Data                                    │
	// 		├──────┼────────────────────────────────────────┼────────────────────────────────────────┤
	// 		│none  │<wrapper>                               │<figure />                              │
	// 		│      │ <figure />                             │                                        │
	// 		│      │</wrapper>                              │                                        │
	// 		├──────┼────────────────────────────────────────┼────────────────────────────────────────┤
	// 		│left  │<wrapper style=”float:left”>            │<figure style=”float:left” />           │
	// 		│      │ <figure />                             │                                        │
	// 		│      │</wrapper>                              │                                        │
	// 		├──────┼────────────────────────────────────────┼────────────────────────────────────────┤
	// 		│center│<wrapper style=”text-align:center”>     │<div style=”text-align:center”>         │
	// 		│      │ <figure style=”display:inline-block” />│ <figure style=”display:inline-block” />│
	// 		│      │</wrapper>                              │</p>                                    │
	// 		├──────┼────────────────────────────────────────┼────────────────────────────────────────┤
	// 		│right │<wrapper style=”float:right”>           │<figure style=”float:right” />          │
	// 		│      │ <figure />                             │                                        │
	// 		│      │</wrapper>                              │                                        │
	// 		└──────┴────────────────────────────────────────┴────────────────────────────────────────┘
	//
	// Captioned widget (config.ae_dragresize_ie11_alignClasses defined)
	// 		┌──────┬────────────────────────────────────────┬────────────────────────────────────────┐
	// 		│Align │Internal form                           │Data                                    │
	// 		├──────┼────────────────────────────────────────┼────────────────────────────────────────┤
	// 		│none  │<wrapper>                               │<figure />                              │
	// 		│      │ <figure />                             │                                        │
	// 		│      │</wrapper>                              │                                        │
	// 		├──────┼────────────────────────────────────────┼────────────────────────────────────────┤
	// 		│left  │<wrapper class=”left”>                  │<figure class=”left” />                 │
	// 		│      │ <figure />                             │                                        │
	// 		│      │</wrapper>                              │                                        │
	// 		├──────┼────────────────────────────────────────┼────────────────────────────────────────┤
	// 		│center│<wrapper class=”center”>                │<div class=”center”>                    │
	// 		│      │ <figure />                             │ <figure />                             │
	// 		│      │</wrapper>                              │</p>                                    │
	// 		├──────┼────────────────────────────────────────┼────────────────────────────────────────┤
	// 		│right │<wrapper class=”right”>                 │<figure class=”right” />                │
	// 		│      │ <figure />                             │                                        │
	// 		│      │</wrapper>                              │                                        │
	// 		└──────┴────────────────────────────────────────┴────────────────────────────────────────┘
	//
	// @param {CKEDITOR.editor}
	// @returns {Object}

	function widgetDef(editor) {
		const alignClasses = editor.config.ae_dragresize_ie11_alignClasses;

		const captionedClass = editor.config.ae_dragresize_ie11_captionedClass;

		function deflate() {
			if (this.deflated) {
				return;
			}

			// Remember whether widget was focused before destroyed.

			if (editor.widgets.focused == this.widget) {
				this.focused = true;
			}

			editor.widgets.destroy(this.widget);

			// Mark widget was destroyed.

			this.deflated = true;
		}

		function inflate() {
			const editable = editor.editable();

			const doc = editor.document;

			// Create a new widget. This widget will be either captioned
			// non-captioned, block or inline according to what is the
			// new state of the widget.

			if (this.deflated) {
				this.widget = editor.widgets.initOn(
					this.element,
					'image',
					this.widget.data
				);

				// Once widget was re-created, it may become an inline element without
				// block wrapper (i.e. when unaligned, end not captioned). Let's do some
				// sort of autoparagraphing here (#10853).

				if (
					this.widget.inline &&
					!new CKEDITOR.dom.elementPath(this.widget.wrapper, editable)
						.block
				) {
					const block = doc.createElement(
						editor.activeEnterMode == CKEDITOR.ENTER_P ? 'p' : 'div'
					);
					block.replace(this.widget.wrapper);
					this.widget.wrapper.move(block);
				}

				// The focus must be transferred from the old one (destroyed)
				// to the new one (just created).

				if (this.focused) {
					this.widget.focus();
					delete this.focused;
				}

				delete this.deflated;
			}

			// If now widget was destroyed just update wrapper's alignment.
			// According to the new state.
			else {
				setWrapperAlign(this.widget, alignClasses);
			}
		}

		return {
			allowedContent: getWidgetAllowedContent(editor),

			requiredContent: 'img[src,alt]',

			features: getWidgetFeatures(editor),

			styleableElements: 'img figure',

			// This widget converts style-driven dimensions to attributes.

			contentTransformations: [['img[width]: sizeToAttribute']],

			// This widget has an editable caption.

			editables: {
				caption: {
					selector: 'figcaption',
					allowedContent: 'br em strong sub sup u s; a[!href,target]',
				},
			},

			parts: {
				image: 'img',
				caption: 'figcaption',

				// parts#link defined in widget#init
			},

			// Template of the widget: plain image.

			template,

			data() {
				const features = this.features;

				// Image can't be captioned when figcaption is disallowed (#11004).

				if (
					this.data.hasCaption &&
					!editor.filter.checkFeature(features.caption)
				) {
					this.data.hasCaption = false;
				}

				// Image can't be aligned when floating is disallowed (#11004).

				if (
					this.data.align != 'none' &&
					!editor.filter.checkFeature(features.align)
				) {
					this.data.align = 'none';
				}

				// Convert the internal form of the widget from the old state to the new one.

				this.shiftState({
					widget: this,
					element: this.element,
					oldData: this.oldData,
					newData: this.data,
					deflate,
					inflate,
				});

				// Update widget.parts.link since it will not auto-update unless widget
				// is destroyed and re-inited.

				if (!this.data.link) {
					if (this.parts.link) {
						delete this.parts.link;
					}
				} else {
					if (!this.parts.link) {
						this.parts.link = this.parts.image.getParent();
					}
				}

				this.parts.image.setAttributes({
					src: this.data.src,

					// This internal is required by the editor.

					'data-cke-saved-src': this.data.src,

					alt: this.data.alt,
				});

				// If shifting non-captioned -> captioned, remove classes
				// related to styles from <img/>.

				if (
					this.oldData &&
					!this.oldData.hasCaption &&
					this.data.hasCaption
				) {
					for (const c in this.data.classes) {
						if (
							Object.prototype.hasOwnProperty.call(
								this.data.classes,
								c
							)
						) {
							this.parts.image.removeClass(c);
						}
					}
				}

				// Set dimensions of the image according to gathered data.
				// Do it only when the attributes are allowed (#11004).

				if (editor.filter.checkFeature(features.dimension)) {
					setDimensions(this);
				}

				// Cache current data.

				this.oldData = CKEDITOR.tools.extend({}, this.data);
			},

			init() {
				const helpers = CKEDITOR.plugins.ae_dragresize_ie11;

				const image = this.parts.image;

				const data = {
					hasCaption: !!this.parts.caption,
					src: image.getAttribute('src'),
					alt: image.getAttribute('alt') || '',
					width: image.getAttribute('width') || '',

					// Lock ratio is on by default (#10833).

					lock: this.ready
						? helpers.checkHasNaturalRatio(image)
						: true,
				};

				data.height = data.lock
					? null
					: image.getAttribute('height') || '';

				// If we used 'a' in widget#parts definition, it could happen that
				// selected element is a child of widget.parts#caption. Since there's no clever
				// way to solve it with CSS selectors, it's done like that. (#11783).

				const link = image.getAscendant('a');

				if (link && this.wrapper.contains(link)) {
					this.parts.link = link;
				}

				// Depending on configuration, read style/class from element and
				// then remove it. Removed style/class will be set on wrapper in #data listener.
				// Note: Center alignment is detected during upcast, so only left/right cases
				// are checked below.

				if (!data.align) {
					const alignElement = data.hasCaption ? this.element : image;

					// Read the initial left/right alignment from the class set on element.

					if (alignClasses) {
						if (alignElement.hasClass(alignClasses[0])) {
							data.align = 'left';
						} else if (alignElement.hasClass(alignClasses[2])) {
							data.align = 'right';
						}

						if (data.align) {
							alignElement.removeClass(
								alignClasses[alignmentsObj[data.align]]
							);
						} else {
							data.align = 'none';
						}
					}

					// Read initial float style from figure/image and then remove it.
					else {
						data.align = alignElement.getStyle('float') || 'none';
						alignElement.removeStyle('float');
					}
				}

				// Update data.link object with attributes if the link has been discovered.

				if (editor.plugins.link && this.parts.link) {
					data.link = helpers.getLinkAttributesParser()(
						editor,
						this.parts.link
					);

					// Get rid of cke_widget_* classes in data. Otherwise
					// they might appear in link dialog.

					const advanced = data.link.advanced;
					if (advanced && advanced.advCSSClasses) {
						advanced.advCSSClasses = CKEDITOR.tools.trim(
							advanced.advCSSClasses.replace(/cke_\S+/, '')
						);
					}
				}

				// Get rid of extra vertical space when there's no caption.
				// It will improve the look of the resizer.

				this.wrapper[(data.hasCaption ? 'remove' : 'add') + 'Class'](
					'cke_image_nocaption'
				);

				this.setData(data);

				// Setup dynamic image resizing with mouse.
				// Don't initialize resizer when dimensions are disallowed (#11004).

				if (
					editor.filter.checkFeature(this.features.dimension) &&
					editor.config.ae_dragresize_ie11_disableResizer !== true
				) {
					setupResizer(this);
				}

				const dragHandlerStyle = this.dragHandlerContainer.$.style;
				dragHandlerStyle.setAttribute(
					'backgroundColor',
					'rgba(255, 255, 255, 1'
				);
				dragHandlerStyle.setAttribute('opacity', '1');

				this.shiftState = helpers.stateShifter(this.editor);

				// Add widget editing option to its context menu.

				this.on('contextMenu', function(evt) {
					evt.data.image = CKEDITOR.TRISTATE_OFF;

					// Integrate context menu items for link.
					// Note that widget may be wrapped in a link, which
					// does not belong to that widget (#11814).

					if (this.parts.link || this.wrapper.getAscendant('a')) {
						evt.data.link = evt.data.unlink = CKEDITOR.TRISTATE_OFF;
					}
				});
			},

			// Overrides default method to handle internal mutability of ae_dragresize_ie11.
			// @see CKEDITOR.plugins.widget#addClass

			addClass(className) {
				getStyleableElement(this).addClass(className);
			},

			// Overrides default method to handle internal mutability of ae_dragresize_ie11.
			// @see CKEDITOR.plugins.widget#hasClass

			hasClass(className) {
				return getStyleableElement(this).hasClass(className);
			},

			// Overrides default method to handle internal mutability of ae_dragresize_ie11.
			// @see CKEDITOR.plugins.widget#removeClass

			removeClass(className) {
				getStyleableElement(this).removeClass(className);
			},

			// Overrides default method to handle internal mutability of ae_dragresize_ie11.
			// @see CKEDITOR.plugins.widget#getClasses

			getClasses: (function() {
				const classRegex = new RegExp(
					'^(' +
						[].concat(captionedClass, alignClasses).join('|') +
						')$'
				);

				return function() {
					const classes = this.repository.parseElementClasses(
						getStyleableElement(this).getAttribute('class')
					);

					// Neither config.ae_dragresize_ie11_captionedClass nor config.ae_dragresize_ie11_alignClasses
					// do not belong to style classes.

					for (const c in classes) {
						if (classRegex.test(c)) {
							delete classes[c];
						}
					}

					return classes;
				};
			})(),

			upcast: upcastWidgetElement(editor),
			downcast: downcastWidgetElement(editor),

			getLabel() {
				const label = (this.data.alt || '') + ' ' + this.pathName;

				return this.editor.lang.widget.label.replace(/%1/, label);
			},
		};
	}

	/**
	 * A set of Enhanced Image (ae_dragresize_ie11) plugin helpers.
	 *
	 * @class
	 * @singleton
	 */
	CKEDITOR.plugins.ae_dragresize_ie11 = {
		stateShifter(editor) {
			// Tag name used for centering non-captioned widgets.

			const doc = editor.document;

			const alignClasses = editor.config.ae_dragresize_ie11_alignClasses;

			const captionedClass =
				editor.config.ae_dragresize_ie11_captionedClass;

			const editable = editor.editable();

			// The order that stateActions get executed. It matters!

			const shiftables = ['hasCaption', 'align', 'link'];

			// Atomic procedures, one per state variable.

			const stateActions = {
				align(shift, oldValue, newValue) {
					const el = shift.element;

					// Alignment changed.

					if (
						shift.changed.align ||
						(el.$.style.marginLeft === 'auto' &&
							el.$.style.marginRight === 'auto')
					) {
						// No caption in the new state.

						if (!shift.newData.hasCaption) {
							// Changed to "center" (non-captioned).

							if (
								newValue == 'center' ||
								(el.$.style.marginLeft === 'auto' &&
									el.$.style.marginRight === 'auto')
							) {
								shift.deflate();
								shift.element = wrapInCentering(editor, el);
							}

							// Changed to "non-center" from "center" while caption removed.

							if (
								!shift.changed.hasCaption &&
								oldValue == 'center' &&
								newValue != 'center'
							) {
								shift.deflate();
								shift.element = unwrapFromCentering(el);
							}
						}
					}

					// Alignment remains and "center" removed caption.
					else if (
						newValue == 'center' &&
						shift.changed.hasCaption &&
						!shift.newData.hasCaption
					) {
						shift.deflate();
						shift.element = wrapInCentering(editor, el);
					}

					// Finally set display for figure.

					if (!alignClasses && el.is('figure')) {
						if (newValue == 'center') {
							el.setStyle('display', 'inline-block');
						} else {
							el.removeStyle('display');
						}
					}
				},

				hasCaption(shift, oldValue, newValue) {
					// This action is for real state change only.

					if (!shift.changed.hasCaption) {
						return;
					}

					// Get <img/> or <a><img/></a> from widget. Note that widget element might itself
					// be what we're looking for. Also element can be <p style="text-align:center"><a>...</a></p>.

					let imageOrLink;
					if (shift.element.is({img: 1, a: 1})) {
						imageOrLink = shift.element;
					} else {
						imageOrLink = shift.element.findOne('a,img');
					}

					// Switching hasCaption always destroys the widget.

					shift.deflate();

					// There was no caption, but the caption is to be added.

					if (newValue) {
						// Create new <figure> from widget template.

						const figure = CKEDITOR.dom.element.createFromHtml(
							templateBlock.output({
								captionedClass,
								captionPlaceholder:
									editor.lang.ae_dragresize_ie11
										.captionPlaceholder,
							}),
							doc
						);

						// Replace element with <figure>.

						replaceSafely(figure, shift.element);

						// Use old <img/> or <a><img/></a> instead of the one from the template,
						// so we won't lose additional attributes.

						imageOrLink.replace(figure.findOne('img'));

						// Update widget's element.

						shift.element = figure;
					}

					// The caption was present, but now it's to be removed.
					else {
						// Unwrap <img/> or <a><img/></a> from figure.

						imageOrLink.replace(shift.element);

						// Update widget's element.

						shift.element = imageOrLink;
					}
				},

				link(shift, oldValue, newValue) {
					if (shift.changed.link) {
						const img = shift.element.is('img')
							? shift.element
							: shift.element.findOne('img');

						const link = shift.element.is('a')
							? shift.element
							: shift.element.findOne('a');

						// Why deflate:
						// If element is <img/>, it will be wrapped into <a>,
						// which becomes a new widget.element.
						// If element is <a><img/></a>, it will be unlinked
						// so <img/> becomes a new widget.element.

						const needsDeflate =
							(shift.element.is('a') && !newValue) ||
							(shift.element.is('img') && newValue);

						let newEl;

						if (needsDeflate) {
							shift.deflate();
						}

						// If unlinked the image, returned element is <img>.

						if (!newValue) {
							newEl = unwrapFromLink(link);
						} else {
							// If linked the image, returned element is <a>.

							if (!oldValue) {
								newEl = wrapInLink(img, shift.newData.link);
							}

							// Set and remove all attributes associated with this state.

							const attributes = CKEDITOR.plugins.ae_dragresize_ie11.getLinkAttributesGetter()(
								editor,
								newValue
							);

							if (!CKEDITOR.tools.isEmpty(attributes.set)) {
								(newEl || link).setAttributes(attributes.set);
							}

							if (attributes.removed.length) {
								(newEl || link).removeAttributes(
									attributes.removed
								);
							}
						}

						if (needsDeflate) {
							shift.element = newEl;
						}
					}
				},
			};

			function wrapInCentering(editor, element) {
				const attribsAndStyles = {};

				if (alignClasses) {
					attribsAndStyles.attributes = {class: alignClasses[1]};
				} else {
					attribsAndStyles.styles = {'text-align': 'center'};
				}

				// There's no gentle way to center inline element with CSS, so create p/div
				// that wraps widget contents and does the trick either with style or class.

				const center = doc.createElement(
					editor.activeEnterMode == CKEDITOR.ENTER_P ? 'p' : 'div',
					attribsAndStyles
				);

				// Replace element with centering wrapper.

				replaceSafely(center, element);
				element.move(center);

				return center;
			}

			function unwrapFromCentering(element) {
				const imageOrLink = element.findOne('a,img');

				imageOrLink.replace(element);

				return imageOrLink;
			}

			// Wraps <img/> -> <a><img/></a>.
			// Returns reference to <a>.
			//
			// @param {CKEDITOR.dom.element} img
			// @param {Object} linkData
			// @returns {CKEDITOR.dom.element}

			function wrapInLink(img, linkData) {
				const link = doc.createElement('a', {
					attributes: {
						href: linkData.url,
					},
				});

				link.replace(img);
				img.move(link);

				return link;
			}

			// De-wraps <a><img/></a> -> <img/>.
			// Returns the reference to <img/>
			//
			// @param {CKEDITOR.dom.element} link
			// @returns {CKEDITOR.dom.element}

			function unwrapFromLink(link) {
				const img = link.findOne('img');

				img.replace(link);

				return img;
			}

			function replaceSafely(replacing, replaced) {
				if (replaced.getParent()) {
					const range = editor.createRange();

					range.moveToPosition(
						replaced,
						CKEDITOR.POSITION_BEFORE_START
					);

					// Remove old element. Do it before insertion to avoid a case when
					// element is moved from 'replaced' element before it, what creates
					// a tricky case which insertElementIntorRange does not handle.

					replaced.remove();

					editable.insertElementIntoRange(replacing, range);
				} else {
					replacing.replace(replaced);
				}
			}

			return function(shift) {
				let name;
				let i;

				shift.changed = {};

				for (i = 0; i < shiftables.length; i++) {
					name = shiftables[i];

					shift.changed[name] = shift.oldData
						? shift.oldData[name] !== shift.newData[name]
						: false;
				}

				// Iterate over possible state variables.

				for (i = 0; i < shiftables.length; i++) {
					name = shiftables[i];

					stateActions[name](
						shift,
						shift.oldData ? shift.oldData[name] : null,
						shift.newData[name]
					);
				}

				shift.inflate();
			};
		},

		/**
		 * Checks whether the current image ratio matches the natural one
		 * by comparing dimensions.
		 *
		 * @param {CKEDITOR.dom.element} image
		 * @return {Boolean}
		 */
		checkHasNaturalRatio(image) {
			const $ = image.$;

			const natural = this.getNatural(image);

			// The reason for two alternative comparisons is that the rounding can come from
			// both dimensions, e.g. there are two cases:
			// 	1. height is computed as a rounded relation of the real height and the value of width,
			//	2. width is computed as a rounded relation of the real width and the value of heigh.

			return (
				Math.round(($.clientWidth / natural.width) * natural.height) ==
					$.clientHeight ||
				Math.round(($.clientHeight / natural.height) * natural.width) ==
					$.clientWidth
			);
		},

		/**
		 * Returns natural dimensions of the image. For modern browsers
		 * it uses natural(Width|Height). For old ones (IE8) it creates
		 * a new image and reads the dimensions.
		 *
		 * @param {CKEDITOR.dom.element} image
		 * @return {Object}
		 */
		getNatural(image) {
			let dimensions;

			if (image.$.naturalWidth) {
				dimensions = {
					width: image.$.naturalWidth,
					height: image.$.naturalHeight,
				};
			} else {
				const img = new Image();
				img.src = image.getAttribute('src');

				dimensions = {
					width: img.width,
					height: img.height,
				};
			}

			return dimensions;
		},

		/**
		 * Returns an attribute getter function. Default getter comes from the Link plugin
		 * and is documented by {@link CKEDITOR.plugins.link#getLinkAttributes}.
		 *
		 * **Note:** It is possible to override this method and use a custom getter e.g.
		 * in the absence of the Link plugin.
		 *
		 * **Note:** If a custom getter is used, a data model format it produces
		 * must be compatible with {@link CKEDITOR.plugins.link#getLinkAttributes}.
		 *
		 * **Note:** A custom getter must understand the data model format produced by
		 * {@link #getLinkAttributesParser} to work correctly.
		 *
		 * @return {Function} A function that gets (composes) link attributes.
		 * @since 4.5.5
		 */
		getLinkAttributesGetter() {
			// #13885

			return CKEDITOR.plugins.link.getLinkAttributes;
		},

		/**
		 * Returns an attribute parser function. Default parser comes from the Link plugin
		 * and is documented by {@link CKEDITOR.plugins.link#parseLinkAttributes}.
		 *
		 * **Note:** It is possible to override this method and use a custom parser e.g.
		 * in the absence of the Link plugin.
		 *
		 * **Note:** If a custom parser is used, a data model format produced by the parser
		 * must be compatible with {@link #getLinkAttributesGetter}.
		 *
		 * **Note:** If a custom parser is used, it should be compatible with the
		 * {@link CKEDITOR.plugins.link#parseLinkAttributes} data model format. Otherwise the
		 * Link plugin dialog may not be populated correctly with parsed data. However
		 * as long as Enhanced Image is **not** used with the Link plugin dialog, any custom data model
		 * will work, being stored as an internal property of Enhanced Image widget's data only.
		 *
		 * @return {Function} A function that parses attributes.
		 * @since 4.5.5
		 */
		getLinkAttributesParser() {
			// #13885

			return CKEDITOR.plugins.link.parseLinkAttributes;
		},
	};

	function setWrapperAlign(widget, alignClasses) {
		const wrapper = widget.wrapper;

		const align = widget.data.align;

		const hasCaption = widget.data.hasCaption;

		if (alignClasses) {
			// Remove all align classes first.

			for (let i = 3; i--; ) {
				wrapper.removeClass(alignClasses[i]);
			}

			if (align == 'center') {
				// Avoid touching non-captioned, centered widgets because
				// they have the class set on the element instead of wrapper:
				//
				// 	<div class="cke_widget_wrapper">
				// 		<p class="center-class">
				// 			<img />
				// 		</p>
				// 	</div>

				if (hasCaption) {
					wrapper.addClass(alignClasses[1]);
				}
			} else if (align != 'none') {
				wrapper.addClass(alignClasses[alignmentsObj[align]]);
			}
		} else {
			if (align == 'center') {
				if (hasCaption) {
					wrapper.setStyle('text-align', 'center');
				} else {
					wrapper.removeStyle('text-align');
				}

				wrapper.removeStyle('float');
			} else {
				if (align == 'none') {
					wrapper.removeStyle('float');
				} else {
					wrapper.setStyle('float', align);
				}

				wrapper.removeStyle('text-align');
			}

			const image = wrapper.$.querySelector('img');

			const imageStyles = image.getAttribute('style');

			if (imageStyles) {
				let styles = '';

				const heightStyles = /(height:.+?;)/.exec(imageStyles);
				if (heightStyles) {
					styles += heightStyles[0];
				}

				const widthStyles = /(width:.+?;)/.exec(imageStyles);
				if (widthStyles) {
					styles += widthStyles[0];
				}

				image.setAttribute('style', styles);
			}
		}
	}

	// Returns a function that creates widgets from all <img> and
	// <figure class="{config.ae_dragresize_ie11_captionedClass}"> elements.
	//
	// @param {CKEDITOR.editor} editor
	// @returns {Function}

	function upcastWidgetElement(editor) {
		const isCenterWrapper = centerWrapperChecker(editor);

		const captionedClass = editor.config.ae_dragresize_ie11_captionedClass;

		// @param {CKEDITOR.htmlParser.element} el
		// @param {Object} data

		return function(el, data) {
			const dimensions = {width: 1, height: 1};

			const name = el.name;

			let image;

			// #11110 Don't initialize on pasted fake objects.

			if (el.attributes['data-cke-realelement']) {
				return;
			}

			// If a center wrapper is found, there are 3 possible cases:
			//
			// 1. <div style="text-align:center"><figure>...</figure></div>.
			//    In this case centering is done with a class set on widget.wrapper.
			//    Simply replace centering wrapper with figure (it's no longer necessary).
			//
			// 2. <p style="text-align:center"><img/></p>.
			//    Nothing to do here: <p> remains for styling purposes.
			//
			// 3. <div style="text-align:center"><img/></div>.
			//    Nothing to do here (2.) but that case is only possible in enterMode different
			//    than ENTER_P.

			if (isCenterWrapper(el)) {
				if (name == 'div') {
					const figure = el.getFirst('figure');

					// Case #1.

					if (figure) {
						el.replaceWith(figure);
						el = figure;
					}
				}

				// Cases #2 and #3 (handled transparently)

				// If there's a centering wrapper, save it in data.

				data.align = 'center';

				// Image can be wrapped in link <a><img/></a>.

				image = el.getFirst('img') || el.getFirst('a').getFirst('img');
			}

			// No center wrapper has been found.
			else if (name == 'figure' && el.hasClass(captionedClass)) {
				image = el.getFirst('img') || el.getFirst('a').getFirst('img');

				// Upcast linked image like <a><img/></a>.
			} else if (isLinkedOrStandaloneImage(el)) {
				image = el.name == 'a' ? el.children[0] : el;
			}

			if (!image) {
				return;
			}

			// If there's an image, then cool, we got a widget.
			// Now just remove dimension attributes expressed with %.

			for (const d in dimensions) {
				if (Object.prototype.hasOwnProperty.call(dimensions, d)) {
					const dimension = image.attributes[d];
					if (dimension && dimension.match(regexPercent)) {
						delete image.attributes[d];
					}
				}
			}

			return el;
		};
	}

	// Returns a function which transforms the widget to the external format
	// according to the current configuration.
	//
	// @param {CKEDITOR.editor}

	function downcastWidgetElement(editor) {
		const alignClasses = editor.config.ae_dragresize_ie11_alignClasses;

		// @param {CKEDITOR.htmlParser.element} el

		return function(el) {
			// In case of <a><img/></a>, <img/> is the element to hold
			// inline styles or classes (ae_dragresize_ie11_alignClasses).

			const attrsHolder = el.name == 'a' ? el.getFirst() : el;

			const attrs = attrsHolder.attributes;

			const align = this.data.align;

			// De-wrap the image from resize handle wrapper.
			// Only block widgets have one.

			if (!this.inline) {
				const resizeWrapper = el.getFirst('span');

				if (resizeWrapper) {
					resizeWrapper.replaceWith(
						resizeWrapper.getFirst({img: 1, a: 1})
					);
				}
			}

			if (align && align != 'none') {
				const styles = CKEDITOR.tools.parseCssText(attrs.style || '');

				// When the widget is captioned (<figure>) and internally centering is done
				// with widget's wrapper style/class, in the external data representation,
				// <figure> must be wrapped with an element holding an style/class:
				//
				// 	<div style="text-align:center">
				// 		<figure class="image" style="display:inline-block">...</figure>
				// 	</div>
				// or
				// 	<div class="some-center-class">
				// 		<figure class="image">...</figure>
				// 	</div>
				//

				if (align == 'center' && el.name == 'figure') {
					el = el.wrapWith(
						new CKEDITOR.htmlParser.element(
							'div',
							alignClasses
								? {class: alignClasses[1]}
								: {style: 'text-align:center'}
						)
					);
				}

				// If left/right, add float style to the downcasted element.
				else if (align in {left: 1, right: 1}) {
					if (alignClasses) {
						attrsHolder.addClass(
							alignClasses[alignmentsObj[align]]
						);
					} else {
						styles['float'] = align;
					}
				}

				// Update element styles.

				if (!alignClasses && !CKEDITOR.tools.isEmpty(styles)) {
					attrs.style = CKEDITOR.tools.writeCssText(styles) + ';';
				}
			}

			return el;
		};
	}

	// Returns a function that checks if an element is a centering wrapper.
	//
	// @param {CKEDITOR.editor} editor
	// @returns {Function}

	function centerWrapperChecker(editor) {
		const captionedClass = editor.config.ae_dragresize_ie11_captionedClass;

		const alignClasses = editor.config.ae_dragresize_ie11_alignClasses;

		const validChildren = {figure: 1, a: 1, img: 1};

		return function(el) {
			// Wrapper must be either <div> or <p>.

			if (!(el.name in {div: 1, p: 1})) {
				return false;
			}

			const children = el.children;

			// Centering wrapper can have only one child.

			if (children.length !== 1) {
				return false;
			}

			const child = children[0];

			// Only <figure> or <img /> can be first (only) child of centering wrapper,
			// regardless of its type.

			if (!(child.name in validChildren)) {
				return false;
			}

			// If centering wrapper is <p>, only <img /> can be the child.
			//   <p style="text-align:center"><img /></p>

			if (el.name == 'p') {
				if (!isLinkedOrStandaloneImage(child)) {
					return false;
				}
			}

			// Centering <div> can hold <img/> or <figure>, depending on enterMode.
			else {
				// If a <figure> is the first (only) child, it must have a class.
				//   <div style="text-align:center"><figure>...</figure><div>

				if (child.name == 'figure') {
					if (!child.hasClass(captionedClass)) {
						return false;
					}
				} else {
					// Centering <div> can hold <img/> or <a><img/></a> only when enterMode
					// is ENTER_(BR|DIV).
					//   <div style="text-align:center"><img /></div>
					//   <div style="text-align:center"><a><img /></a></div>

					if (editor.enterMode == CKEDITOR.ENTER_P) {
						return false;
					}

					// Regardless of enterMode, a child which is not <figure> must be
					// either <img/> or <a><img/></a>.

					if (!isLinkedOrStandaloneImage(child)) {
						return false;
					}
				}
			}

			// Centering wrapper got to be... centering. If ae_dragresize_ie11_alignClasses are defined,
			// check for centering class. Otherwise, check the style.

			if (
				alignClasses
					? el.hasClass(alignClasses[1])
					: CKEDITOR.tools.parseCssText(
							el.attributes.style || '',
							true
					  )['text-align'] == 'center'
			) {
				return true;
			}

			return false;
		};
	}

	// Checks whether element is <img/> or <a><img/></a>.
	//
	// @param {CKEDITOR.htmlParser.element}

	function isLinkedOrStandaloneImage(el) {
		if (el.name == 'img') {
			return true;
		} else if (el.name == 'a') {
			return el.children.length == 1 && el.getFirst('img');
		}

		return false;
	}

	// Sets width and height of the widget image according to current widget data.
	//
	// @param {CKEDITOR.plugins.widget} widget

	function setDimensions(widget) {
		const data = widget.data;

		const dimensions = {
			width: data.width,
			height: data.lock ? null : data.height,
		};

		const image = widget.parts.image;

		for (const d in dimensions) {
			if (dimensions[d]) {
				image.setAttribute(d, dimensions[d]);
			} else {
				image.removeAttribute(d);
			}
		}
	}

	// Defines all features related to drag-driven image resizing.
	//
	// @param {CKEDITOR.plugins.widget} widget

	function setupResizer(widget) {
		const editor = widget.editor;

		const editable = editor.editable();

		const doc = editor.document;

		// Store the resizer in a widget for testing (#11004).

		const resizer = (widget.resizer = doc.createElement('span'));

		// Create resizer for each corner (NE, NW, SE, SW)

		const resizerNE = doc.createElement('span');

		const resizerNW = doc.createElement('span');

		const resizerSE = doc.createElement('span');

		const resizerSW = doc.createElement('span');

		resizerNE.addClass('cke_image_resizer');
		resizerNE.addClass('cke_image_resizer_ne');

		resizerNW.addClass('cke_image_resizer');
		resizerNW.addClass('cke_image_resizer_nw');

		resizerSE.addClass('cke_image_resizer');
		resizerSE.addClass('cke_image_resizer_se');

		resizerSW.addClass('cke_image_resizer');
		resizerSW.addClass('cke_image_resizer_sw');

		// Add each directional resizer as a child of resizer

		resizer.append(resizerNE);
		resizer.append(resizerNW);
		resizer.append(resizerSE);
		resizer.append(resizerSW);

		// resizer.setAttribute( 'title', editor.lang.ae_dragresize_ie11.resizer );

		resizer.append(new CKEDITOR.dom.text('\u200b', doc));

		// Inline widgets don't need a resizer wrapper as an image spans the entire widget.

		if (!widget.inline) {
			const imageOrLink = widget.parts.link || widget.parts.image;

			const oldResizeWrapper = imageOrLink.getParent();

			const resizeWrapper = doc.createElement('span');

			resizeWrapper.addClass('cke_image_resizer_wrapper');
			resizeWrapper.append(imageOrLink);
			resizeWrapper.append(resizer);
			widget.element.append(resizeWrapper, true);

			// Remove the old wrapper which could came from e.g. pasted HTML
			// and which could be corrupted (e.g. resizer span has been lost).

			if (oldResizeWrapper.is('span')) {
				oldResizeWrapper.remove();
			}
		} else {
			widget.wrapper.append(resizer);
		}

		// Calculate values of size variables and mouse offsets.

		resizer.on('mousedown', evt => {
			const image = widget.parts.image;

			// The x-coordinate of the mouse relative to the screen
			// when button gets pressed.

			const startX = evt.data.$.screenX;

			const startY = evt.data.$.screenY;

			// The initial dimensions and aspect ratio of the image.

			const startWidth = image.$.clientWidth;

			const startHeight = image.$.clientHeight;

			const ratio = startWidth / startHeight;

			const listeners = [];

			const target = evt.data.getTarget();

			let factorX;

			let factorY;

			let moveDiffX;

			let moveDiffY;

			let nativeEvt;

			let newHeight;

			let newWidth;

			let updateData;

			// "factorX" and "factorY" can be either 1 or -1. I.e.: We need to
			// add/subtract the difference to get proper width, etc. Without "factorX"
			// and "factorY", resizer starts working the opposite way.

			if (target.hasClass('cke_image_resizer_ne')) {
				factorX = 1;
				factorY = 1;
			} else if (target.hasClass('cke_image_resizer_nw')) {
				factorX = -1;
				factorY = 1;
			} else if (target.hasClass('cke_image_resizer_se')) {
				factorX = 1;
				factorY = -1;
			} else if (target.hasClass('cke_image_resizer_sw')) {
				factorX = -1;
				factorY = -1;
			}

			// A class applied to editable during resizing.

			const cursorClass =
				'cke_image_' +
				(!~factorY ? 's' : 'n') +
				(!~factorX ? 'w' : 'e');

			// Save the undo snapshot first: before resizing.

			editor.fire('saveSnapshot');

			// Mousemove listeners are removed on mouseup.

			attachToDocuments('mousemove', onMouseMove, listeners);

			// Clean up the mousemove listener. Update widget data if valid.

			attachToDocuments('mouseup', onMouseUp, listeners);

			// The entire editable will have the special cursor while resizing goes on.

			editable.addClass(cursorClass);

			// This is to always keep the resizer element visible while resizing.

			resizer.addClass('cke_image_resizing');

			// Attaches an event to a global document if inline editor.
			// Additionally, if classic (`iframe`-based) editor, also attaches the same event to `iframe`'s document.

			function attachToDocuments(name, callback, collection) {
				const globalDoc = CKEDITOR.document;

				const listeners = [];

				if (!doc.equals(globalDoc)) {
					listeners.push(globalDoc.on(name, callback));
				}

				listeners.push(doc.on(name, callback));

				if (collection) {
					for (let i = listeners.length; i--; ) {
						collection.push(listeners.pop());
					}
				}
			}

			// Calculate width first, and then adjust height, preserving ratio.

			function adjustToX() {
				newWidth = startWidth + factorX * moveDiffX;
				newHeight = Math.round(newWidth / ratio);
			}

			// Calculate height first, and then adjust width, preserving ratio.

			function adjustToY() {
				newHeight = startHeight + factorY * moveDiffY;
				newWidth = Math.round(newHeight * ratio);
			}

			// This is how variables refer to the geometry.
			// Note: x corresponds to moveOffset, this is the position of mouse
			// Note: o corresponds to [startX, startY].
			//
			// 	+--------------+--------------+
			// 	|              |              |
			// 	|      I       |      II      |
			// 	|              |              |
			// 	+------------- o -------------+ _ _ _
			// 	|              |              |      ^
			// 	|      VI      |     III      |      | moveDiffY
			// 	|              |         x _ _ _ _ _ v
			// 	+--------------+---------|----+
			// 	               |         |
			// 	                <------->
			// 	                moveDiffX

			function onMouseMove(evt) {
				nativeEvt = evt.data.$;

				// This is how far the mouse is from the point the button was pressed.

				moveDiffX = nativeEvt.screenX - startX;
				moveDiffY = startY - nativeEvt.screenY;

				// Resize with NE, SE drag handles

				if (factorX == 1) {
					if (moveDiffX <= 0) {
						adjustToY();
					} else {
						adjustToX();
					}
				}

				// Resize with NW, SW drag handles
				else {
					if (moveDiffX <= 0) {
						adjustToX();
					} else {
						adjustToY();
					}
				}

				// Don't update attributes if less than 10.
				// This is to prevent images to visually disappear.

				if (newWidth >= 15 && newHeight >= 15) {
					image.$.style.width = newWidth + 'px';
					image.$.style.height = widget.data.lock
						? 'auto'
						: newHeight + 'px';

					updateData = true;
				} else {
					updateData = false;
				}
			}

			function onMouseUp() {
				let l;

				while ((l = listeners.pop())) {
					l.removeListener();
				}

				// Restore default cursor by removing special class.

				editable.removeClass(cursorClass);

				// This is to bring back the regular behaviour of the resizer.

				resizer.removeClass('cke_image_resizing');

				if (updateData) {
					widget.setData({
						height: widget.data.lock ? null : newHeight,
						width: newWidth,
					});

					// Save another undo snapshot: after resizing.

					editor.fire('saveSnapshot');
				}

				// Don't update data twice or more.

				updateData = false;
			}
		});
	}

	/**
	 * Removes the alignment value of an image
	 *
	 * @param {CKEDITOR.dom.element} image The image element
	 * @param {String} imageAlignment The image alignment value to be removed
	 */
	const removeWidgetAlignment = function(widget, imageAlignment) {
		if (imageAlignment === 'left' || imageAlignment === 'right') {
			widget.wrapper.removeStyle('float');
		} else if (imageAlignment === 'center') {
			widget.editor.execCommand('justifyleft');
			widget.editor.execCommand('justifyleft');
		}
	};

	// Integrates widget alignment setting with justify
	// plugin's commands (execution and refreshment).
	// @param {CKEDITOR.editor} editor
	// @param {String} value 'left', 'right', 'center' or 'block'

	function alignCommandIntegrator(editor) {
		const execCallbacks = [];

		let enabled;

		return function(value) {
			const command = editor.getCommand('justify' + value);

			// Most likely, the justify plugin isn't loaded.

			if (!command) {
				return;
			}

			// This command will be manually refreshed along with
			// other commands after exec.

			execCallbacks.push(() => {
				command.refresh(editor, editor.elementPath());
			});

			if (value in {right: 1, left: 1, center: 1}) {
				command.on('exec', evt => {
					const widget = getFocusedWidget(editor);

					if (widget) {
						if (widget.data.align === value) {
							removeWidgetAlignment(widget, value);

							delete widget.data.align;
						} else {
							widget.setData('align', value);
						}

						// Once the widget changed its align, all the align commands
						// must be refreshed: the event is to be cancelled.

						for (let i = execCallbacks.length; i--; ) {
							execCallbacks[i]();
						}

						evt.cancel();
					}
				});
			}

			command.on('refresh', function(evt) {
				const widget = getFocusedWidget(editor);

				const allowed = {right: 1, left: 1, center: 1};

				if (!widget) {
					return;
				}

				// Cache "enabled" on first use. This is because filter#checkFeature may
				// not be available during plugin's afterInit in the future — a moment when
				// alignCommandIntegrator is called.

				if (enabled === undefined) {
					enabled = editor.filter.checkFeature(
						editor.widgets.registered.image.features.align
					);
				}

				// Don't allow justify commands when widget alignment is disabled (#11004).

				if (!enabled) {
					this.setState(CKEDITOR.TRISTATE_DISABLED);
				} else {
					this.setState(
						widget.data.align == value
							? CKEDITOR.TRISTATE_ON
							: value in allowed
							? CKEDITOR.TRISTATE_OFF
							: CKEDITOR.TRISTATE_DISABLED
					);
				}

				evt.cancel();
			});
		};
	}

	// Returns the focused widget, if of the type specific for this plugin.
	// If no widget is focused, `null` is returned.
	//
	// @param {CKEDITOR.editor}
	// @returns {CKEDITOR.plugins.widget}

	function getFocusedWidget(editor) {
		const widget = editor.widgets.focused;

		if (widget && widget.name == 'image') {
			return widget;
		}

		return null;
	}

	// Returns a set of widget allowedContent rules, depending
	// on configurations like config#ae_dragresize_ie11_alignClasses or
	// config#ae_dragresize_ie11_captionedClass.
	//
	// @param {CKEDITOR.editor}
	// @returns {Object}

	function getWidgetAllowedContent(editor) {
		const alignClasses = editor.config.ae_dragresize_ie11_alignClasses;

		const rules = {
			// Widget may need <div> or <p> centering wrapper.

			div: {
				match: centerWrapperChecker(editor),
			},
			p: {
				match: centerWrapperChecker(editor),
			},
			img: {
				attributes: '!src,alt,width,height',
			},
			figure: {
				classes: '!' + editor.config.ae_dragresize_ie11_captionedClass,
			},
			figcaption: true,
		};

		if (alignClasses) {
			// Centering class from the config.

			rules.div.classes = alignClasses[1];
			rules.p.classes = rules.div.classes;

			// Left/right classes from the config.

			rules.img.classes = alignClasses[0] + ',' + alignClasses[2];
			rules.figure.classes += ',' + rules.img.classes;
		} else {
			// Centering with text-align.

			rules.div.styles = 'text-align';
			rules.p.styles = 'text-align';

			rules.img.styles = 'float';
			rules.figure.styles = 'float,display';
		}

		return rules;
	}

	// Returns a set of widget feature rules, depending
	// on editor configuration. Note that the following may not cover
	// all the possible cases since requiredContent supports a single
	// tag only.
	//
	// @param {CKEDITOR.editor}
	// @returns {Object}

	function getWidgetFeatures(editor) {
		const alignClasses = editor.config.ae_dragresize_ie11_alignClasses;

		const features = {
			dimension: {
				requiredContent: 'img[width,height]',
			},
			align: {
				requiredContent:
					'img' +
					(alignClasses ? '(' + alignClasses[0] + ')' : '{float}'),
			},
			caption: {
				requiredContent: 'figcaption',
			},
		};

		return features;
	}

	// Returns element which is styled, considering current
	// state of the widget.
	//
	// @see CKEDITOR.plugins.widget#applyStyle
	// @param {CKEDITOR.plugins.widget} widget
	// @returns {CKEDITOR.dom.element}

	function getStyleableElement(widget) {
		return widget.data.hasCaption ? widget.element : widget.parts.image;
	}
})();

/**
 * A CSS class applied to the `<figure>` element of a captioned image.
 *
 * Read more in the [documentation](#!/guide/dev_captionedimage) and see the
 * [SDK sample](http://sdk.ckeditor.com/samples/captionedimage.html).
 *
 *		// Changes the class to "captionedImage".
 *		config.ae_dragresize_ie11_captionedClass = 'captionedImage';
 *
 * @cfg {String} [ae_dragresize_ie11_captionedClass='image']
 * @member CKEDITOR.config
 */
CKEDITOR.config.ae_dragresize_ie11_captionedClass = 'image';
