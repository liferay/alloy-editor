(function() {
    'use strict';

    if (!window.Utils) {
        window.Utils = {};
    }

    window.Utils.assertDropdownCommandButtonResult = (function() {
        var assertResult = window.Utils.assertResult('src/ui/react/test/fixtures');

        return function(config) {
            var TestUtils = React.addons.TestUtils;
            var Simulate = TestUtils.Simulate;

            var command = function() {
                var dropdown = TestUtils.findRenderedDOMComponentWithClass(config.buttonDropdown, 'ae-dropdown');

                var commandButtons = TestUtils.findAllInRenderedTree(dropdown, function(component) {
                    return component.props.command === config.buttonCommand;
                });

                assert.ok(commandButtons.length);

                if (config.selectionFn) {
                    config.selectionFn.call(this);
                }

                Simulate.click(React.findDOMNode(commandButtons[0]));
            };

            assertResult.call(this,
                config.initialFixture, command, config.expectedFixture, config.errorMessage
            );
        };
    }());

    window.Utils.createAlloyEditor = function(done, config) {
        var editable = document.createElement('div');

        editable.setAttribute('id', 'editable');
        editable.setAttribute('contenteditable', true);

        document.getElementsByTagName('body')[0].appendChild(editable);

        this._editable = editable;

        assert.ok(bender);
        assert.ok(CKEDITOR);
        assert.ok(AlloyEditor);

        config = CKEDITOR.tools.merge({
            toolbars: {}
        }, config);

        this.editor = AlloyEditor.editable('editable', config);

        this.nativeEditor = this.editor.get('nativeEditor');

        this.nativeEditor.on('instanceReady', function() {
            this.nativeEditor.focus();

            done();
        }.bind(this));
    };

    window.Utils.destroyAlloyEditor = function(done) {
        if (this.editor) {
            this.editor.destroy();
        }

        this._editable.parentNode.removeChild(this._editable);

        if (done) {
            done();
        }
    };
}());