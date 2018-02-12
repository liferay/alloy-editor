(function() {
    'use strict';

    var assert = chai.assert;
    var Simulate = React.addons.TestUtils.Simulate;

    var KEY_B = 66;

    describe('ButtonBold', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should make a text selection bold on click', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, 'There should be a {selection} made bold.');

            var buttonBold = ReactDOM.render(<AlloyEditor.ButtonBold editor={this.editor} />, this.container);

            Simulate.click(ReactDOM.findDOMNode(buttonBold));

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: false,
                compatHtml: true
            });

            assert.strictEqual(data, '<p>There should be a <strong>selection</strong> made bold.</p>');
        });

        it('should make a text selection bold on [Ctrl|Cmd] + B', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, 'There should be a {selection} made bold.');

            var buttonBold = ReactDOM.render(<AlloyEditor.ButtonBold editor={this.editor} />, this.container);

            happen.keydown(this._editable, {
                ctrlKey: true,
                keyCode: KEY_B
            });

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: false,
                compatHtml: true
            });

            assert.strictEqual(data, '<p>There should be a <strong>selection</strong> made bold.</p>');
        });

        it('should add class which represents pressed button', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, 'A <strong>{selection}</strong> made bold.');

            var buttonBold = ReactDOM.render(<AlloyEditor.ButtonBold editor={this.editor} />, this.container);

            var buttonDOMNode = ReactDOM.findDOMNode(buttonBold);

            assert.strictEqual($(buttonDOMNode).hasClass('ae-button-pressed'), true);
        });
    });
}());
