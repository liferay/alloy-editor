import React from 'react';

/**
 * The ButtonSeparator class renders a simple separator.
 *
 * @class ButtonSeparator
 */
class ButtonSeparator extends React.Component {
    /**
     * Lifecycle. Renders the UI of the separator.
     *
     * @instance
     * @memberof ButtonSeparator
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        return (
            <span className="ae-separator"></span>
        );
    }
}

/**
 * The name which will be used as an alias of the button in the configuration.
 *
 * @default separator
 * @memberof ButtonSeparator
 * @property {String} key
 * @static
 */
ButtonSeparator.key = 'separator';

export default ButtonSeparator;