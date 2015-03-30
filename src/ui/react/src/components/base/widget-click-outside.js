(function() {
    'use strict';

    /**
     * Provides functionality for canceling the exclusive state of an Widget when the user clicks
     * outside of it.
     *
     * @class WidgetClickOutside
     */
    var WidgetClickOutside = {
        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         */
        componentDidMount: function() {
            window.addEventListener('mousedown', this._handleClick);
        },

        /**
         * Lifecycle. Invoked immediately before a component is unmounted from the DOM.
         */
        componentWillUnmount: function() {
            window.removeEventListener('mousedown', this._handleClick);
        },

        /**
         * Check if the event target is outside of the current render tree of the Widget.
         *
         * @method _checkForTargetOutside
         * @protected
         * @param {DOMElement} target The DOM Element which have to be checked.
         * @return {Boolean} True if the Widget is was not the targeted element on the click,
         * false otherwise.
         */
        _checkForTargetOutside: function(target) {
            var domNode = React.findDOMNode(this);

            var nodeEl = new CKEDITOR.dom.element(domNode);

            if (nodeEl.contains(new CKEDITOR.dom.node(target))) {
                return false;
            }

            return true;
        },

        /**
         * Checks if the user clicked outside of the render tree of the current Widget and if so,
         * cancels the exclusive rendering.
         *
         * @protected
         * @method _handleClick
         */
        _handleClick: function(event) {
            var outside = this._checkForTargetOutside(event.target);

            if (outside) {
                this.props.cancelExclusive();
            }
        }
    };

    global.WidgetClickOutside = WidgetClickOutside;
}());
