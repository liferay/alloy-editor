/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';
import ReactDOM from 'react-dom';

import EditorContext from '../../adapter/editor-context';
import Lang from '../../oop/lang';

/**
 * ToolbarButtons provides a list of buttons which have to be displayed
 * on the current toolbar depending on user preferences and given state.
 *
 * @class ToolbarButtons
 */
export default WrappedComponent =>
	class ToolbarButtons extends WrappedComponent {
		static contextType = EditorContext;

		/**
		 * Lifecycle. Returns the default values of the properties used in the
		 * toolbar.
		 *
		 * @instance
		 * @memberof ToolbarButtons
		 * @method getDefaultProps
		 */
		static defaultProps = {
			...WrappedComponent.defaultProps,
			gutter: {
				left: 0,
				top: 10,
			},
			constrainToViewport: true,
		};

		/**
		 * Cancels an scheduled animation frame.
		 *
		 * @instance
		 * @memberof ToolbarButtons
		 * @method cancelAnimation
		 */
		cancelAnimation() {
			if (this._animationFrameId) {
				window.cancelAnimationFrame(this._animationFrameId);
			}
		}

		/**
		 * Provides functionality for displaying toolbar Arrow box on top or on bottom of the toolbar
		 * depending on the point of user interaction with the editor.
		 * Returns the list of arrow box classes associated to the current element's state. It relies
		 * on the getInteractionPoint method to calculate the selection direction.
		 *
		 * @instance
		 * @memberof ToolbarButtons
		 * @method getArrowBoxClasses
		 * @return {String} A string with the arrow box CSS classes.
		 */
		getArrowBoxClasses() {
			let arrowBoxClasses = 'ae-arrow-box';

			if (
				this.getInteractionPoint().direction ===
				CKEDITOR.SELECTION_TOP_TO_BOTTOM
			) {
				arrowBoxClasses += ' ae-arrow-box-top';
			} else {
				arrowBoxClasses += ' ae-arrow-box-bottom';
			}

			return arrowBoxClasses;
		}

		/**
		 * Returns an object which contains the position of the element in page coordinates,
		 * restricted to fit to given viewport.
		 *
		 * @instance
		 * @memberof ToolbarButtons
		 * @method getConstrainedPosition
		 * @param {Object} attrs The following properties, provided as numbers:
		 * - height
		 * - left
		 * - top
		 * - width
		 * @param {Object} viewPaneSize Optional. If not provided, the current viewport will be used. Should contain at least these properties:
		 * - width
		 * @return {Object} An object with `x` and `y` properties, which represent the constrained position of the
		 * element.
		 */
		getConstrainedPosition(attrs, viewPaneSize) {
			viewPaneSize =
				viewPaneSize ||
				new CKEDITOR.dom.window(window).getViewPaneSize();

			let x = attrs.left;
			let y = attrs.top;

			if (attrs.left + attrs.width > viewPaneSize.width) {
				x -= attrs.left + attrs.width - viewPaneSize.width;
			}

			if (y < 0) {
				y = 0;
			}

			return {
				x,
				y,
			};
		}

		/**
		 * Returns the position, in page coordinates, according to which a toolbar should appear.
		 * Depending on the direction of the selection, the wdiget may appear above of or on bottom of the selection.
		 *
		 * It depends on the props editorEvent to analyze the following user-interaction parameters:
		 * - {Object} selectionData The data about the selection in the editor as returned from
		 * {{#crossLink "CKEDITOR.plugins.ae_selectionregion/getSelectionData:method"}}{{/crossLink}}
		 * - {Number} pos Contains the coordinates of the position, considered as most appropriate.
		 * This may be the point where the user released the mouse, or just the beginning or the end of
		 * the selection.
		 *
		 * @instance
		 * @method getInteractionPoint
		 * @return {Object} An Object which contains the following properties:
		 * direction, x, y, where x and y are in page coordinates and direction can be one of these:
		 * CKEDITOR.SELECTION_BOTTOM_TO_TOP or CKEDITOR.SELECTION_TOP_TO_BOTTOM
		 */
		getInteractionPoint() {
			const eventPayload = this.props.editorEvent
				? this.props.editorEvent.data
				: null;

			if (!eventPayload) {
				return;
			}

			const selectionData = eventPayload.selectionData;

			const nativeEvent = eventPayload.nativeEvent;

			const pos = {
				x: eventPayload.nativeEvent.pageX,
				y: selectionData.region.top,
			};

			let direction = selectionData.region.direction;

			const endRect = selectionData.region.endRect;

			const startRect = selectionData.region.startRect;

			if (endRect && startRect && startRect.top === endRect.top) {
				direction = CKEDITOR.SELECTION_BOTTOM_TO_TOP;
			}

			let x;
			let y;

			// If we have the point where user released the mouse, show Toolbar at this point
			// otherwise show it on the middle of the selection.

			if (pos.x && pos.y) {
				x = this._getXPoint(selectionData, pos.x);

				if (direction === CKEDITOR.SELECTION_BOTTOM_TO_TOP) {
					y = Math.min(pos.y, selectionData.region.top);
				} else {
					y = Math.max(
						pos.y,
						this._getYPoint(selectionData, nativeEvent)
					);
				}
			} else {
				x = selectionData.region.left + selectionData.region.width / 2;

				if (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) {
					y = this._getYPoint(selectionData, nativeEvent);
				} else {
					y = selectionData.region.top;
				}
			}

			return {
				direction,
				x,
				y,
			};
		}

		/**
		 * Returns the position of the toolbar.
		 *
		 * @instance
		 * @method _getXPoint
		 * @param {Object} eventX The X coordinate received from the native event (mouseup).
		 * @param {Object} selectionData The data about the selection in the editor as returned from {{#crossLink "CKEDITOR.plugins.ae_selectionregion/getSelectionData:method"}}{{/crossLink}}
		 * @protected
		 * @return {Number} The calculated X point in page coordinates.
		 */
		_getXPoint(selectionData, eventX) {
			const region = selectionData.region;

			const left = region.startRect ? region.startRect.left : region.left;
			const right = region.endRect ? region.endRect.right : region.right;

			let x;

			if (left < eventX && right > eventX) {
				x = eventX;
			} else {
				const leftDist = Math.abs(left - eventX);
				const rightDist = Math.abs(right - eventX);

				if (leftDist < rightDist) {
					// user raised the mouse on left on the selection

					x = left;
				} else {
					x = right;
				}
			}

			return x;
		}

		/**
		 * Returns the position of the toolbar.
		 *
		 * @instance
		 * @method _getYPoint
		 * @param {Object} nativeEvent The data about event is fired
		 * @param {Object} selectionData The data about the selection in the editor as returned from {{#crossLink "CKEDITOR.plugins.ae_selectionregion/getSelectionData:method"}}{{/crossLink}}
		 * @protected
		 * @return {Number} The calculated Y point in page coordinates.
		 */
		_getYPoint(selectionData, nativeEvent) {
			let y = 0;

			if (selectionData && nativeEvent) {
				const elementTarget = new CKEDITOR.dom.element(
					nativeEvent.target
				);

				if (
					elementTarget.$ &&
					elementTarget.getStyle('overflow') === 'auto'
				) {
					y =
						nativeEvent.target.offsetTop +
						nativeEvent.target.offsetHeight;
				} else {
					y = selectionData.region.bottom;
				}
			}

			return y;
		}

		/**
		 * Returns the position of the toolbar taking in consideration the
		 * {{#crossLink "ToolbarButtons/gutter:attribute"}}{{/crossLink}} attribute.
		 *
		 * @instance
		 * @memberof ToolbarButtons
		 * @protected
		 * @method  getWidgetXYPoint
		 * @param {Number} left The left offset in page coordinates where Toolbar should be shown.
		 * @param {Number} top The top offset in page coordinates where Toolbar should be shown.
		 * @param {Number} direction The direction of the selection. May be one of the following:
		 * CKEDITOR.SELECTION_BOTTOM_TO_TOP or CKEDITOR.SELECTION_TOP_TO_BOTTOM
		 * @return {Array} An Array with left and top offsets in page coordinates.
		 */
		getWidgetXYPoint(left, top, direction) {
			const domNode = ReactDOM.findDOMNode(this);

			const gutter = this.props.gutter;

			if (
				direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM ||
				direction === CKEDITOR.SELECTION_BOTTOM_TO_TOP
			) {
				left = left - gutter.left - domNode.offsetWidth / 2;

				top =
					direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM
						? top + gutter.top
						: top - domNode.offsetHeight - gutter.top;
			} else if (
				direction === CKEDITOR.SELECTION_LEFT_TO_RIGHT ||
				direction === CKEDITOR.SELECTION_RIGHT_TO_LEFT
			) {
				left =
					direction === CKEDITOR.SELECTION_LEFT_TO_RIGHT
						? left + gutter.left + domNode.offsetHeight / 2
						: left - (3 * domNode.offsetHeight) / 2 - gutter.left;

				top = top - gutter.top - domNode.offsetHeight / 2;
			}

			if (left < 0) {
				left = 0;
			}

			if (top < 0) {
				top = 0;
			}

			return [left, top];
		}

		/**
		 * Returns true if the toolbar is visible, false otherwise
		 *
		 * @instance
		 * @memberof ToolbarButtons
		 * @method isVisible
		 * @return {Boolean} True if the toolbar is visible, false otherwise
		 */
		isVisible() {
			const domNode = ReactDOM.findDOMNode(this);

			if (domNode) {
				const domElement = new CKEDITOR.dom.element(domNode);

				return domElement.hasClass('alloy-editor-visible');
			}

			return false;
		}

		/**
		 * Moves a toolbar from a starting point to a destination point.
		 *
		 * @instance
		 * @memberof ToolbarButtons
		 * @method moveToPoint
		 * @param  {Object} startPoint The starting point for the movement.
		 * @param  {Object} endPoint The destination point for the movement.
		 */
		moveToPoint(startPoint, endPoint) {
			const domElement = new CKEDITOR.dom.element(
				ReactDOM.findDOMNode(this)
			);

			domElement.setStyles({
				left: startPoint[0] + 'px',
				top: startPoint[1] + 'px',
				opacity: 0,
				pointerEvents: 'none',
			});

			domElement.removeClass('alloy-editor-invisible');

			this._animationFrameId = window.requestAnimationFrame(() => {
				domElement.addClass('ae-toolbar-transition');
				domElement.addClass('alloy-editor-visible');
				domElement.setStyles({
					left: endPoint[0] + 'px',
					top: endPoint[1] + 'px',
					opacity: 1,
				});

				// 150ms to match transition-duration for .ae-toolbar-transition:

				setTimeout(() => {
					domElement.setStyles({
						pointerEvents: '',
					});
				}, 150);
			});
		}

		/**
		 * Shows the toolbar with the default animation transition.
		 *
		 * @instance
		 * @memberof ToolbarButtons
		 * @method show
		 */
		show() {
			const domNode = ReactDOM.findDOMNode(this);
			const uiNode = this.context.editor.get('uiNode');

			const scrollTop = uiNode ? uiNode.scrollTop : 0;

			if (!this.isVisible() && domNode) {
				const interactionPoint = this.getInteractionPoint();

				if (interactionPoint) {
					const domElement = new CKEDITOR.dom.element(domNode);

					let finalX;
					let finalY;
					let initialX;
					let initialY;

					finalX = initialX = parseFloat(domElement.getStyle('left'));
					finalY = initialY = parseFloat(domElement.getStyle('top'));

					if (this.props.constrainToViewport) {
						const res = this.getConstrainedPosition({
							height: parseFloat(domNode.offsetHeight),
							left: finalX,
							top: finalY,
							width: parseFloat(domNode.offsetWidth),
						});

						finalX = res.x;
						finalY = res.y;
					}

					if (
						interactionPoint.direction ===
						CKEDITOR.SELECTION_TOP_TO_BOTTOM
					) {
						initialY =
							this.props.selectionData.region.bottom + scrollTop;
					} else {
						initialY =
							this.props.selectionData.region.top + scrollTop;
					}

					this.moveToPoint([initialX, initialY], [finalX, finalY]);
				}
			}
		}

		/**
		 * Updates the toolbar position based on the current interaction point.
		 *
		 * @instance
		 * @memberof ToolbarButtons
		 * @method updatePosition
		 */
		updatePosition() {
			const interactionPoint = this.getInteractionPoint();

			const domNode = ReactDOM.findDOMNode(this);

			if (interactionPoint && domNode) {
				const uiNode =
					this.context.editor.get('uiNode') || document.body;
				const uiNodeStyle = getComputedStyle(uiNode);
				const uiNodeMarginLeft = parseInt(
					uiNodeStyle.getPropertyValue('margin-left'),
					10
				);
				const uiNodeMarginRight = parseInt(
					uiNodeStyle.getPropertyValue('margin-right'),
					10
				);
				const totalWidth =
					uiNodeMarginLeft +
					document.body.clientWidth +
					uiNodeMarginRight;

				const scrollTop =
					uiNode.tagName !== 'BODY' ? uiNode.scrollTop : 0;

				const xy = this.getWidgetXYPoint(
					interactionPoint.x,
					interactionPoint.y,
					interactionPoint.direction
				);
				xy[1] += scrollTop;

				if (xy[0] < 0) {
					xy[0] = 0;
				}
				if (xy[0] > totalWidth - domNode.offsetWidth) {
					xy[0] = totalWidth - domNode.offsetWidth;
				}

				new CKEDITOR.dom.element(domNode).setStyles({
					left: xy[0] + 'px',
					top: xy[1] + 'px',
				});
			}
		}

		/**
		 * Analyses the current selection and returns the buttons or button groups to be rendered.
		 *
		 * @instance
		 * @method getToolbarButtonGroups
		 * @param {Array} buttons The buttons could be shown, prior to the state filtering.
		 * @param {Object} additionalProps Additional props that should be passed down to the buttons.
		 * @return {Array} An Array which contains the buttons or button groups that should be rendered.
		 */
		getToolbarButtonGroups(buttons, additionalProps) {
			if (Lang.isFunction(buttons)) {
				buttons = buttons.call(this) || [];
			}

			return buttons.reduce((list, button) => {
				if (Array.isArray(button)) {
					list.push(this.getToolbarButtons(button, additionalProps));

					return list;
				} else {
					return this.getToolbarButtons(buttons, additionalProps);
				}
			}, []);
		}

		/**
		 * Analyzes the current selection and the buttons exclusive mode value to figure out which
		 * buttons should be present in a given state.
		 *
		 * @instance
		 * @memberof ToolbarButtons
		 * @method getToolbarButtons
		 * @param {Array} buttons The buttons could be shown, prior to the state filtering.
		 * @param {Object} additionalProps Additional props that should be passed down to the buttons.
		 * @return {Array} An Array which contains the buttons that should be rendered.
		 */
		getToolbarButtons(buttons, additionalProps) {
			const buttonProps = {};

			const nativeEditor = this.context.editor.get('nativeEditor');
			const buttonCfg = nativeEditor.config.buttonCfg || {};

			if (Lang.isFunction(buttons)) {
				buttons = buttons.call(this) || [];
			}

			const toolbarButtons = this.filterExclusive(
				buttons
					.filter(button => {
						return (
							button &&
							(AlloyEditor.Buttons[button] ||
								AlloyEditor.Buttons[button.name])
						);
					})
					.map(button => {
						if (Lang.isString(button)) {
							buttonProps[button] = buttonCfg[button];
							button = AlloyEditor.Buttons[button];
						} else if (Lang.isString(button.name)) {
							buttonProps[
								AlloyEditor.Buttons[button.name].key
							] = CKEDITOR.tools.merge(
								buttonCfg[button],
								button.cfg
							);
							button = AlloyEditor.Buttons[button.name];
						}

						return button;
					})
			).map(function(button, index) {
				let props = this.mergeExclusiveProps(
					{
						editor: this.context.editor,
						key:
							button.key !== 'separator'
								? button.key
								: `${button.key}-${index}`,
						tabKey: button.key,
						tabIndex:
							this.props.trigger &&
							this.props.trigger.props.tabKey === button.key
								? 0
								: -1,
						trigger: this.props.trigger,
					},
					button.key
				);

				props = this.mergeDropdownProps(props, button.key);

				if (additionalProps) {
					props = CKEDITOR.tools.merge(props, additionalProps);
				}

				props = CKEDITOR.tools.merge(props, buttonProps[button.key]);

				return React.createElement(button, props);
			}, this);

			return toolbarButtons;
		}
	};
