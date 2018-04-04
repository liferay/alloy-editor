import ButtonEmbedEdit from './button-embed-edit.jsx';
import ButtonKeystroke from '../base/button-keystroke.js';
import React from 'react';

/**
 * The ButtonEmbed class provides functionality for creating and editing an embed link in a document.
 * ButtonEmbed renders in two different modes:
 *
 * - Normal: Just a button that allows to switch to the edition mode
 * - Exclusive: The ButtonEmbedEdit UI with all the link edition controls.
 *
 * @class ButtonEmbed
 * @uses ButtonKeystroke
 */
class ButtonEmbed extends React.Component {
    /**
     * Lifecycle. Renders the UI of the button.
     *
     * @instance
     * @memberof ButtonEmbed
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        if (this.props.renderExclusive) {
            return (
                <ButtonEmbedEdit {...this.props} />
            );
        } else {
            return (
                <button aria-label={AlloyEditor.Strings.link} className="ae-button" data-type="button-embed" onClick={this._requestExclusive.bind(this)} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.link}>
                    <span className="ae-icon-add"></span>
                </button>
            );
        }
    }

    /**
     * Requests the link button to be rendered in exclusive mode to allow the embedding of a link.
     *
     * @instance
     * @memberof ButtonEmbed
     * @method _requestExclusive
     * @protected
     */
    _requestExclusive() {
        this.props.requestExclusive(ButtonEmbed.key);
    }
}

/**
 * The name which will be used as an alias of the button in the configuration.
 *
 * @default embed
 * @memberof ButtonEmbed
 * @property {String} key
 * @static
 */
ButtonEmbed .key = 'embed';

/**
 * Lifecycle. Returns the default values of the properties used in the widget.
 *
 * @instance
 * @memberof ButtonEmbed
 * @method getDefaultProps
 * @return {Object} The default properties.
 */
ButtonEmbed.defaultProps = {
    keystroke: {
        fn: '_requestExclusive',
        keys: CKEDITOR.CTRL + CKEDITOR.SHIFT + 76 /*L*/
    }
};

export default ButtonKeystroke(
    ButtonEmbed
);