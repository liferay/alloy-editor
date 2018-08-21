(function() {
    'use strict';

    var assert = chai.assert;
    var Simulate = React.addons.TestUtils.Simulate;

    describe('ButtonParagraphJustify', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should justify the selection on click', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, '{There should be a paragraph justified.}');

            var buttonParagraphJustify = ReactDOM.render(<AlloyEditor.ButtonParagraphJustify editor={this.editor} />, this.container);

            Simulate.click(ReactDOM.findDOMNode(buttonParagraphJustify));

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual('<p style="text-align:justify;">there should be a paragraph justified.</p>', data);
        });

        it('should preserve tags ad attributes of the selection', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, '<h1 style="color: red;">{There should be a paragraph justified.}</h1>');

            var buttonParagraphJustify = ReactDOM.render(<AlloyEditor.ButtonParagraphJustify editor={this.editor} />, this.container);

            Simulate.click(ReactDOM.findDOMNode(buttonParagraphJustify));

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual('<h1 style="color:red;text-align:justify;">there should be a paragraph justified.</h1>', data);
        });

        it('should add class which represents pressed button', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, '<p style="text-align: justify;">{A paragraph justified.}</p>');

            var buttonParagraphJustify = ReactDOM.render(<AlloyEditor.ButtonParagraphJustify editor={this.editor} />, this.container);

            var buttonDOMNode = ReactDOM.findDOMNode(buttonParagraphJustify);

            assert.isTrue($(buttonDOMNode).hasClass('ae-button-pressed'));
        });
    });
}());
