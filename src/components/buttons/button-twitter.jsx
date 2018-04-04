import ButtonStateClasses from '../base/button-state-classes.js';
import React from 'react';

/**
 * The ButtonTwitter class provides functionality for creating a link which
 * allows people to tweet part of the content in the editor.
 *
 * @class ButtonTwitter
 * @uses ButtonStateClasses
 */
class ButtonTwitter extends React.Component {
    /**
     * Creates or removes the twitter link on the selection.
     *
     * @instance
     * @memberof ButtonTwitter
     * @method handleClick
     */
    handleClick() {
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
    }

    /**
     * Checks if the current selection is contained within a link that points to twitter.com/intent/tweet.
     *
     * @instance
     * @memberof ButtonTwitter
     * @method isActive
     * @return {Boolean} True if the selection is inside a twitter link, false otherwise.
     */
    isActive() {
        var link = new CKEDITOR.Link(this.props.editor.get('nativeEditor')).getFromSelection();

        return (link && (link.getAttribute('href').indexOf('twitter.com/intent/tweet') !== -1));
    }

    /**
     * Lifecycle. Renders the UI of the button.
     *
     * @instance
     * @memberof ButtonTwitter
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        var cssClass = 'ae-button ' + this.getStateClasses();

        return (
            <button aria-label={AlloyEditor.Strings.twitter} className={cssClass} data-type="button-twitter" onClick={this.handleClick.bind(this)} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.twitter}>
                <span className="ae-icon-twitter"></span>
            </button>
        );
    }

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
    _getHref() {
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
}

/**
 * The name which will be used as an alias of the button in the configuration.
 *
 * @default twitter
 * @memberof ButtonTwitter
 * @property {String} key
 * @static
 */
ButtonTwitter.key = 'twitter';

export default ButtonStateClasses(
    ButtonTwitter
);