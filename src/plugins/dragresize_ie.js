/**
 * CKEditor plugin: Image2
 * - Show gripper to resize images on IE
 */
if (!CKEDITOR.plugins.get('ae_dragresize_ie')) {
	let alignmentsObj = {
		center: 1,
		left: 0,
		right: 2,
	};

	/*
	 * Set cursor css depend on imageScaleResize config
	 **/

	let cursor = {
		both: 'nwse-resize',
		height: 'ns-resize',
		scale: 'nwse-resize',
		width: 'ew-resize',
	};

	let regexPercent = /^\s*(\d+%)\s*$/i;

	let template = '<img alt="" src="" />';

	CKEDITOR.plugins.add('ae_dragresize_ie', {
		hidpi: true,

		icons: 'image',

		init: function(editor) {
			let image = widgetDef(editor);

			// Register the widget.
			editor.widgets.add('image', image);
		},

		onLoad: function() {
			CKEDITOR.addCss(
				'.cke_image_resizer_nwse-resize{' +
					'cursor: nwse-resize;' +
					'}' +
					'.cke_image_resizer_ns-resize{' +
					'cursor: ns-resize;' +
					'}' +
					'.cke_image_resizer_nwse-resize{' +
					'cursor: nwse-resize;' +
					'}' +
					'.cke_image_resizer_ew-resize{' +
					'cursor: ew-resize;' +
					'}' +
					'.cke_image_nocaption{' +
					// This is to remove unwanted space so resize
					// wrapper is displayed property.
					'line-height:0' +
					'}' +
					'.cke_image_resizer{' +
					'display:none;' +
					'position:absolute;' +
					'width:10px;' +
					'height:10px;' +
					'bottom:-5px;' +
					'right:-5px;' +
					'background:#000;' +
					'outline:1px solid #fff;' +
					// Prevent drag handler from being misplaced (#11207).
					'line-height:0;' +
					'cursor:nwse-resize;' +
					'}' +
					'.cke_image_resizer_wrapper{' +
					'position:relative;' +
					'display:inline-block;' +
					'line-height:0;' +
					'}' +
					'.cke_widget_wrapper:hover .cke_image_resizer,' +
					'.cke_image_resizer.cke_image_resizing{' +
					'display:block' +
					'}'
			);
		},

		requires: 'widget',
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
	// Non-captioned widget (config.image2_alignClasses defined)
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
	// Captioned widget (config.image2_alignClasses defined)
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
		editor.config.imageScaleResize =
			editor.config.imageScaleResize || 'both';

		editor.on('imageAdd', function(imageData) {
			editor.widgets.initOn(imageData.data.el, 'image');
		});

		let alignClasses = editor.config.image2_alignClasses;

		let captionedClass = editor.config.image2_captionedClass;

		return {
			init: function() {
				let helpers = CKEDITOR.plugins.image2;

				let image = this.parts.image;

				let data = {
					alt: image.getAttribute('alt') || '',
					hasCaption: !!this.parts.caption,
					height: image.getAttribute('height') || '',
					// Lock ratio is on by default (#10833).
					lock: this.ready
						? helpers.checkHasNaturalRatio(image)
						: true,
					src: image.getAttribute('src'),
					width: image.getAttribute('width') || '',
				};

				// If we used 'a' in widget#parts definition, it could happen that
				// selected element is a child of widget.parts#caption. Since there's no clever
				// way to solve it with CSS selectors, it's done like that. (#11783).
				let link = image.getAscendant('a');

				if (link && this.wrapper.contains(link)) {
					this.parts.link = link;
				}

				// Depending on configuration, read style/class from element and
				// then remove it. Removed style/class will be set on wrapper in #data listener.
				// Note: Center alignment is detected during upcast, so only left/right cases
				// are checked below.
				if (!data.align) {
					let alignElement = data.hasCaption ? this.element : image;

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

				// Get rid of extra vertical space when there's no caption.
				// It will improve the look of the resizer.
				this.wrapper[(data.hasCaption ? 'remove' : 'add') + 'Class'](
					'cke_image_nocaption'
				);

				this.setData(data);

				if (editor.config.image2_disableResizer !== true) {
					setupResizer(this);
				}
			},

			// Overrides default method to handle internal mutability of Image2.
			// @see CKEDITOR.plugins.widget#addClass
			addClass: function(className) {
				getStyleableElement(this).addClass(className);
			},

			allowedContent: getWidgetAllowedContent(editor),

			// This widget converts style-driven dimensions to attributes.
			contentTransformations: [['img[width]: sizeToAttribute']],

			data: function() {
				let features = this.features;

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
					alt: this.data.alt,

					contenteditable: this.parts.image.getAttribute(
						'contenteditable'
					)
						? this.parts.image.getAttribute('contenteditable')
						: true,

					// This internal is required by the editor.
					'data-cke-saved-src': this.data.src,

					src: this.data.src,
				});

				// If shifting non-captioned -> captioned, remove classes
				// related to styles from <img/>.
				if (
					this.oldData &&
					!this.oldData.hasCaption &&
					this.data.hasCaption
				) {
					for (let c in this.data.classes) {
						if (this.data.classes.hasOwnProperty(c)) {
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

			downcast: downcastWidgetElement(editor),

			draggable: false,

			// This widget has an editable caption.
			editables: {
				caption: {
					selector: 'figcaption',
					allowedContent: 'br em strong sub sup u s; a[!href,target]',
				},
			},

			features: getWidgetFeatures(editor),

			// Overrides default method to handle internal mutability of Image2.
			// @see CKEDITOR.plugins.widget#getClasses
			getClasses: (function() {
				let classRegex = new RegExp(
					'^(' +
						[].concat(captionedClass, alignClasses).join('|') +
						')$'
				);

				return function() {
					let classes = this.repository.parseElementClasses(
						getStyleableElement(this).getAttribute('class')
					);

					// Neither config.image2_captionedClass nor config.image2_alignClasses
					// do not belong to style classes.
					for (let c in classes) {
						if (classRegex.test(c)) {
							delete classes[c];
						}
					}

					return classes;
				};
			})(),

			getLabel: function() {
				let label = (this.data.alt || '') + ' ' + this.pathName;

				return label;
			},

			// Overrides default method to handle internal mutability of Image2.
			// @see CKEDITOR.plugins.widget#hasClass
			hasClass: function(className) {
				return getStyleableElement(this).hasClass(className);
			},

			parts: {
				caption: 'figcaption',
				image: 'img',
			},

			// Overrides default method to handle internal mutability of Image2.
			// @see CKEDITOR.plugins.widget#removeClass
			removeClass: function(className) {
				getStyleableElement(this).removeClass(className);
			},

			requiredContent: 'img[src,alt]',

			styleableElements: 'img figure',

			// Template of the widget: plain image.
			template: template,

			upcast: upcastWidgetElement(editor),
		};
	}

	/**
	 * A set of Enhanced Image (image2) plugin helpers.
	 *
	 * @class
	 * @singleton
	 */
	CKEDITOR.plugins.image2 = {
		/**
		 * Checks whether the current image ratio matches the natural one
		 * by comparing dimensions.
		 *
		 * @param {CKEDITOR.dom.element} image
		 * @return {Boolean}
		 */
		checkHasNaturalRatio: function(image) {
			let $ = image.$;

			let natural = this.getNatural(image);

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
		getNatural: function(image) {
			let dimensions;

			if (image.$.naturalWidth) {
				dimensions = {
					height: image.$.naturalHeigh,
					width: image.$.naturalWidth,
				};
			} else {
				let img = new Image();

				img.src = image.getAttribute('src');

				dimensions = {
					height: img.heigh,
					width: img.width,
				};
			}

			return dimensions;
		},
	};

	// Returns a function that creates widgets from all <img> and
	// <figure class="{config.image2_captionedClass}"> elements.
	//
	// @param {CKEDITOR.editor} editor
	// @returns {Function}
	function upcastWidgetElement(editor) {
		let isCenterWrapper = centerWrapperChecker(editor);

		let captionedClass = editor.config.image2_captionedClass;

		// @param {CKEDITOR.htmlParser.element} el
		// @param {Object} data
		return function(el, data) {
			let dimensions = {
				height: 1,
				width: 1,
			};

			let name = el.name;

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
					let figure = el.getFirst('figure');

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
			for (let d in dimensions) {
				if (dimensions.hasOwnProperty(d)) {
					let dimension = image.attributes[d];

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
		let alignClasses = editor.config.image2_alignClasses;

		// @param {CKEDITOR.htmlParser.element} el
		return function(el) {
			// In case of <a><img/></a>, <img/> is the element to hold
			// inline styles or classes (image2_alignClasses).
			let attrsHolder = el.name == 'a' ? el.getFirst() : el;

			delete attrsHolder.attributes.contenteditable;

			let attrs = attrsHolder.attributes;

			let align = this.data.align;

			// De-wrap the image from resize handle wrapper.
			// Only block widgets have one.
			if (!this.inline) {
				let resizeWrapper = el.getFirst('span');

				if (resizeWrapper) {
					resizeWrapper.replaceWith(
						resizeWrapper.getFirst({
							a: 1,
							img: 1,
						})
					);
				}
			}

			if (align && align != 'none') {
				let styles = CKEDITOR.tools.parseCssText(attrs.style || '');

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
								? {
										class: alignClasses[1],
								  }
								: {
										style: 'text-align:center',
								  }
						)
					);
				}

				// If left/right, add float style to the downcasted element.
				else if (
					align in
					{
						left: 1,
						right: 1,
					}
				) {
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
					attrs.style = CKEDITOR.tools.writeCssText(styles);
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
		let captionedClass = editor.config.image2_captionedClass;

		let alignClasses = editor.config.image2_alignClasses;

		let validChildren = {
			a: 1,
			figure: 1,
			img: 1,
		};

		return function(el) {
			// Wrapper must be either <div> or <p>.
			if (
				!(
					el.name in
					{
						div: 1,
						p: 1,
					}
				)
			) {
				return false;
			}

			let children = el.children;

			// Centering wrapper can have only one child.
			if (children.length !== 1) {
				return false;
			}

			let child = children[0];

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

			// Centering wrapper got to be... centering. If image2_alignClasses are defined,
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
		let data = widget.data;

		let dimensions = {
			height: data.height,
			width: data.width,
		};

		let image = widget.parts.image;

		for (let d in dimensions) {
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
		let editor = widget.editor;

		let editable = editor.editable();

		let doc = editor.document;

		// Store the resizer in a widget for testing (#11004).
		let resizer = (widget.resizer = doc.createElement('span'));

		resizer.addClass('cke_image_resizer');
		resizer.addClass(
			'cke_image_resizer_' + cursor[editor.config.imageScaleResize]
		);
		resizer.append(new CKEDITOR.dom.text('\u200b', doc));

		// Inline widgets don't need a resizer wrapper as an image spans the entire widget.
		if (!widget.inline) {
			let imageOrLink = widget.parts.link || widget.parts.image;

			let oldResizeWrapper = imageOrLink.getParent();

			let resizeWrapper = doc.createElement('span');

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
		resizer.on('mousedown', function(evt) {
			let image = widget.parts.image;

			// "factor" can be either 1 or -1. I.e.: For right-aligned images, we need to
			// subtract the difference to get proper width, etc. Without "factor",
			// resizer starts working the opposite way.
			let factor = widget.data.align == 'right' ? -1 : 1;

			// The x-coordinate of the mouse relative to the screen
			// when button gets pressed.
			let startX = evt.data.$.screenX;

			let startY = evt.data.$.screenY;

			// The initial dimensions and aspect ratio of the image.
			let startWidth = image.$.clientWidth;

			let startHeight = image.$.clientHeight;

			let listeners = [];

			// A class applied to editable during resizing.
			let cursorClass = 'cke_image_s' + (!~factor ? 'w' : 'e');

			let nativeEvt;
			let newWidth;
			let newHeight;
			let updateData;

			let moveDiffX;
			let moveDiffY;

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
				let globalDoc = CKEDITOR.document;

				let listeners = [];

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
				let imageScaleResize = editor.config.imageScaleResize;

				nativeEvt = evt.data.$;

				// This is how far the mouse is from the point the button was pressed.
				moveDiffX = nativeEvt.screenX - startX;
				moveDiffY = startY - nativeEvt.screenY;

				if (
					imageScaleResize === 'width' ||
					imageScaleResize === 'both' ||
					imageScaleResize === 'scale'
				) {
					newWidth = startWidth + factor * moveDiffX;
				}

				if (
					imageScaleResize === 'height' ||
					imageScaleResize === 'both'
				) {
					newHeight = startHeight - moveDiffY;
				}

				if (imageScaleResize === 'scale') {
					newHeight = 'auto';
				}

				newWidth = newWidth || startWidth;
				newHeight = newHeight || startHeight;

				// Don't update attributes if less than 10.
				// This is to prevent images to visually disappear.
				if (
					newWidth >= 15 &&
					(newHeight >= 15 || newHeight === 'auto')
				) {
					image.$.style.width = newWidth + 'px';
					image.$.style.height = newHeight + 'px';

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
						height: newHeight,
						width: newWidth,
					});

					// Save another undo snapshot: after resizing.
					editor.fire('saveSnapshot');
				}

				// Don't update data twice or more.
				updateData = false;
			}
		});

		// Change the position of the widget resizer when data changes.
		widget.on('data', function() {
			resizer[widget.data.align == 'right' ? 'addClass' : 'removeClass'](
				'cke_image_resizer_left'
			);
		});

		widget.parts.image.on('click', function() {
			let selection = editor.getSelection();

			if (selection) {
				let element = selection.getStartElement();

				if (element) {
					let widgetElement = element.findOne('img');

					if (widgetElement) {
						let region = element.getClientRect();

						let scrollPosition = new CKEDITOR.dom.window(
							window
						).getScrollPosition();
						region.left -= scrollPosition.x;
						region.top += scrollPosition.y;

						region.direction = CKEDITOR.SELECTION_BOTTOM_TO_TOP;

						editor.fire('editorInteraction', {
							nativeEvent: event,
							selectionData: {
								element: widgetElement,
								region: region,
							},
						});
					}
				}
			}
		});
	}

	// Returns a set of widget allowedContent rules, depending
	// on configurations like config#image2_alignClasses or
	// config#image2_captionedClass.
	//
	// @param {CKEDITOR.editor}
	// @returns {Object}
	function getWidgetAllowedContent(editor) {
		let rules = {
			figcaption: true,
			figure: {
				classes: '!' + editor.config.image2_captionedClass,
			},
			img: {
				attributes: '!src,alt,width,height',
			},
		};

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
		let alignClasses = editor.config.image2_alignClasses;

		let features = {
			align: {
				requiredContent:
					'img' +
					(alignClasses ? '(' + alignClasses[0] + ')' : '{float}'),
			},
			caption: {
				requiredContent: 'figcaption',
			},
			dimension: {
				requiredContent: 'img[width,height]',
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
}

CKEDITOR.config.image2_captionedClass = 'image';
