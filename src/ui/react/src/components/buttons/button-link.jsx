(function () {
    'use strict';

    /**
     * The ButtonLink class provides functionality for creating and editing a link in a document. ButtonLink
     * renders in two different modes:
     *
     * - Normal: Just a button that allows to switch to the edition mode
     * - Exclusive: The ButtonLinkEdit UI with all the link edition controls.
     *
     * @class ButtonLink
     */
    var ButtonLink = React.createClass({
        mixins: [AlloyEditor.ButtonStateClasses],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'link'
        },

        /**
         * Checks if the current selection is contained within a link.
         *
         * @return {Boolean} True if the selection is inside a link, false otherwise.
         */
        isActive: function() {
            return (new CKEDITOR.Link(this.props.editor.get('nativeEditor')).getFromSelection() !== null);
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'alloy-editor-button ' + this.getStateClasses();

            if (this.props.renderExclusive) {
                return (
                    <AlloyEditor.ButtonLinkEdit {...this.props} />
                );
            } else {
                return (
                    <button className={cssClass} data-type="button-link" onClick={this.props.requestExclusive.bind(ButtonLink.key)} tabIndex={this.props.tabIndex}>
                        <span className="alloy-editor-icon-link"></span>
                    </button>
                );
            }
        }
    });

    AlloyEditor.Buttons[ButtonLink.key] = AlloyEditor.ButtonLink = ButtonLink;
}());