(function () {
    'use strict';

    /**
     * The ButtonStylesListItemRemove class provides functionality for previewing a style definition
     * inside a list and applying it to the current editor selection.
     *
     * @class ButtonStylesListItemRemove
     */
    var ButtonStylesListItemRemove = createReactClass({
        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonStylesListItemRemove
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonStylesListItemRemove
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * Block styles that should be removed in addition to all other inline styles
             *
             * @default ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre']
             * @instance
             * @memberof ButtonStylesListItemRemove
             * @property {Array} removeBlocks
             */
            removeBlocks: PropTypes.array,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonStylesListItemRemove
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        //Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default buttonStylesListItemRemove
             * @memberof ButtonStylesListItemRemove
             * @property {String} key
             * @static
             */
            key: 'buttonStylesListItemRemove'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonStylesListItemRemove
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                removeBlocks: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre']
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonStylesListItemRemove
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            return (
                <li role="option">
                    <button className="ae-toolbar-element" onClick={this._removeStyles} tabIndex={this.props.tabIndex}>{AlloyEditor.Strings.normal}</button>
                </li>
            );
        },

        /**
         * Removes all inline styles and configured block elements applied to the current selection.
         *
         * @instance
         * @memberof ButtonStylesListItemRemove
         * @method _removeStyles
         * @protected
         */
        _removeStyles: function() {
            var editor = this.props.editor.get('nativeEditor');

            editor.execCommand('removeFormat');

            this.props.removeBlocks.forEach(function(blockItem) {
                var blockStyle = new CKEDITOR.style({element: blockItem});

                editor.removeStyle(blockStyle);
            });

            editor.fire('actionPerformed', this);
        }
    });

    AlloyEditor.ButtonStylesListItemRemove = ButtonStylesListItemRemove;
}());