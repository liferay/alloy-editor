(function() {
    'use strict';

    /**
     * Provides functionality for managing exclusive state of an widget.
     * The exclusive state means that a button may request to be the only rendered
     * widget in its parent container. WidgetExclusive will manage this state by
     * filtering and suppressing the other sibling widgets from displaying.
     *
     * @class WidgetExclusive
     */
    var WidgetExclusive = {
        /**
         * Cancels the exclusive state of an widget.
         *
         * @instance
         * @memberof WidgetExclusive
         * @method cancelExclusive
         * @param {Object} itemExclusive The widget which exclusive state should be canceled.
         */
        cancelExclusive: function(itemExclusive) {
            if (this.state.itemExclusive === itemExclusive) {
                this.setState({
                    itemExclusive: null
                });
            }
        },

        /**
         * Lifecycle. Invoked when a component is receiving new props.
         * This method is not called for the initial render.
         * Calling this.setState() within this function will not trigger an additional render.
         *
         * @instance
         * @memberof WidgetExclusive
         * @method componentWillReceiveProps
         * @param {Object} nextProps Object containing the current set of properties.
         */
        componentWillReceiveProps: function(nextProps) {
            // Receiving properties means that the component is being re-rendered.
            // Re-rendering is triggered by editorInteraction, so we have to
            // reset the exclusive state and render the UI according to the new selection.
            this.setState({
                itemExclusive: null
            });
        },

        /**
         * Filters the items and returns only those with exclusive state.
         *
         * @instance
         * @memberof WidgetExclusive
         * @method filterExclusive
         * @param {Array} items The widgets to be filtered.
         * @return {Array|Object} The item with executive state.
         */
        filterExclusive: function(items) {
            return items.filter(function(item) {
                if (this.state.itemExclusive) {
                    if (this.state.itemExclusive === item.key) {
                        return item;
                    }
                } else {
                    return item;
                }
            }.bind(this));
        },

        /**
         * Merges the provided object with three more properties:
         * - cancelExclusive - function, which can be used by a widget in order to cancel executive state.
         * - renderExclusive - boolean flag which indicates if an widget should be rendered exclusively.
         * - requestExclusive - function, which can be used by a widget in order to obtain exclusive state.
         *
         * @instance
         * @memberof WidgetExclusive
         * @method mergeExclusiveProps
         * @param {Object} obj The properties container which should be merged with the properties, related
         *    to exclusive state.
         * @param {Object} itemKey They key of an React Widget which should be rendered exclusively.
         * @return {Object} The merged object.
         */
        mergeExclusiveProps: function(obj, itemKey) {
            return CKEDITOR.tools.merge(obj, {
                cancelExclusive: this.cancelExclusive.bind(this, itemKey),
                renderExclusive: (this.state.itemExclusive === itemKey),
                requestExclusive: this.requestExclusive.bind(this, itemKey)
            });
        },

        /**
         * Requests and sets exclusive state of an widget.
         *
         * @instance
         * @memberof WidgetExclusive
         * @method requestExclusive
         * @param {Object} itemExclusive The widget which requests exclusive state.
         */
        requestExclusive: function(itemExclusive) {
            this.setState({
                itemExclusive: itemExclusive
            });
        }
    };

    AlloyEditor.WidgetExclusive = WidgetExclusive;
}());