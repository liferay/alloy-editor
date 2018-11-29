(function () {
    'use strict';

    var MAX_TWEET_LENGTH = 280;

    /**
     * The ButtonTwitter class provides functionality for creating a link which
     * allows people to tweet part of the content in the editor.
     *
     * @class ButtonTwitter
     * @uses ButtonStateClasses
     */
    var ButtonTwitter = createReactClass({
        mixins: [AlloyEditor.ButtonStateClasses],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonTwitter
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonTwitter
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonTwitter
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default twitter
             * @memberof ButtonTwitter
             * @property {String} key
             * @static
             */
            key: 'twitter'
        },

        /**
         * Creates or removes the twitter link on the selection.
         *
         * @instance
         * @memberof ButtonTwitter
         * @method handleClick
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
                        'class': 'ae-twitter-link',
                        'target': '_blank'
                    }
                );
            }

            editor.fire('actionPerformed', this);
        },

        /**
         * Checks if the current selection is contained within a link that points to twitter.com/intent/tweet.
         *
         * @instance
         * @memberof ButtonTwitter
         * @method isActive
         * @return {Boolean} True if the selection is inside a twitter link, false otherwise.
         */
        isActive: function() {
            var link = new CKEDITOR.Link(this.props.editor.get('nativeEditor')).getFromSelection();

            return (link && (link.getAttribute('href').indexOf('twitter.com/intent/tweet') !== -1));
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonTwitter
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return (
                <button aria-label={AlloyEditor.Strings.twitter} className={cssClass} data-type="button-twitter" onClick={this.handleClick} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.twitter}>
                    <span className="ae-icon-twitter"></span>
                </button>
            );
        },

        /**
         * Generates the appropriate twitter url based on the selected text and the configuration
         * options received via props.
         *
         * @instance
         * @memberof ButtonTwitter
         * @method _getHref
         * @protected
         * @return {String} A valid twitter url with the selected text and given configuration.
         */
        _getHref: function() {
            var nativeEditor = this.props.editor.get('nativeEditor');
            var selectedText = nativeEditor.getSelection().getSelectedText().substring(0, MAX_TWEET_LENGTH);
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