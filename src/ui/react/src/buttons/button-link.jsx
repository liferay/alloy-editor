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
                        </span>

                        <span>
                            <button type="button" className="btn btn-default" ariaLabel="Left Align">
                                <span className="glyphicon glyphicon-ok" ariaHidden="true"></span>
                            </button>
                        </span>

                        <span>
                            <button type="button" className="btn btn-default" ariaLabel="Left Align" onClick={this.getBack}>
                                <span className="glyphicon glyphicon-remove" ariaHidden="true"></span>
                            </button>
                        </span>
                    </div>
                );
            }
            else if (this.props.selectionType === 'text') {
                return (
                    <button type="button" className="btn btn-default" ariaLabel="Left Align" onClick={this.handleClick}>
                        <span className="glyphicon glyphicon-link" ariaHidden="true"></span>
                    </button>
                );
            } else {
                return (<button style="disply:none"></button>);
            }
        }
    });

    ButtonLink.key = 'buttonLink';

    global.ButtonLink = ButtonLink;
}());