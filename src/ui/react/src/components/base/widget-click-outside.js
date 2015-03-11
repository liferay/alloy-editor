(function() {
    'use strict';

    /**
     * Provides functionality for cancelling the exclusive state of a widget when the user clicks
     * outside of it. This mixin provides a `handleMouseInside` that should be attached
     *
     * @class WidgetClickOutside
     */
    var WidgetClickOutside = {
        /**
         * Lifecycle. Invoked once, both on the client and server, immediately before the initial rendering occurs.
         */
        componentDidMount: function () {
            this.getDOMNode().addEventListener('mousedown', this._handleMouseInside);
            window.addEventListener('mousedown', this._handleMouseOutside);
        },

        /**
         * Lifecycle. Invoked immediately before a component is unmounted from the DOM.
         */
        componentWillUnmount: function () {
            this.getDOMNode().removeEventListener('mousedown', this._handleMouseInside);
            window.removeEventListener('mousedown', this._handleMouseOutside);
        },

        /**
         * Triggered when the mouse event happens inside the widget. It stops the event propagation
         * going forward so the `_handleMouseOutside` event is not executed. This doesn't prevent
         * clicks inside the widget since it's attached on the top DOM node of the component.
         *
         * @protected
         * @method _handleMouseInside
         */
        _handleMouseInside: function(event) {
            event.stopImmediatePropagation();
        },

        /**
         * Executed when the mouse event happens outside the widget. If we reach this method, it means
         * that a `mousedown` event happened outside the top DOM node of the widget.
         *
         * @protected
         * @method _handleMouseOutside
         */
        _handleMouseOutside: function() {
            this.props.cancelExclusive();
        }
    };

    global.WidgetClickOutside = WidgetClickOutside;
}());