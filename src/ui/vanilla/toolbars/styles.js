(function() {

    function ToolbarStyles(config) {
        this._editor = config.editor;

        this._editor.on('editorInteraction', this._onEditorInteraction, this);

        this.render();
    }

    ToolbarStyles.prototype = {
        constructor: ToolbarStyles,

        render: function() {
            var self = this,
                toolbarNode;

            toolbarNode = document.createElement('div');

            toolbarNode.className = 'alloy-editor-toolbar alloy-editor-toolbar-hidden';

            toolbarNode.innerHTML = this.TPL_CONTENT;

            document.querySelector('body').appendChild(toolbarNode);

            self._toolbarEl = new CKEDITOR.dom.element(toolbarNode);

            self._toolbarEl.on('click', self._onToolbarClick, this);

            self._styles = Object.create(null);

            self._toolbarEl.forEach(function(node) {
                var buttonType;

                if (node.getName() === 'button') {
                    buttonType = node.getAttribute('data-type');

                    self._styles[buttonType] = new CKEDITOR.style({
                        element: buttonType
                    });
                }
            });
        },

        showAtPoint: function(left, top, direction) {
            var xy;

            if (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) {
                this._toolbarEl.removeClass('alloy-editor-arrow-box-bottom').addClass('alloy-editor-arrow-box-top');
            } else {
                this._toolbarEl.removeClass('alloy-editor-arrow-box-top').addClass('alloy-editor-arrow-box-bottom');
            }

            if (this._toolbarEl.hasClass('alloy-editor-toolbar-hidden')) {
                this._toolbarEl.setStyle('display', 'block');
            }

            xy = this._getToolbarXYPoint(left, top, direction);

            this._toolbarEl.setStyles({
                left: xy[0] + 'px',
                top: xy[1] + 'px'
            });
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

            if (endRect && startRect && startRect.top === endRect.top) {
                direction = CKEDITOR.SELECTION_BOTTOM_TO_TOP;
            }

            // If we have the point where user released the mouse, show Toolbar at this point
            // otherwise show it on the middle of the selection.
            if (pos.x && pos.y) {
                x = this._getXPoint(selectionData, pos.x);

                if (direction === CKEDITOR.SELECTION_BOTTOM_TO_TOP) {
                    y = Math.min(pos.y, selectionData.region.top);
                } else {
                    y = Math.max(pos.y, selectionData.region.bottom);
                }
            } else {
                x = selectionData.region.left + selectionData.region.width / 2;

                if (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) {
                    y = selectionData.region.bottom;
                } else {
                    y = selectionData.region.top;
                }
            }

            return {
                direction: direction,
                x: x,
                y: y
            };
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
            } else {
                leftDist = Math.abs(left - eventX);
                rightDist = Math.abs(right - eventX);

                if (leftDist < rightDist) { // user raised the mouse on left on the selection
                    x = left;
                } else {
                    x = right;
                }
            }

            return x;
        },

        _getToolbarXYPoint: function(left, top, direction) {
            var gutter;

            gutter = this.gutter;

            if (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM || direction === CKEDITOR.SELECTION_BOTTOM_TO_TOP) {
                left = left - gutter.left - (this._toolbarEl.$.offsetWidth / 2);
                top = (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) ? (top + gutter.top) : (top - this._toolbarEl.$.offsetHeight - gutter.top);

            } else if (direction === CKEDITOR.SELECTION_LEFT_TO_RIGHT || direction === CKEDITOR.SELECTION_RIGHT_TO_LEFT) {
                left = (direction === CKEDITOR.SELECTION_LEFT_TO_RIGHT) ? (left + gutter.left + this._toolbarEl.$.offsetHeight / 2) : (left - 3 * this._toolbarEl.$.offsetHeight / 2 - gutter.left);
                top = top - gutter.top - (this._toolbarEl.$.offsetHeight / 2);

            }

            return [left, top];
        },

        _onEditorInteraction: function(event) {
            var position,
                selectionData,
                selectionEmpty,
                nativeEvent;

            selectionEmpty = this._editor.isSelectionEmpty();

            selectionData = event.data.selectionData;

            nativeEvent = event.data.nativeEvent;

            if (!selectionData.element && selectionData.region && !selectionEmpty) {
                this._updateButtonsUI();

                position = this._calculatePosition(selectionData, {
                    x: nativeEvent.pageX,
                    y: nativeEvent.pageY
                });

                this.showAtPoint(position.x, position.y, position.direction);
            } else {
                this._toolbarEl.setStyle('display', 'none');
            }
        },

        _onToolbarClick: function(event) {

        },

        _updateButtonsUI: function() {
            var key;

            for (key in this._styles) {
                if (Object.prototype.hasOwnProperty.call(this._styles, key)) {

                }
            }
        },

        gutter: {
            left: 0,
            top: 10
        },

        TPL_CONTENT:
            '<div class="alloy-editor-buttons-container">' +
                '<button data-type="bold" class="alloy-editor-button alloy-editor-button-bold">' +
                    '<i class="alloy-editor-icon"></i>' +
                '</button>' +
                '<button data-type="italic" class="alloy-editor-button alloy-editor-button-italic">' +
                    '<i class="alloy-editor-icon"></i>' +
                '</button>' +
                '<button data-type="underline" class="alloy-editor-button alloy-editor-button-underline">' +
                    '<i class="alloy-editor-icon"></i>' +
                '</button>' +
                '<button data-type="h1" class="alloy-editor-button alloy-editor-button-h1">' +
                    '<i class="alloy-editor-icon"></i>' +
                '</button>' +
                '<button data-type="h2" class="alloy-editor-button alloy-editor-button-h2">' +
                    '<i class="alloy-editor-icon"></i>' +
                '</button>' +
                '<button data-type="h3" class="alloy-editor-button alloy-editor-button-h3">' +
                    '<i class="alloy-editor-icon"></i>' +
                '</button>' +
                '<button data-type="h4" class="alloy-editor-button alloy-editor-button-h4">' +
                    '<i class="alloy-editor-icon"></i>' +
                '</button>' +
            '</div>'
    };

    AlloyEditor.ToolbarStyles = ToolbarStyles;
}());