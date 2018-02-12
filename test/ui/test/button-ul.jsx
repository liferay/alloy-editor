(function() {
    'use strict';

    var assert = chai.assert;
    var Simulate = React.addons.TestUtils.Simulate;

    describe('ButtonUnorderedlist', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should make a text selection an unordered list on click', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, '<p>There should be a {selection made...</p><p>An unordered} list.</p>');

            var buttonUnorderedlist = ReactDOM.render(<AlloyEditor.ButtonUnorderedlist editor={this.editor} />, this.container);

            Simulate.click(ReactDOM.findDOMNode(buttonUnorderedlist));

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: false,
                compatHtml: true
            });

            assert.strictEqual(data, '<ul><li>There should be a selection made...</li><li>An unordered list.</li></ul>');
        });

        it('should add class which represents pressed button', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, '<ul><li>A {selection made...</li><li>An unordered} list.</li></ul>');

            var buttonUnorderedlist = ReactDOM.render(<AlloyEditor.ButtonUnorderedlist editor={this.editor} />, this.container);

            var buttonDOMNode = ReactDOM.findDOMNode(buttonUnorderedlist);

            assert.strictEqual($(buttonDOMNode).hasClass('ae-button-pressed'), true);
        });
    });
}());
