(function () {
    'use strict';

    /**
     * The ButtonEmbedRemove class provides functionality for removing a embed element
     *
     * @class ButtonEmbedRemove
     */
    var ButtonEmbedRemove = React.createClass({
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
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default tableRemove
             */
            key: 'tableEmbed'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            return (
                <button aria-label={AlloyEditor.Strings.deleteEmbed} className="ae-button" data-type="button-embed-remove" onClick={this._removeEmbed} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.deleteEmbed}>
                    <span className="ae-icon-bin"></span>
                </button>
            );
        },

        /**
         * Removes the embed in the editor element.
         *
         * @protected
         * @method _removeEmbed
         */
        _removeEmbed: function() {
            var editor = this.props.editor.get('nativeEditor');

            var selection = editor.getSelection();

            if (selection) {
                var embedWrapper = editor.getSelection().getSelectedElement();

                embedWrapper.remove();

                editor.fire('actionPerformed', this);
            }
        }
    });

    AlloyEditor.Buttons[ButtonEmbedRemove.key] = AlloyEditor.ButtonEmbedRemove = ButtonEmbedRemove;
}());