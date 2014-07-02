YUI.add('toolbar-styles', function (Y) {
    'use strict';

    var Lang = Y.Lang,
        YNode = Y.Node,

    ToolbarStyles = Y.Base.create('toolbarstyles', Y.Widget, [Y.WidgetPosition, Y.WidgetAutohide, Y.WidgetPositionConstrain, Y.ToolbarBase], {
    	renderUI: function() {
            var instance = this,
                buttonsContainer,
                contentBox;

            buttonsContainer = YNode.create(instance.TPL_BUTTON_CONTAINER);

            this.get('boundingBox').addClass('arrow-box');

            contentBox = this.get('contentBox');

            contentBox.addClass('btn-toolbar');

            contentBox.appendChild(buttonsContainer);

            instance._buttonsContainer = buttonsContainer;
        },

        showAtPoint: function(left, top, direction) {
            var xy,
                boundingBox;

            boundingBox = this.get('boundingBox');

            if (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) {
                boundingBox.replaceClass('arrow-box-bottom', 'arrow-box-top');
            }
            else {
                boundingBox.replaceClass('arrow-box-top', 'arrow-box-bottom');
            }

            if (!this.get('visible')) {
                this.show();
            }

            xy = this._getToolbarXYPoint(left, top, direction);

            this.set('xy', xy);
        },

        _calculatePosition: function(selectionData, pos) {
            var direction,
                endRect,
                startRect,
                x,
                y;

            direction = selectionData.region.direction;

            endRect = selectionData.region.endRect;
            startRect = selectionData.region.startRect;

            if (endRect && endRect && startRect.top === endRect.top) {
                direction = CKEDITOR.SELECTION_BOTTOM_TO_TOP;
            }

            if (pos.x && pos.y) {
                x = this._getXPoint(selectionData, pos.x);

                if (direction === CKEDITOR.SELECTION_BOTTOM_TO_TOP) {
                    y = Math.min(pos.y, selectionData.region.top);
                }
                else {
                    y = Math.max(pos.y, selectionData.region.bottom);
                }
            }
            else {
                x = selectionData.region.left + selectionData.region.width/2;

                if (direction === 0) {
                    y = selectionData.region.endRect.top;
                }
                else {
                    y = selectionData.region.startRect.top;
                }
            }

            return {
                direction: direction,
                x: x,
                y: y
            };
        },

        _getToolbarXYPoint: function(left, top, direction) {
            var bbDOMNode,
                gutter;

            bbDOMNode = this.get('boundingBox').getDOMNode();

            gutter = this.get('gutter');

            left = left - gutter.left - (bbDOMNode.offsetWidth/2);

            if (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) {
                top = top + gutter.top;
            }
            else {
                top = top - bbDOMNode.offsetHeight - gutter.top;
            }

            return [left, top];
        },

        _getXPoint: function(selectionData, eventX) {
            var left,
                leftDist,
                region,
                right,
                rightDist,
                x;

            region = selectionData.region;

            left = region.startRect ? region.startRect.left : region.left;
            right = region.endRect ? region.endRect.right : region.right;

            if (left < eventX && right > eventX) {
                x = eventX;
            }
            else {
                leftDist = Math.abs(left - eventX);
                rightDist = Math.abs(right - eventX);

                if (leftDist < rightDist) { // user raised the mouse on left on the selection
                    x = left;
                }
                else {
                    x = right;
                }
            }

            return x;
        },

        _onEditorInteraction: function(event) {
            var direction,
                editor,
                position,
                selectionData,
                selectionEmpty,
                yuiEvent;

            editor = this.get('editor');

            selectionEmpty = editor.isSelectionEmpty();

            selectionData = event.selectionData;

            yuiEvent = event.yuiEvent;

            if (!selectionData.element && selectionData.region && !selectionEmpty) {
                position = this._calculatePosition(selectionData, {
                    x: yuiEvent.pageX,
                    y: yuiEvent.pageY
                });

                this.showAtPoint(position.x, position.y, position.direction);

            }
            else {
                this.hide();
            }
        },

        TPL_BUTTON_CONTAINER: '<div class="btn-group toolbar-styles"></div>'
    }, {
        ATTRS: {
            buttons: {
                validator: Lang.isArray,
                value: ['strong', 'em', 'u', 'h1', 'h2', 'a', 'twitter']
            },

            constrain: {
                validator: Lang.isBoolean,
                value: true
            },

            gutter: {
                validator: Lang.isObject,
                value: {
                    left: 0,
                    top: 10
                }
            }
		}
	});

    Y.ToolbarStyles = ToolbarStyles;
},'', {
    requires: ['widget-base', 'widget-position', 'widget-position-constrain', 'widget-autohide', 'toolbar-base']
});
