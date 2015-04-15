(function () {
    'use strict';

    /**
     * The ButtonTwitter class provides functionality for creating a link which
     * allows people to tweet part of the content in the editor.
     *
     * @class ButtonTwitter
     */
    var ButtonTwitter = React.createClass({
        mixins: [AlloyEditor.ButtonStateClasses],

        /**
         * Allows validating props being passed to the component.
         *
         * @type {Object}
         */
        propTypes: {
            editor: React.PropTypes.object.isRequired
        },

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'twitter'
        },

        /**
         * Creates or removes the twitter link on the selection.
         */
        handleClick: function() {
            var editor = this.props.editor.get('nativeEditor');

            var linkUtils = new CKEDITOR.Link(editor);

            if (this.isActive()) {
                linkUtils.remove(linkUtils.getFromSelection());
            } else {
                linkUtils.create(
                    this._getHref(),
                    {
                        'class': 'alloy-editor-twitter-link',
                        'target': '_blank'
                    }
                );
            }

            editor.fire('actionPerformed', this);
        },

        /**
         * Checks if the current selection is contained within a link that points to twitter.com/intent/tweet.
         *
         * @return {Boolean} True if the selection is inside a twitter link, false otherwise.
         */
        isActive: function() {
            var link = new CKEDITOR.Link(this.props.editor.get('nativeEditor')).getFromSelection();

            return (link && (link.getAttribute('href').indexOf('twitter.com/intent/tweet') !== -1));
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'alloy-editor-button ' + this.getStateClasses();

            return (
                <button className={cssClass} data-type="button-twitter" onClick={this.handleClick} tabIndex={this.props.tabIndex}>
                    <span className="alloy-editor-icon-twitter"></span>
                </button>
            );
        },

        /**
         * Generates the appropriate twitter url based on the selected text and the configuration
         * options received via props.
         *
         * @protected
         * @return {String} A valid twitter url with the selected text and given configuration.
         */
        _getHref: function() {
            var nativeEditor = this.props.editor.get('nativeEditor');
            var selectedText = nativeEditor.getSelection().getSelectedText();
            var url = this.props.url;
            var via = this.props.via;
            var twitterHref = 'https://twitter.com/intent/tweet?text=' + selectedText;

            if (url) {
                twitterHref += '&url=' + url;
            }

            if (via) {
                twitterHref += '&via=' + via;
            }

            return twitterHref;
        }
    });

    AlloyEditor.Buttons[ButtonTwitter.key] = AlloyEditor.ButtonTwitter = ButtonTwitter;
}());