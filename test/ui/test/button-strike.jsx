(function() {
    'use strict';

    var assert = chai.assert;
    var Simulate = React.addons.TestUtils.Simulate;

    describe('ButtonStrike', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should make a text selection strike on click', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, 'There should be a {selection} made strike.');

            var buttonStrike = ReactDOM.render(<AlloyEditor.ButtonStrike editor={this.editor} />, this.container);

            Simulate.click(ReactDOM.findDOMNode(buttonStrike));

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: false,
                compatHtml: true
            });

            assert.strictEqual(data, '<p>There should be a <s>selection</s> made strike.</p>');
        });

        it('should add class which represents pressed button', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, 'A <s>{selection}</s> made strike.');

            var buttonStrike = ReactDOM.render(<AlloyEditor.ButtonStrike editor={this.editor} />, this.container);

            var buttonDOMNode = ReactDOM.findDOMNode(buttonStrike);

            assert.strictEqual($(buttonDOMNode).hasClass('ae-button-pressed'), true);
        });
    });
}());
