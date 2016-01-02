(function() {
    'use strict';

    var assert = chai.assert;
    var Simulate = React.addons.TestUtils.Simulate;

    describe('ButtonOrderedList', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should make a text selection an ordered list on click', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, '<p>There should be a {selection made...</p><p>An ordereed} list.</p>');

            var buttonOrderedlist = ReactDOM.render(<AlloyEditor.ButtonOrderedList editor={this.editor} />, this.container);

            Simulate.click(ReactDOM.findDOMNode(buttonOrderedlist));

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: false,
                compatHtml: true
            });

            assert.strictEqual(data, '<ol><li>There should be a selection made...</li><li>An ordereed list.</li></ol>');
        });

        it('should add class which represents pressed button', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, '<ol><li>A {selection made...</li><li>An ordereed} list.</li></ol>');

            var buttonOrderedlist = ReactDOM.render(<AlloyEditor.ButtonOrderedList editor={this.editor} />, this.container);

            var buttonDOMNode = ReactDOM.findDOMNode(buttonOrderedlist);

            assert.strictEqual($(buttonDOMNode).hasClass('ae-button-pressed'), true);
        });
    });
}());
