/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

/**
 * CKEditor plugin: Dragable image resizing
 * https://github.com/sstur/ck-dragresize
 * - Shows semi-transparent overlay while resizing
 * - Enforces Aspect Ratio (unless holding shift)
 * - Snap to size of other images in editor
 * - Escape while dragging cancels resize
 */
if (!CKEDITOR.plugins.get('ae_dragresize')) {
	const IMAGE_HANDLES = {
		both: ['tl', 'tm', 'tr', 'lm', 'rm', 'bl', 'bm', 'br'],
		height: ['tl', 'tm', 'tr', 'bl', 'bm', 'br'],
		scale: ['tl', 'tr', 'bl', 'br'],
		width: ['tl', 'tr', 'lm', 'rm', 'bl', 'br'],
	};

	const POSITION_ELEMENT_FN = {
		bl(handle, left, top, box) {
			positionElement(handle, -3 + left, box.height - 4 + top);
		},
		bm(handle, left, top, box) {
			positionElement(
				handle,
				Math.round(box.width / 2) - 3 + left,
				box.height - 4 + top
			);
		},
		br(handle, left, top, box) {
			positionElement(handle, box.width - 4 + left, box.height - 4 + top);
		},
		lm(handle, left, top, box) {
			positionElement(
				handle,
				-3 + left,
				Math.round(box.height / 2) - 3 + top
			);
		},
		tl(handle, left, top, _box) {
			positionElement(handle, left - 3, top - 3);
		},
		tm(handle, left, top, box) {
			positionElement(
				handle,
				Math.round(box.width / 2) - 3 + left,
				-3 + top
			);
		},
		tr(handle, left, top, box) {
			positionElement(handle, box.width - 4 + left, -3 + top);
		},
		rm(handle, left, top, box) {
			positionElement(
				handle,
				box.width - 4 + left,
				Math.round(box.height / 2) - 3 + top
			);
		},
	};

	const IMAGE_SNAP_TO_SIZE = 7;

	const isFirefox = 'MozAppearance' in document.documentElement.style;

	const isWebKit = 'WebkitAppearance' in document.documentElement.style;

	const enablePlugin = isWebKit || isFirefox;

	if (enablePlugin) {
		// CSS is added in a compressed form

		CKEDITOR.addCss(
			'img::selection{color:rgba(0,0,0,0)}img.ckimgrsz{outline:1px dashed #000}#ckimgrsz{position:absolute;width:0;height:0;cursor:default;z-index:10001}#ckimgrsz span{display:none;position:absolute;top:0;left:0;width:0;height:0;background-size:100% 100%;opacity:.65;outline:1px dashed #000}#ckimgrsz i{position:absolute;display:block;width:5px;height:5px;background:#fff;border:1px solid #000}#ckimgrsz i.active,#ckimgrsz i:hover{background:#000}#ckimgrsz i.br,#ckimgrsz i.tl{cursor:nwse-resize}#ckimgrsz i.bm,#ckimgrsz i.tm{cursor:ns-resize}#ckimgrsz i.bl,#ckimgrsz i.tr{cursor:nesw-resize}#ckimgrsz i.lm,#ckimgrsz i.rm{cursor:ew-resize}body.dragging-br,body.dragging-br *,body.dragging-tl,body.dragging-tl *{cursor:nwse-resize!important}body.dragging-bm,body.dragging-bm *,body.dragging-tm,body.dragging-tm *{cursor:ns-resize!important}body.dragging-bl,body.dragging-bl *,body.dragging-tr,body.dragging-tr *{cursor:nesw-resize!important}body.dragging-lm,body.dragging-lm *,body.dragging-rm,body.dragging-rm *{cursor:ew-resize!important}'
		);
	}

	/**
	 * Initializes the plugin
	 */
	CKEDITOR.plugins.add('ae_dragresize', {
		onLoad() {
			if (!enablePlugin) {
				return;
			}
		},
		init(editor) {
			if (!enablePlugin) {
				return;
			}

			editor.once('contentDom', _evt => {
				init(editor);
			});
		},
	});

	function init(editor) {
		const window = editor.window.$;

		const document = editor.document.$;

		if (isFirefox) {
			// Disable the native image resizing

			document.execCommand('enableObjectResizing', false, false);
		}

		const snapToSize =
			typeof IMAGE_SNAP_TO_SIZE === 'undefined'
				? null
				: IMAGE_SNAP_TO_SIZE;

		editor.config.imageScaleResize =
			editor.config.imageScaleResize || 'both';

		const resizer = new Resizer(editor, {
			imageScaleResize: editor.config.imageScaleResize,
			snapToSize,
		});

		const mouseDownListener = function(e) {
			if (resizer.isHandle(e.target)) {
				resizer.initDrag(e);
			}
		};

		document.addEventListener('mousedown', mouseDownListener, false);

		function selectionChange() {
			const selection = editor.getSelection();

			if (!selection) {
				return;
			}

			// If an element is selected and that element is an IMG

			if (
				selection.getType() !== CKEDITOR.SELECTION_NONE &&
				selection.getStartElement().is('img')
			) {
				// And we're not right or middle clicking on the image

				if (
					!window.event ||
					!window.event.button ||
					window.event.button === 0
				) {
					resizer.show(selection.getStartElement().$);
				}
			} else {
				resizer.hide();
			}
		}

		editor.on('selectionChange', selectionChange);

		editor.on('getData', e => {
			let html = e.data.dataValue || '';
			html = html.replace(/<div id="ckimgrsz"([\s\S]*?)<\/div>/i, '');
			html = html.replace(/\b(ckimgrsz)\b/g, '');
			e.data.dataValue = html;
		});

		editor.on('beforeUndoImage', () => {
			// Remove the handles before undo images are saved

			resizer.hide();
		});

		editor.on('afterUndoImage', () => {
			// Restore the handles after undo images are saved

			selectionChange();
		});

		editor.on('blur', () => {
			// Remove the handles when editor loses focus

			resizer.hide();
		});

		editor.on('beforeModeUnload', function self() {
			editor.removeListener('beforeModeUnload', self);
			resizer.hide();
		});

		editor.on('destroy', () => {
			const resizeElement = document.getElementById('ckimgrsz');

			if (resizeElement) {
				resizeElement.remove();
			}

			if (isFirefox) {
				document.execCommand('enableObjectResizing', false, true);
			}

			document.removeEventListener('mousedown', mouseDownListener);
		});

		// Update the selection when the browser window is resized

		let resizeTimeout;
		editor.window.on('resize', () => {
			// Cancel any resize waiting to happen

			clearTimeout(resizeTimeout);

			// Delay resize to "debounce"

			resizeTimeout = setTimeout(selectionChange, 50);
		});
	}

	function Resizer(editor, cfg) {
		this.editor = editor;
		this.window = editor.window.$;
		this.document = editor.document.$;
		this.cfg = cfg || {};
		this.init();
	}

	Resizer.prototype = {
		init() {
			const instance = this;

			const container = (this.container = this.document.createElement(
				'div'
			));

			container.id = 'ckimgrsz';
			this.preview = this.document.createElement('span');
			container.appendChild(this.preview);

			const handles = (this.handles = {});

			IMAGE_HANDLES[this.cfg.imageScaleResize].forEach(handleName => {
				handles[handleName] = instance.handles[
					handleName
				] = instance.createHandle(handleName);
			});

			for (const n in handles) {
				if (Object.prototype.hasOwnProperty.call(handles, n)) {
					container.appendChild(handles[n]);
				}
			}
		},
		createHandle(name) {
			const el = this.document.createElement('i');
			el.classList.add(name);

			return el;
		},
		isHandle(el) {
			const handles = this.handles;
			for (const n in handles) {
				if (handles[n] === el) {
					return true;
				}
			}

			return false;
		},
		show(el) {
			let uiNode = this.editor.config.uiNode;

			const scrollTop = uiNode ? uiNode.scrollTop : 0;

			this.el = el;
			if (this.cfg.snapToSize) {
				this.otherImages = toArray(
					this.document.getElementsByTagName('img')
				);
				this.otherImages.splice(this.otherImages.indexOf(el), 1);
			}
			const box = (this.box = getBoundingBox(this.window, el));
			positionElement(this.container, box.left, box.top + scrollTop);

			uiNode = uiNode || document.body;

			uiNode.appendChild(this.container);

			this.el.classList.add('ckimgrsz');
			this.showHandles();
		},
		hide() {
			// Remove class from all img.ckimgrsz

			const elements = this.document.getElementsByClassName('ckimgrsz');
			for (let i = 0; i < elements.length; ++i) {
				elements[i].classList.remove('ckimgrsz');
			}
			this.hideHandles();
			if (this.container.parentNode) {
				this.container.parentNode.removeChild(this.container);
			}
		},
		initDrag(e) {
			if (e.button !== 0) {
				// right-click or middle-click

				return;
			}
			const resizer = this;
			const drag = new DragEvent(this.window, this.document);
			drag.onStart = function() {
				resizer.showPreview();
				resizer.isDragging = true;
				resizer.editor.getSelection().lock();
			};
			drag.onDrag = function() {
				resizer.calculateSize(this);
				resizer.updatePreview();
				const box = resizer.previewBox;
				resizer.updateHandles(box, box.left, box.top);
			};
			drag.onRelease = function() {
				resizer.isDragging = false;
				resizer.hidePreview();
				resizer.hide();
				resizer.editor.getSelection().unlock();

				// Save an undo snapshot before the image is permanently changed

				resizer.editor.fire('saveSnapshot');
			};
			drag.onComplete = function() {
				resizer.resizeComplete();

				// Save another snapshot after the image is changed

				resizer.editor.fire('saveSnapshot');
			};
			drag.start(e);
		},
		updateHandles(box, left, top) {
			left = left || 0;
			top = top || 0;
			const handles = this.handles;

			for (const handle in handles) {
				if (Object.prototype.hasOwnProperty.call(handles, handle)) {
					POSITION_ELEMENT_FN[handle](
						handles[handle],
						left,
						top,
						box
					);
				}
			}
		},
		showHandles() {
			const handles = this.handles;
			this.updateHandles(this.box);
			for (const n in handles) {
				if (Object.prototype.hasOwnProperty.call(handles, n)) {
					handles[n].style.display = 'block';
				}
			}
		},
		hideHandles() {
			const handles = this.handles;
			for (const n in handles) {
				if (Object.prototype.hasOwnProperty.call(handles, n)) {
					handles[n].style.display = 'none';
				}
			}
		},
		showPreview() {
			this.preview.style.backgroundImage = 'url("' + this.el.src + '")';
			this.calculateSize();
			this.updatePreview();
			this.preview.style.display = 'block';
		},
		updatePreview() {
			const box = this.previewBox;
			positionElement(this.preview, box.left, box.top);
			this.preview.style.width = this.previewBox.width + 'px';
			this.preview.style.height = this.previewBox.height + 'px';
		},
		hidePreview() {
			const box = getBoundingBox(this.window, this.preview);
			this.result = {
				width: box.width,
				height: box.height,
			};
			this.preview.style.display = 'none';
		},
		calculateSize(data) {
			const box = (this.previewBox = {
				top: 0,
				left: 0,
				width: this.box.width,
				height: this.box.height,
			});

			if (!data) {
				return;
			}

			const attr = data.target.className;

			if (~attr.indexOf('r')) {
				box.width = Math.max(32, this.box.width + data.delta.x);
			}
			if (~attr.indexOf('b')) {
				box.height = Math.max(32, this.box.height + data.delta.y);
			}
			if (~attr.indexOf('l')) {
				box.width = Math.max(32, this.box.width - data.delta.x);
			}
			if (~attr.indexOf('t')) {
				box.height = Math.max(32, this.box.height - data.delta.y);
			}

			// if dragging corner, enforce aspect ratio (unless shift key is being held)

			if (attr.indexOf('m') < 0 && !data.keys.shift) {
				const ratio = this.box.width / this.box.height;
				if (box.width / box.height > ratio) {
					box.height = Math.round(box.width / ratio);
				} else {
					box.width = Math.round(box.height * ratio);
				}
			}

			const snapToSize = this.cfg.snapToSize;

			if (snapToSize) {
				const others = this.otherImages;
				for (let i = 0; i < others.length; i++) {
					const other = getBoundingBox(this.window, others[i]);
					if (
						Math.abs(box.width - other.width) <= snapToSize &&
						Math.abs(box.height - other.height) <= snapToSize
					) {
						box.width = other.width;
						box.height = other.height;
						break;
					}
				}
			}

			// recalculate left or top position

			if (~attr.indexOf('l')) {
				box.left = this.box.width - box.width;
			}
			if (~attr.indexOf('t')) {
				box.top = this.box.height - box.height;
			}
		},
		resizeComplete() {
			resizeElement.call(
				this,
				this.el,
				this.result.width,
				this.result.height
			);
		},
	};

	function DragEvent(window, document) {
		this.window = window;
		this.document = document;
		this.events = {
			mousemove: bind(this.mousemove, this),
			keydown: bind(this.keydown, this),
			mouseup: bind(this.mouseup, this),
		};
	}

	DragEvent.prototype = {
		start(e) {
			e.preventDefault();
			e.stopPropagation();
			this.target = e.target;
			this.attr = e.target.className;
			this.startPos = {
				x: e.clientX,
				y: e.clientY,
			};
			this.update(e);
			const events = this.events;
			this.document.addEventListener(
				'mousemove',
				events.mousemove,
				false
			);
			this.document.addEventListener('keydown', events.keydown, false);
			this.document.addEventListener('mouseup', events.mouseup, false);
			this.document.body.classList.add('dragging-' + this.attr);
			if (this.onStart) {
				this.onStart();
			}
		},
		update(e) {
			this.currentPos = {
				x: e.clientX,
				y: e.clientY,
			};
			this.delta = {
				x: e.clientX - this.startPos.x,
				y: e.clientY - this.startPos.y,
			};
			this.keys = {
				shift: e.shiftKey,
				ctrl: e.ctrlKey,
				alt: e.altKey,
			};
		},
		mousemove(e) {
			this.update(e);
			if (this.onDrag) {
				this.onDrag();
			}
			if (e.which === 0) {
				// mouse button released outside window; mouseup wasn't fired (Chrome)

				this.mouseup(e);
			}
		},
		keydown(e) {
			// escape key cancels dragging

			if (e.keyCode === 27) {
				this.release();
			}
		},
		mouseup(e) {
			this.update(e);
			this.release();
			if (this.onComplete) {
				this.onComplete();
			}
		},
		release() {
			this.document.body.classList.remove('dragging-' + this.attr);
			const events = this.events;
			this.document.removeEventListener(
				'mousemove',
				events.mousemove,
				false
			);
			this.document.removeEventListener('keydown', events.keydown, false);
			this.document.removeEventListener('mouseup', events.mouseup, false);
			if (this.onRelease) {
				this.onRelease();
			}
		},
	};

	// helper functions

	function toArray(obj) {
		const len = obj.length;

		const arr = new Array(len);
		for (let i = 0; i < len; i++) {
			arr[i] = obj[i];
		}

		return arr;
	}

	function bind(fn, ctx) {
		if (fn.bind) {
			return fn.bind(ctx);
		}

		return function(...args) {
			fn.apply(ctx, args);
		};
	}

	function positionElement(el, left, top) {
		el.style.left = String(left) + 'px';
		el.style.top = String(top) + 'px';
	}

	function resizeElement(el, width, height) {
		const imageScaleResize = this.editor.config.imageScaleResize;
		if (imageScaleResize === 'both') {
			el.setAttribute('width', String(width));
			el.style.width = String(width) + 'px';
			el.setAttribute('height', String(height));
			el.style.height = String(height) + 'px';
		} else if (
			imageScaleResize === 'width' ||
			imageScaleResize === 'scale'
		) {
			el.removeAttribute('height');
			el.style.height = 'auto';
			el.setAttribute('width', String(width));
			el.style.width = String(width) + 'px';
		} else if (imageScaleResize === 'height') {
			el.setAttribute('height', String(height));
			el.style.height = String(height) + 'px';
			el.removeAttribute('width');
			el.style.width = 'auto';
		}
	}

	function getBoundingBox(window, el) {
		const rect = el.getBoundingClientRect();

		return {
			left: rect.left + window.pageXOffset,
			top: rect.top + window.pageYOffset,
			width: rect.width,
			height: rect.height,
		};
	}
}
