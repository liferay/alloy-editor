(function() {
    'use strict';

    var assert = chai.assert;
    var TestUtils = React.addons.TestUtils;

    var toolbars = {
        add: {
            buttons: ['image', 'camera', 'hline', 'table'],
            tabIndex: 2
        },
        styles: {
            selections: AlloyEditor.Selections,
            tabIndex: 1
        }
    };

    describe('UI', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should hide itself when state is hidden', function() {
            var mainUI = React.render(<global.AlloyEditor.UI toolbars={toolbars} editor={this.editor} />, this.container);

            // When user clicks outside, we set hidden property in the state
            mainUI.setState({
                hidden: true
            });

            var toolbarsEl = TestUtils.findRenderedDOMComponentWithClass(mainUI, 'alloy-editor-toolbars');

            assert.ok(new CKEDITOR.dom.element(React.findDOMNode(toolbarsEl)).hasClass('hidden'));
        });

        it('should set state to hidden when user clicks outside', function(done) {
            var mainUI = React.render(<global.AlloyEditor.UI toolbars={toolbars} editor={this.editor} />, this.container);

            // Create an input in order to set document.activeElement on it
            var input = document.createElement('input');
            this.container.appendChild(input);

            input.focus();
            happen.mousedown(input);

            setTimeout(function() {
                assert.ok(mainUI.state.hidden);

                done();
            }, 50);
        });

        it('should set state to hidden when blur on the editor', function(done) {
            var mainUI = React.render(<global.AlloyEditor.UI toolbars={toolbars} editor={this.editor} />, this.container);

            // Create an input in order to set document.activeElement on it
            var input = document.createElement('input');
            this.container.appendChild(input);

            input.focus();
            happen.keydown(document);

            setTimeout(function() {
                assert.ok(mainUI.state.hidden);

                done();
            }, 50);
        });
    });
}());
