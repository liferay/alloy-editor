(function () {
    'use strict';

    /**
     * ButtonStateClasses is a mixin that decorates the domElement of a component
     * with different CSS classes based on the current state of the element.
     *
     * To check for state, the component can expose the following methods:
     * - isActive: to check the active state
     * - isDisabled: to check the disabled state
     *
     * @class ButtonStateClasses
     */
    var ButtonStateClasses = {
        /**
         * Returns the list of state classes associated to the current element's state, according
         * to the results of the isActive and isDisabled methods.
         *
         * @method getStateClasses
         * @return {String} A string with the state css classes.
         */
        getStateClasses: function() {
            var stateClasses = [];

            // Check for active state
            if (global.Lang.isFunction(this.isActive)) {
                if (this.isActive()) {
                    stateClasses.push('alloy-editor-button-pressed');
                }
            }

            // Check for disabled state
            if (global.Lang.isFunction(this.isDisabled)) {
                if (this.isDisabled()) {
                    stateClasses.push('alloy-editor-button-disabled');
                }
            }

            return stateClasses.join(' ');
        }
    };

    global.ButtonStateClasses = ButtonStateClasses;
}());