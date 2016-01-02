(function() {
    'use strict';

    var assert = chai.assert;
    var Simulate = React.addons.TestUtils.Simulate;

    describe('ButtonSuperscript', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should make a text selection superscript on click', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, 'There should be a {selection} made superscript.');

            var buttonSuperscript = ReactDOM.render(<AlloyEditor.ButtonSuperscript editor={this.editor} />, this.container);

            Simulate.click(ReactDOM.findDOMNode(buttonSuperscript));

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: false,
                compatHtml: true
            });

            assert.strictEqual(data, '<p>There should be a <sup>selection</sup> made superscript.</p>');
        });

        it('should add class which represents pressed button', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, 'A <sup>{selection}</sup> made superscript.');

            var buttonSuperscript = ReactDOM.render(<AlloyEditor.ButtonSuperscript editor={this.editor} />, this.container);

            var buttonDOMNode = ReactDOM.findDOMNode(buttonSuperscript);

            assert.strictEqual($(buttonDOMNode).hasClass('ae-button-pressed'), true);
        });
    });
}());
