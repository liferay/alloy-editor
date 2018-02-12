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
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual('<p style="text-align:right;">there should be a paragraph aligned to the right.</p>', data);
        });

        it('should preserve tags add attributes of the selection', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, '<h1 style="color: red;">{There should be a paragraph aligned to the right.}</h1>');

            var buttonParagraphAlignRight = ReactDOM.render(<AlloyEditor.ButtonParagraphAlignRight editor={this.editor} />, this.container);

            Simulate.click(ReactDOM.findDOMNode(buttonParagraphAlignRight));

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual('<h1 style="color:red;text-align:right;">there should be a paragraph aligned to the right.</h1>', data);
        });

        it('should add class which represents pressed button', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, '<p style="text-align: right;">{A paragraph aligned to the right.}</p>');

            var buttonParagraphAlignRight = ReactDOM.render(<AlloyEditor.ButtonParagraphAlignRight editor={this.editor} />, this.container);

            var buttonDOMNode = ReactDOM.findDOMNode(buttonParagraphAlignRight);

            assert.isTrue($(buttonDOMNode).hasClass('ae-button-pressed'));
        });
    });
}());
