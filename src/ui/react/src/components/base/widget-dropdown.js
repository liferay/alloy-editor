(function() {
    'use strict';

    /**
     * Provides functionality for managing different dropdowns inside a widget
     *
     * @class WidgetDropdown
     */
    var WidgetDropdown = {
        /**
         * Lifecycle. Invoked when a component is receiving new props. This method is not called for the initial render.
         */
        componentWillReceiveProps: function (nextProps) {
            this.setState({
                itemDropdown: null
            });
        },

        /**
         * Lifecycle. Invoked once before the component is mounted.
         */
        getInitialState: function() {
            return {
                itemDropdown: null
            };
        },

        /**
         * Merges the provided object with two more properties:
         * - expanded - boolean flag which indicates if an widget should be rendered exclusively.
         * - toggleDropdown - function, which can be used by a widget in order to obtain exclusive state.
         *
         * @param {Object} obj The properties container which should be merged with the properties, related
         *    to dropdown state.
         * @param {Object} itemKey They key of an React Widget which contains the dropdown.
         * @return {Object} The merged object.
         */
        mergeDropdownProps: function(obj, itemKey) {
            return CKEDITOR.tools.merge(obj, {
                expanded: this.state.itemDropdown === itemKey ? true : false,
                toggleDropdown: this.toggleDropdown.bind(this, itemKey)
            });
        },

        /**
         * Requests and sets the active dropdown of the widget.
         *
         * @param {Object} itemDropdown The widget which requests to toggle its dropdown.
         */
        toggleDropdown: function(itemDropdown) {
            this.setState({
                itemDropdown: itemDropdown !== this.state.itemDropdown ? itemDropdown : null
            });
        }
    };

    global.WidgetDropdown = WidgetDropdown;
}());