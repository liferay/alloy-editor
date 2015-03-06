(function () {
    'use strict';

    /**
     * The ButtonCode class provides wraps a selection in `pre` element.
     *
     * @class ButtonCode
     */
    var ButtonTwitter = React.createClass({
        mixins: [global.ButtonStateClasses],

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
            var editor = this.props.editor.get('nativeEditor'),
                linkUtils = new CKEDITOR.Link(editor);

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
         * Generates the appropriate twitter url based on the selected text and the configuration
         * options received via props.
         *
         * @return {String} A valid twitter url with the selected text and given configuration.
         */
        _getHref: function() {
            var nativeEditor = this.props.editor.get('nativeEditor'),
                selectedText = nativeEditor.getSelection().getSelectedText(),
                url = this.props.url,
                via = this.props.via,
                twitterHref = 'https://twitter.com/intent/tweet?text=' + selectedText;

            if (url) {
                twitterHref += '&url=' + url;
            }

            if (via) {
                twitterHref += '&via=' + via;
            }

            return twitterHref;
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            return (
                <button className="alloy-editor-button" data-type="button-twitter" onClick={this.handleClick}>
                    <span className="alloy-editor-icon-twitter"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonTwitter.key] = global.AlloyEditor.ButtonTwitter = ButtonTwitter;
}());