(function() {
    'use strict';

    var assert = chai.assert;
    var Simulate = React.addons.TestUtils.Simulate;

    describe('ButtonParagraphAlignRight', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should align the selection to the right on click', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, '{There should be a paragraph aligned to the right.}');

            var buttonParagraphAlignRight = ReactDOM.render(<AlloyEditor.ButtonParagraphAlignRight editor={this.editor} />, this.container);

            Simulate.click(ReactDOM.findDOMNode(buttonParagraphAlignRight));

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: false,
                compatHtml: true
            });

            assert.strictEqual(data, '<p style="text-align: right;">There should be a paragraph aligned to the right.</p>');
        });

        it('should preserve tags ad attributes of the selection', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, '<h1 style="color:red;">{There should be a paragraph aligned to the right.}</h1>');

            var buttonParagraphAlignRight = ReactDOM.render(<AlloyEditor.ButtonParagraphAlignRight editor={this.editor} />, this.container);

            Simulate.click(ReactDOM.findDOMNode(buttonParagraphAlignRight));

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: false,
                compatHtml: true
            });

            assert.strictEqual(data, '<h1 style="color: red; text-align: right;">There should be a paragraph aligned to the right.</h1>');
        });

        it('should add class which represents pressed button', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, '<p style="text-align: right;">{A paragraph aligned to the right.}</p>');

            var buttonParagraphAlignRight = ReactDOM.render(<AlloyEditor.ButtonParagraphAlignRight editor={this.editor} />, this.container);

            var buttonDOMNode = ReactDOM.findDOMNode(buttonParagraphAlignRight);

            assert.strictEqual($(buttonDOMNode).hasClass('ae-button-pressed'), true);
        });
    });
}());
