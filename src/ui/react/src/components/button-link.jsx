(function () {
    'use strict';

    var ButtonLink = React.createClass({
        mixins: [global.ButtonElement],

        statics: {
            key: 'link'
        },

        cancelExclusive: function() {
            this.props.cancelExclusive(ButtonLink.key);
        },

        getDefaultProps: function() {
            return {
                element: 'a'
            };
        },

        handleClick: function(event) {
            this.props.requestExclusive();
        },

        isActive: function() {
            var editor = this.props.editor.get('nativeEditor');

            var elementPath = editor.elementPath();

            var result = this._style.checkActive(elementPath, editor);

            var dataType = elementPath.lastElement.data('type');

            return (!!result && !dataType);
        },

        render: function() {
            if (this.props.renderExclusive) {
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
                            <button data-type="button-close" className="alloy-editor-button" onClick={this.cancelExclusive}>
                                <span className="alloy-editor-icon-close"></span>
                            </button>
                        </span>
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