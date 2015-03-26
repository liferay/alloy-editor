(function() {
    'use strict';

    var assert = chai.assert;
    var Simulate = React.addons.TestUtils.Simulate;

    describe('ButtonBold', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should make a text selection bold', function() {
            var buttonBold = React.render(<global.AlloyEditor.ButtonBold editor={this.editor} />, this.container);

            bender.tools.selection.setWithHtml(this.nativeEditor, 'There should be a {selection} made bold.');

            Simulate.click(React.findDOMNode(buttonBold));

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: false,
                compatHtml: true
            });

            assert.strictEqual(data, '<p>There should be a <strong>selection</strong> made bold.</p>');
        });

        it('should add class which represents pressed button', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, 'A <strong>{selection}</strong> made bold.');

            var buttonBold = React.render(<global.AlloyEditor.ButtonBold editor={this.editor} />, this.container);

            var buttonDOMNode = React.findDOMNode(buttonBold);

            assert.strictEqual($(buttonDOMNode).hasClass('alloy-editor-button-pressed'), true);
        });
    });
}());