(function() {
    'use strict';

    var assert = chai.assert;
    var Simulate = React.addons.TestUtils.Simulate;

    describe('ButtonSubscript', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should make a text selection subscript on click', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, 'There should be a {selection} made subscript.');

            var buttonSubscript = ReactDOM.render(<AlloyEditor.ButtonSubscript editor={this.editor} />, this.container);

            Simulate.click(ReactDOM.findDOMNode(buttonSubscript));

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: false,
                compatHtml: true
            });

            assert.strictEqual(data, '<p>There should be a <sub>selection</sub> made subscript.</p>');
        });

        it('should add class which represents pressed button', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, 'A <sub>{selection}</sub> made subscript.');

            var buttonSubscript = ReactDOM.render(<AlloyEditor.ButtonSubscript editor={this.editor} />, this.container);

            var buttonDOMNode = ReactDOM.findDOMNode(buttonSubscript);

            assert.strictEqual($(buttonDOMNode).hasClass('ae-button-pressed'), true);
        });
    });
}());
