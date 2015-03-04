(function() {
    'use strict';

    var DIRECTION_NEXT = 1;
    var DIRECTION_PREV = -1;

    /**
     * WidgetFocusManager is a mixin that provides keyboard navigation inside a widget. To do this,
     * it exposes the following props and methods:
     *
     * - {Boolean} circular: Indicates if focus should be set to the first/last descendant when the limits are reached.
     * - {String} descendants: String representing the CSS selector used to define the elements that should be handled.
     * - {Object} keys: Object representing the keys used to navigate between descendants. The format for the prop is:
     *  {next: value, prev: value} where value can be both a number or an array of numbers with the allowed keyCodes.
     * - {Function} focus: Focuses the current active descendant. Can be attached to the widget DOM node when nested.
     * - {Function} handleKey: Should be attached to the widget DOM node that should support navigation.
     *
     * @class WidgetFocusManager
     */
    var WidgetFocusManager = {
        propTypes: {
            circular: React.PropTypes.bool,
            descendants: React.PropTypes.string,
            keys: React.PropTypes.object
        },

        /**
         * Lifecycle. Invoked immediately after the component's updates are flushed to the DOM.
         *
         * Refreshes the descendants list.
         */
        componentDidUpdate: function() {
            this._refresh();
        },

        /**
         * Focuses the current active descendant.
         *
         * Several Widgets can be nested in a component hierarchy by attaching this focus method to
         * the widget DOM node, transferring the DOM focus control to the inner FocusManager.
         *
         * @method focus
         */
        focus: function(event) {
            if (!event || this._isValidTarget(event.target)) {
                if (this._descendants) {
                    this._descendants[this._activeDescendant].focus();
                }
            }
        },

        /**
         * Handles the key events on a DOM node to execute the appropiate navigation when needed.
         *
         * @param {Object} event The Keyboard event that was detected on the widget DOM node.
         *
         * @method handleKey
         */
        handleKey: function(event) {
            if (this._isValidTarget(event.target) && this._descendants) {
                var direction = this._getDirection(event);

                if (direction) {
                    event.stopPropagation();
                    event.preventDefault();

                    this._moveFocus(direction);
                }
            }
        },

        /**
         * Returns the direction, if any, in which the focus should be moved. In presence of the
         * shift key modifier, the direction of the movement is inverted.
         *
         * @param {object} event The Keyboard event.
         *
         * @protected
         * @method _getDirection
         */
        _getDirection: function(event) {
            var direction = 0;

            if (this.props.keys) {
                if (this._isValidKey(event.keyCode, this.props.keys.next)) { direction = DIRECTION_NEXT; }
                if (this._isValidKey(event.keyCode, this.props.keys.prev)) { direction = DIRECTION_PREV; }

                if (event.shifKey) { direction *= -1; }
            }

            return direction;
        },

        /**
         * Indicates if a given keyCode is valid for the given set of keys.
         *
         * @param {Number} keyCode An event keyCode.
         * @param {Array|Number} keys A key set. Can be a number an array of numbers representing the allowed keyCodes.
         *
         * @protected
         * @method _isValidKey
         * @return {Boolean} A boolean value indicating if the key is valid.
         */
        _isValidKey: function(keyCode, keys) {
            return global.Lang.isArray(keys) ? (keys.indexOf(keyCode) !== -1) : (keyCode === keys);
        },

        /**
         * Indicates if a given element is valid for focus management. User input elements such as
         * input, select or textarea are excluded.
         *
         * @param {DOMNode} element A DOM element.
         *
         * @protected
         * @method _isValidKey
         * @return {Boolean} A boolean value indicating if the element is valid.
         */
        _isValidTarget: function(element) {
            var tagName = element.tagName.toLowerCase();

            return (tagName !== 'input' && tagName !== 'select' && tagName !== 'textarea');
        },

        /**
         * Moves the focus among descendants in the especified direction.
         *
         * @param {number} direction The direction (1 or -1) of the focus movement among descendants.
         *
         * @protected
         * @method _moveFocus
         */
        _moveFocus: function(direction) {
            var numDescendants = this._descendants.length,
                descendant = this._descendants[this._activeDescendant];

            descendant.setAttribute('tabIndex', -1);

            this._activeDescendant += direction;

            if (this.props.circular) {
                // Calculate proper modulo result since remainder operator doesn't behave in the
                // same way for negative numbers
                this._activeDescendant = ((this._activeDescendant % numDescendants) + numDescendants) % numDescendants;
            } else {
                this._activeDescendant = Math.max(Math.min(this._activeDescendant, numDescendants - 1), 0);
            }

            descendant = this._descendants[this._activeDescendant];

            descendant.setAttribute('tabIndex', 0);
            descendant.focus();
        },

        /**
         * Refreshes the descendants list by executing the CSS selector again and resets the descendants tabIndex.
         */
        _refresh: function() {
            var domNode = this.getDOMNode();

            if (domNode) {
                this._descendants = domNode.querySelectorAll(this.props.descendants);
                this._activeDescendant = 0;

                Array.prototype.forEach.call(this._descendants, function(descendant, descendantIndex) {
                    descendant.setAttribute('tabIndex', (descendantIndex ? -1 : 0));
                });
            }
        }
    };

    global.WidgetFocusManager = WidgetFocusManager;
}());