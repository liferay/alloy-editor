(function () {
    'use strict';

    var ButtonLink = React.createClass({
        getKey: function() {
            return 'ButtonLik';
        },

        handleClick: function(event) {
            linkSwitch = 0;
        },

        getBack: function() {
            linkSwitch = 1;
        },

        render: function() {
            if (this.props.selectionType === 'link') {
                return (
                    <div>
                        <span>
                            <input></input>
                            <span className="alloy-editor-icon-close"></span>
                        </span>

                        <span>
                            <button data-type="button-ok" className="alloy-editor-button" onClick={this.handleClick}>
                                <span className="alloy-editor-icon-ok"></span>
                            </button>
                        </span>

                        <span>
                            <button data-type="button-close" className="alloy-editor-button" onClick={this.handleClick}>
                                <span className="alloy-editor-icon-close"></span>
                            </button>
                        </span>
                    </div>
                );
            }
            else if (this.props.selectionType === 'text') {
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

    ButtonLink.key = 'buttonLink';

    global.Buttons.Link = global.ButtonLink = ButtonLink;
}());