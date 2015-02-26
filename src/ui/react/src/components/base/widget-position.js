(function() {
    'use strict';

    var WidgetPosition = {
        mixins: [global.WidgetInteractionPoint],

        propTypes: {
            gutter: React.PropTypes.object
        },

        getDefaultProps: function() {
            return {
                gutter: {
                    left: 0,
                    top: 10
                }
            };
        },

        componentDidUpdate: function() {
            this._udpatePosition();
            this._show();
        },

        /**
         * Returns the position of the Widget taking in consideration the
         * {{#crossLink "WidgetPosition/gutter:attribute"}}{{/crossLink}} attribute.
         *
         * @protected
         * @param {Number} left The left offset in page coordinates where Toolbar should be shown.
         * @param {Number} top The top offset in page coordinates where Toolbar should be shown.
         * @param {Number} direction The direction of the selection. May be one of the following:
         * CKEDITOR.SELECTION_BOTTOM_TO_TOP or CKEDITOR.SELECTION_TOP_TO_BOTTOM
         * @return {Array} An Array with left and top offsets in page coordinates.
         */
        getWidgetXYPoint: function(left, top, direction) {
            var domNode = this.getDOMNode();

            var gutter = this.props.gutter;

            if (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM || direction === CKEDITOR.SELECTION_BOTTOM_TO_TOP) {
                left = left - gutter.left - (domNode.offsetWidth / 2);

                top = (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) ? (top + gutter.top) :
                    (top - domNode.offsetHeight - gutter.top);

            } else if (direction === CKEDITOR.SELECTION_LEFT_TO_RIGHT ||
                direction === CKEDITOR.SELECTION_RIGHT_TO_LEFT) {

                left = (direction === CKEDITOR.SELECTION_LEFT_TO_RIGHT) ?
                    (left + gutter.left + domNode.offsetHeight / 2) :
                    (left - 3 * domNode.offsetHeight / 2 - gutter.left);

                top = top - gutter.top - (domNode.offsetHeight / 2);
            }

            return [left, top];
        },

        /**
         * Requests an animation frame, if possible, to simulate an animation.
         *
         * @protected
         * @param {Function} callback The function to be executed on the scheduled frame.
         */
        _animate: function(callback) {
            if (window.requestAnimationFrame) {
                this._animationFrameId = window.requestAnimationFrame(callback);
            } else {
                callback();
            }
        },

        /**
         * Cancels an scheduled animation frame.
         *
         * @protected
         */
        _cancelAnimation: function() {
            if (window.cancelAnimationFrame) {
                window.cancelAnimationFrame(this._animationFrameId);
            }
        },

        /**
         * Shows the widget with the default animation transition
         */
        _show: function() {
            var interactionPoint = this.getInteractionPoint(),
                domNode = this.getDOMNode();

            if (interactionPoint && domNode) {
                var domElement = new CKEDITOR.dom.element(domNode);

                if (!domElement.hasClass('alloy-editor-visible')) {
                    var finalX,
                        finalY,
                        initialX,
                        initialY;

                    finalX = initialX = domElement.getStyle('left');
                    finalY = initialY = domElement.getStyle('top');

                    if (interactionPoint.direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) {
                        initialY = this.props.selectionData.region.bottom;
                    } else {
                        initialY = this.props.selectionData.region.top;
                    }

                    domElement.setStyles({
                        left: initialX,
                        top: initialY + 'px',
                        opacity: 0
                    });

                    domElement.removeClass('alloy-editor-invisible');

                    this._animate(function() {
                        domElement.addClass('alloy-editor-toolbar-transition alloy-editor-visible');
                        domElement.setStyles({
                            left: finalX,
                            top: finalY,
                            opacity: 1
                        });
                    });
                }
            }
        },

        /**
         * Updates the widget position based on the current interaction point.
         */
        _udpatePosition: function() {
            var interactionPoint = this.getInteractionPoint(),
                domNode = this.getDOMNode();

            if (interactionPoint && domNode) {
                var xy = this.getWidgetXYPoint(interactionPoint.x, interactionPoint.y, interactionPoint.direction);

                var domElement = new CKEDITOR.dom.element(domNode);

                domElement.setStyles({
                    left: xy[0] + 'px',
                    top: xy[1] + 'px'
                });
            }
        }
    };

    global.WidgetPosition = WidgetPosition;
}());