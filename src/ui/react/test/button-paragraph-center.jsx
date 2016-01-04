(function() {
    'use strict';

    var assert = chai.assert;
    var Simulate = React.addons.TestUtils.Simulate;

    describe('ButtonParagraphCenter', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should center the selection on click', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, '{There should be a paragraph centered.}');

            var buttonParagraphCenter = ReactDOM.render(<AlloyEditor.ButtonParagraphCenter editor={this.editor} />, this.container);

            Simulate.click(ReactDOM.findDOMNode(buttonParagraphCenter));

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual('<p style="text-align:center;">there should be a paragraph centered.</p>', data);
        });

        it('should preserve tags ad attributes of the selection', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, '<h1 style="color: red;">{There should be a paragraph centered.}</h1>');

            var buttonParagraphCenter = ReactDOM.render(<AlloyEditor.ButtonParagraphCenter editor={this.editor} />, this.container);

            Simulate.click(ReactDOM.findDOMNode(buttonParagraphCenter));

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual('<h1 style="color:red;text-align:center;">there should be a paragraph centered.</h1>', data);
        });

        it('should add class which represents pressed button', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, '<p style="text-align: center;">{A paragraph centered.}</p>');

            var buttonParagraphCenter = ReactDOM.render(<AlloyEditor.ButtonParagraphCenter editor={this.editor} />, this.container);

            var buttonDOMNode = ReactDOM.findDOMNode(buttonParagraphCenter);

            assert.isTrue($(buttonDOMNode).hasClass('ae-button-pressed'));
        });
    });
}());
