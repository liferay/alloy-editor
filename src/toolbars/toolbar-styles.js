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

            contentBox = this.get('contentBox');

            contentBox.appendChild(buttonsContainer);

            instance._buttonsContainer = buttonsContainer;
        },

        showAtPoint: function(left, top, direction) {
            var xy;

            this.show();

            xy = this._getToolbarXYPoint(left, top, direction);

            this.set('xy', xy);
        },

        _getToolbarXYPoint: function(left, top, direction) {
            var bbDOMNode,
                offsetFromSel;

            bbDOMNode = this.get('boundingBox').getDOMNode();

            left = left - bbDOMNode.offsetWidth / 2;

            offsetFromSel = this.get('offsetFromSel');

            if (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) {
                top = top + offsetFromSel.topToBottom;
            }
            else {
                top = top - bbDOMNode.offsetHeight - offsetFromSel.bottomToTop;
            }

            return [left, top];
        },

        _onEditorInteraction: function(event) {
            var direction,
                editor,
                endRect,
                selectionData,
                selectionEmpty,
                startRect,
                x,
                y,
                yuiEvent;

            editor = this.get('editor');

            selectionEmpty = editor.isSelectionEmpty();

            selectionData = event.selectionData;

            if (!selectionData.element && selectionData.region && !selectionEmpty) {
                direction = selectionData.region.direction;

                endRect = selectionData.region.endRect;
                startRect = selectionData.region.startRect;

                if (endRect && endRect && startRect.top === endRect.top) {
                    direction = CKEDITOR.SELECTION_BOTTOM_TO_TOP;
                }

                yuiEvent = event.yuiEvent;

                if (yuiEvent.pageX && yuiEvent.pageY) {
                    x = yuiEvent.pageX;

                    if (direction === CKEDITOR.SELECTION_BOTTOM_TO_TOP) {
                        y = Math.min(yuiEvent.pageY, selectionData.region.top);
                    }
                    else {
                        y = Math.max(yuiEvent.pageY, selectionData.region.bottom);
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

                this.showAtPoint(x, y, direction);
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
                    left: 10,
                    top: 0
                }
            },

            offsetFromSel: {
                value: {
                    topToBottom: 5,
                    bottomToTop: 5
                }
            }
		}
	});

    Y.ToolbarStyles = ToolbarStyles;
},'', {
    requires: ['widget-base', 'widget-position', 'widget-position-constrain', 'widget-autohide', 'toolbar-base']
});
