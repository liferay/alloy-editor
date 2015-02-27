(function () {
    'use strict';

    var ButtonLink = React.createClass({
        mixins: [global.ButtonStyle],

        statics: {
            key: 'link'
        },

        cancelExclusive: function() {
            this.props.cancelExclusive(ButtonLink.key);
        },

        getDefaultProps: function() {
            return {
                style: {
                    element: 'a'
                }
            };
        },

        handleClick: function(event) {
            this.props.requestExclusive();
        },

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