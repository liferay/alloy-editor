/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import Resizer from './Resizer.es';

if (!CKEDITOR.plugins.get('embedurl')) {
	const REGEX_HTTP = /^https?/;

	CKEDITOR.DEFAULT_LFR_EMBED_WIDGET_TPL =
		'<div data-embed-url="{url}" class="embed-responsive embed-responsive-16by9">{content}<div class="embed-help-message">{helpMessageIcon}<span> {helpMessage}</span></div></div><br>';

	/**
	 * Enum for supported embed alignments
	 * @type {Object}
	 */

	const EMBED_ALIGNMENT = {
		CENTER: 'center',
		LEFT: 'left',
		RIGHT: 'right',
	};

	/**
	 * Enum values for supported embed alignments
	 * @type {Array}
	 */

	const ALIGN_VALUES = [
		EMBED_ALIGNMENT.CENTER,
		EMBED_ALIGNMENT.LEFT,
		EMBED_ALIGNMENT.RIGHT,
	];

	/**
	 * Necessary styles for the center alignment
	 * @type {Array.<Object>}
	 */

	const CENTERED_EMBED_STYLE = [
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
	];

	/**
	 * Retrieves the alignment value of an embed element.
	 *
	 * @param {CKEDITOR.dom.element} embed The embed element
	 * @return {String} The alignment value
	 */

	const getEmbedAlignment = function(embed) {
		let embedAlignment = embed.getStyle('float');

		if (
			!embedAlignment ||
			embedAlignment === 'inherit' ||
			embedAlignment === 'none'
		) {
			embedAlignment = embed.getAttribute('align');
		}

		if (!embedAlignment) {
			const centeredEmbed = CENTERED_EMBED_STYLE.every(style => {
				let styleCheck = embed.getStyle(style.name) === style.value;

				if (!styleCheck && style.vendorPrefixes) {
					styleCheck = style.vendorPrefixes.some(
						vendorPrefix =>
							embed.getStyle(vendorPrefix + style.name) ===
							style.value
					);
				}

				return styleCheck;
			});

			embedAlignment = centeredEmbed ? EMBED_ALIGNMENT.CENTER : null;
		}

		return embedAlignment;
	};

	/**
	 * Removes the alignment value of an embed
	 *
	 * @param {CKEDITOR.dom.element} embed The embed element
	 * @param {String} embedAlignment The embed alignment value to be removed
	 */

	const removeEmbedAlignment = function(embed, embedAlignment) {
		if (
			embedAlignment === EMBED_ALIGNMENT.LEFT ||
			embedAlignment === EMBED_ALIGNMENT.RIGHT
		) {
			embed.removeStyle('float');

			if (embedAlignment === getEmbedAlignment(embed)) {
				embed.removeAttribute('align');
			}
		} else if (embedAlignment === EMBED_ALIGNMENT.CENTER) {
			CENTERED_EMBED_STYLE.forEach(style => {
				embed.removeStyle(style.name);

				if (style.vendorPrefixes) {
					style.vendorPrefixes.forEach(vendorPrefix =>
						embed.removeStyle(vendorPrefix + style.name)
					);
				}
			});
		}
	};

	/**
	 * Sets the alignment value of an embed
	 *
	 * @param {CKEDITOR.dom.element} embed The embed element
	 * @param {String} embedAlignment The embed alignment value to be set
	 */

	const setEmbedAlignment = function(embed, embedAlignment) {
		removeEmbedAlignment(embed, getEmbedAlignment(embed));

		if (
			embedAlignment === EMBED_ALIGNMENT.LEFT ||
			embedAlignment === EMBED_ALIGNMENT.RIGHT
		) {
			embed.setStyle('float', embedAlignment);
		} else if (embedAlignment === EMBED_ALIGNMENT.CENTER) {
			CENTERED_EMBED_STYLE.forEach(style => {
				embed.setStyle(style.name, style.value);

				if (style.vendorPrefixes) {
					style.vendorPrefixes.forEach(vendorPrefix =>
						embed.setStyle(vendorPrefix + style.name, style.value)
					);
				}
			});
		}
	};

	const getSelectedElement = function(editor) {
		const result = {
			alignment: null,
			element: null,
		};

		const selection = editor.getSelection();

		if (selection) {
			const selectedElement = selection.getSelectedElement();

			if (
				selectedElement &&
				selectedElement.getAttribute('data-cke-widget-wrapper')
			) {
				result.alignment = getEmbedAlignment(selectedElement);
				result.element = selectedElement;
			}
		}

		return result;
	};

	const resizeElement = function(el, width, height) {
		const wrapperElement = el.parentElement;

		if (wrapperElement && width > 0 && height > 0) {
			const rect = wrapperElement.getBoundingClientRect();

			const pwidth =
				width >= rect.width
					? 100
					: Math.floor((width / rect.width) * 100);
			const style = `width:${pwidth}%;`;

			wrapperElement.setAttribute('style', style);

			const widgetElement = wrapperElement.querySelector(
				'[data-widget="embedurl"]'
			);

			if (widgetElement) {
				const styles =
					JSON.parse(widgetElement.getAttribute('data-styles')) || {};

				styles.width = `${width}px`;
				styles.height = `${height}px`;

				widgetElement.setAttribute(
					'data-styles',
					JSON.stringify(styles)
				);

				const iframeElement = widgetElement.querySelector('iframe');

				if (iframeElement) {
					iframeElement.setAttribute('width', width);
					iframeElement.setAttribute('height', height);
				}
			}
		}
	};

	const selectWidget = function(editor) {
		setTimeout(() => {
			const selection = editor.getSelection();

			if (selection) {
				const wrapperElement = selection.root.find(
					'[data-cke-widget-wrapper]'
				);

				if (wrapperElement) {
					const elementList = wrapperElement.$;
					if (elementList.length > 0) {
						const lastElement = new CKEDITOR.dom.element(
							elementList[elementList.length - 1]
						);

						const imageElement = lastElement.findOne('img');
						const widgetElement = lastElement.findOne(
							'[data-widget="embedurl"]'
						);

						if (imageElement && widgetElement) {
							const range = editor.createRange();

							range.setStart(widgetElement, 0);
							range.setEnd(imageElement, 1);

							selection.selectRanges([range]);
							selection.selectElement(lastElement);
						}
					}
				}
			}
		}, 0);
	};

	let currentAlignment = null;
	let currentElement = null;
	let resizer = null;

	/**
	 * CKEditor plugin which adds the infrastructure to embed urls as media objects
	 *
	 * This plugin adds an `embedUrl` command that can be used to easily embed a URL and transform it
	 * to an embedded content.
	 *
	 * @class CKEDITOR.plugins.embedurl
	 */

	CKEDITOR.plugins.add('embedurl', {
		requires: 'widget',

		init: editor => {
			const LFR_EMBED_WIDGET_TPL = new CKEDITOR.template(
				editor.config.embedWidgetTpl ||
					CKEDITOR.DEFAULT_LFR_EMBED_WIDGET_TPL
			);

			let providers = editor.config.embedProviders || [];

			providers = providers.map(provider => {
				return {
					id: provider.id,
					tpl: new CKEDITOR.template(
						`<div data-embed-id="{embedId}">${provider.tpl}</div>`
					),
					type: provider.type,
					urlSchemes: provider.urlSchemes.map(
						scheme => new RegExp(scheme)
					),
				};
			});

			const generateEmbedContent = (url, content) => {
				return LFR_EMBED_WIDGET_TPL.output({
					content,
					helpMessage: AlloyEditor.Strings.videoPlaybackDisabled,
					helpMessageIcon: Liferay.Util.getLexiconIconTpl(
						'info-circle'
					),
					url,
				});
			};

			const defaultEmbedWidgetUpcastFn = (element, data) => {
				let upcastWidget = false;

				if (
					element.name === 'div' &&
					element.attributes['data-embed-url']
				) {
					data.url = element.attributes['data-embed-url'];

					upcastWidget = true;
				} else if (
					element.name === 'div' &&
					element.attributes['data-embed-id']
				) {
					const iframe = element.children[0];

					data.url = iframe.attributes.src;

					delete element.attributes.style;

					const embedContent = generateEmbedContent(
						data.url,
						element.getOuterHtml()
					);

					const widgetFragment = new CKEDITOR.htmlParser.fragment.fromHtml(
						embedContent
					);

					upcastWidget = widgetFragment.children[0];

					upcastWidget.attributes['data-styles'] =
						element.attributes['data-styles'];
					upcastWidget.removeClass('embed-responsive');
					upcastWidget.removeClass('embed-responsive-16by9');

					element.replaceWith(upcastWidget);
				}

				return upcastWidget;
			};

			const showError = errorMsg => {
				editor.fire('error', errorMsg);

				setTimeout(() => {
					editor.getSelection().removeAllRanges();

					editor.focus();

					resizer.hide();
				}, 0);
			};

			editor.addCommand('embedUrl', {
				exec: (editor, data) => {
					const type = data.type;
					const url = data.url;
					let content;

					if (REGEX_HTTP.test(url)) {
						const validProvider = providers
							.filter(provider => {
								return type ? provider.type === type : true;
							})
							.some(provider => {
								const scheme = provider.urlSchemes.find(
									scheme => scheme.test(url)
								);

								if (scheme) {
									const embedId = scheme.exec(url)[1];

									content = provider.tpl.output({
										embedId,
									});
								}

								return scheme;
							});

						if (validProvider) {
							editor._selectEmbedWidget = url;

							const embedContent = generateEmbedContent(
								url,
								content
							);

							editor.insertHtml(embedContent);
						} else {
							showError(AlloyEditor.Strings.platformNotSupported);
						}
					} else {
						showError(AlloyEditor.Strings.enterValidUrl);
					}
				},
			});

			editor.widgets.add('embedurl', {
				draggable: false,
				mask: true,
				requiredContent: 'div[data-embed-url]',

				data(event) {
					const instance = this;

					// Sync dimensions and alignment with editor wrapper

					let styles = null;

					const stylesJSON = instance.element.getAttribute(
						'data-styles'
					);

					if (stylesJSON) {
						try {
							styles = JSON.parse(stylesJSON);
						} catch (_error) {
							styles = null;
						}
					}

					if (!styles) {
						const iframe = instance.wrapper.findOne('iframe');

						const bounds = instance.wrapper.$.getBoundingClientRect();
						const width = iframe.getAttribute('width');

						const pwidth =
							width >= bounds.width
								? 100
								: Math.round((width / bounds.width) * 100);

						styles = {
							width: `${pwidth}%`,
						};
					}

					instance.wrapper.setAttribute(
						'style',
						CKEDITOR.tools.writeCssText(styles)
					);

					if (editor._selectEmbedWidget === event.data.url) {
						selectWidget(editor);
					}
				},

				downcast(widget) {
					const embedContent = widget.children[0];

					embedContent.attributes.class =
						'embed-responsive embed-responsive-16by9';

					embedContent.attributes['data-styles'] = JSON.stringify(
						CKEDITOR.tools.parseCssText(
							widget.parent.attributes.style
						)
					);

					embedContent.attributes.style =
						widget.parent.attributes.style;

					return embedContent;
				},

				upcast(element, data) {
					const embedWidgetUpcastFn =
						editor.config.embedWidgetUpcastFn ||
						defaultEmbedWidgetUpcastFn;

					return embedWidgetUpcastFn(element, data);
				},
			});

			window.addEventListener(
				'resize',
				() => {
					resizer.hide();
					selectWidget(editor);
				},
				false
			);

			editor.on('selectionChange', _event => {
				const selection = editor.getSelection();

				if (selection) {
					const element = selection.getSelectedElement();

					if (element) {
						const widgetElement = element.findOne(
							'[data-widget="embedurl"]'
						);

						if (widgetElement) {
							const scrollPosition = new CKEDITOR.dom.window(
								window
							).getScrollPosition();

							const region = element.getClientRect();

							region.direction = CKEDITOR.SELECTION_BOTTOM_TO_TOP;
							region.left -= scrollPosition.x;
							region.top += scrollPosition.y;

							editor.fire('editorInteraction', {
								nativeEvent: {},
								selectionData: {
									element: widgetElement,
									region,
								},
							});
						}

						const imageElement = element.findOne(
							'img.cke_widget_mask'
						);

						if (imageElement) {
							resizer.show(imageElement.$);
						}
					} else {
						resizer.hide();
					}
				}
			});

			editor.on('destroy', () => {
				const resizeElement = document.getElementById('ckimgrsz');

				if (resizeElement) {
					resizeElement.remove();
				}

				document.removeEventListener('mousedown', mouseDownListener);
			});

			editor.on('blur', () => {
				resizer.hide();
			});

			editor.filter.addElementCallback(element => {
				if ('data-embed-url' in element.attributes) {
					return CKEDITOR.FILTER_SKIP_TREE;
				}
			});

			const mouseDownListener = event => {
				const result = getSelectedElement(editor);

				currentAlignment = result.alignment;
				currentElement = result.element;

				if (resizer.isHandle(event.target)) {
					resizer.initDrag(event);
				}
			};

			resizer = new Resizer(editor, {
				onComplete(element, width, height) {
					resizeElement(element, width, height);

					if (currentAlignment && currentElement) {
						setEmbedAlignment(currentElement, currentAlignment);
					}
					selectWidget(editor);
				},
			});

			document.addEventListener('mousedown', mouseDownListener, false);
		},

		afterInit: editor => {
			ALIGN_VALUES.forEach(alignValue => {
				const command = editor.getCommand('justify' + alignValue);

				if (command) {
					command.on('exec', event => {
						const selectedElement = editor
							.getSelection()
							.getSelectedElement();

						if (
							selectedElement &&
							selectedElement.getAttribute(
								'data-cke-widget-wrapper'
							)
						) {
							const selectedEmbed = selectedElement.findOne(
								'[data-widget="embedurl"] [data-embed-id]'
							);

							if (selectedEmbed) {
								const embedAlignment = getEmbedAlignment(
									selectedElement
								);

								if (embedAlignment === alignValue) {
									removeEmbedAlignment(
										selectedElement,
										alignValue
									);
								} else {
									setEmbedAlignment(
										selectedElement,
										alignValue
									);
								}

								currentElement = selectedElement;
								currentAlignment = getEmbedAlignment(
									selectedElement
								);

								const imageElement = selectedElement.findOne(
									'img'
								);

								if (imageElement) {
									resizer.show(imageElement.$);
								}

								event.cancel();

								const elementPath = new CKEDITOR.dom.elementPath(
									selectedElement
								);

								ALIGN_VALUES.forEach(alignValue => {
									const command = editor.getCommand(
										'justify' + alignValue
									);

									if (command) {
										command.refresh(editor, elementPath);
									}
								});
							}
						}
					});

					command.on('refresh', event => {
						const lastElement = event.data.path.lastElement;

						if (
							lastElement &&
							lastElement.getAttribute(
								'data-cke-widget-wrapper'
							) &&
							lastElement.findOne('[data-widget] [data-embed-id]')
						) {
							const embedAlignment = getEmbedAlignment(
								lastElement
							);

							event.sender.setState(
								embedAlignment === alignValue
									? CKEDITOR.TRISTATE_ON
									: CKEDITOR.TRISTATE_OFF
							);

							event.cancel();
						}
					});
				}
			});
		},
	});
}

export default CKEDITOR.plugins.get('embedurl');
