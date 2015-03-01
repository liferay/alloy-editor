(function () {
    'use strict';

    /**
     * The ButtonLink class provides functionality for creating and editing a link in a document.
     *
     * @class ButtonLink
     */
    var ButtonLink = React.createClass({
        mixins: [global.ButtonStyle],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'link'
        },

        /**
         * Cancels a previously requested exclusive state.
         */
        cancelExclusive: function() {
            this.props.cancelExclusive(ButtonLink.key);
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                style: {
                    element: 'a'
                }
            };
        },

        /**
         * Requests exclusive mode and redraws the UI so the user will be able
         * to add or edit a link.
         *
         * @param  {SyntheticEvent} event The received event
         */
        handleClick: function(event) {
            this.props.requestExclusive();
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            if (this.props.renderExclusive) {
                return (
                    <div className="alloy-editor-container">
                        <div className="alloy-editor-container-input">
                            <input className="alloy-editor-input" type="text" placeholder="Type or paste link here"></input>
                            <span className="alloy-editor-button alloy-editor-icon-remove"></span>
                        </div>
                        <button aria-label="Confirm" className="alloy-editor-button" onClick={this.handleClick}>
                            <span className="alloy-editor-icon-ok"></span>
                        </button>
                        <button aria-label="Back" className="alloy-editor-button" onClick={this.cancelExclusive}>
                            <span className="alloy-editor-icon-close"></span>
                        </button>
                    </div>
                );
            } else if (this.props.selectionType === 'text') {
                return (
                    <button data-type="button-link" className="alloy-editor-button" onClick={this.handleClick}>
                        <span className="alloy-editor-icon-link"></span>
                    </button>
                );
            } else {
                return (<button style="disply:none"></button>);
            }
        }
    });

    global.AlloyEditor.Buttons[ButtonLink.key] = global.AlloyEditor.ButtonLink = ButtonLink;
}());