(function () {
    'use strict';

    /**
     * The ButtonStylesListItemRemove class provides functionality for previewing a style definition
     * inside a list and applying it to the current editor selection.
     *
     * @class ButtonStylesListItemRemove
     */
    var ButtonStylesListItemRemove = React.createClass({
        /**
         * Allows validating props being passed to the component.
         *
         * @type {Object}
         */
        propTypes: {
            removeBlocks: React.PropTypes.array
        },

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'buttonStylesListItemRemove'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                removeBlocks: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            return (
                <button className="alloy-editor-toolbar-element" onClick={this._removeStyles} tabIndex={this.props.tabIndex}>Normal Text</button>
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

    global.AlloyEditor.ButtonStylesListItemRemove = ButtonStylesListItemRemove;
}());