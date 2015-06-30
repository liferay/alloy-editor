(function () {
    'use strict';

    /**
     * The ButtonStylesListItemRemove class provides functionality for previewing a style definition
     * inside a list and applying it to the current editor selection.
     *
     * @class ButtonStylesListItemRemove
     */
    var ButtonStylesListItemRemove = React.createClass({
        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * Block styles that should be removed in addition to all other inline styles
             *
             * @property {Array} removeBlocks
             * @default ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre']
             */
            removeBlocks: React.PropTypes.array,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        //Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default buttonStylesListItemRemove
             */
            key: 'buttonStylesListItemRemove'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
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
         * @protected
         * @method _removeStyles
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