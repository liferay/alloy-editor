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
                fixHtml: false,
                compatHtml: true
            });

            assert.strictEqual(data, '<p style="text-align: justify;">There should be a paragraph justified.</p>');
        });

        it('should preserve tags ad attributes of the selection', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, '<h1 style="color:red;">{There should be a paragraph justified.}</h1>');

            var buttonParagraphJustify = ReactDOM.render(<AlloyEditor.ButtonParagraphJustify editor={this.editor} />, this.container);

            Simulate.click(ReactDOM.findDOMNode(buttonParagraphJustify));

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: false,
                compatHtml: true
            });

            assert.strictEqual(data, '<h1 style="color: red; text-align: justify;">There should be a paragraph justified.</h1>');
        });

        it('should add class which represents pressed button', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, '<p style="text-align: justify;">{A paragraph justified.}</p>');

            var buttonParagraphJustify = ReactDOM.render(<AlloyEditor.ButtonParagraphJustify editor={this.editor} />, this.container);

            var buttonDOMNode = ReactDOM.findDOMNode(buttonParagraphJustify);

            assert.strictEqual($(buttonDOMNode).hasClass('ae-button-pressed'), true);
        });
    });
}());
