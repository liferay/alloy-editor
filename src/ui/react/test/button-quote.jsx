(function() {
    'use strict';

    var assert = chai.assert;
    var Simulate = React.addons.TestUtils.Simulate;

    describe('ButtonQuote', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should make a text selection quote on click', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, 'There should be a {selection} made quote.');

            var buttonQuote = ReactDOM.render(<AlloyEditor.ButtonQuote editor={this.editor} />, this.container);

            Simulate.click(ReactDOM.findDOMNode(buttonQuote));

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: false,
                compatHtml: true
            });

            assert.strictEqual(data, '<blockquote><p>There should be a selection made quote.</p></blockquote>');
        });

        it('should add class which represents pressed button', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, '<blockquote>A {selection} made quote.</blockquote>');

            var buttonQuote = ReactDOM.render(<AlloyEditor.ButtonQuote editor={this.editor} />, this.container);

            var buttonDOMNode = ReactDOM.findDOMNode(buttonQuote);

            assert.strictEqual($(buttonDOMNode).hasClass('ae-button-pressed'), true);
        });
    });
}());
