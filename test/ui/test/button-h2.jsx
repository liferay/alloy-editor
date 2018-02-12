(function() {
    'use strict';

    var assert = chai.assert;
    var Simulate = React.addons.TestUtils.Simulate;

    describe('ButtonH2', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should make a text selection h2 on click', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, 'There should be a {selection} made h2.');

            var buttonH2 = ReactDOM.render(<AlloyEditor.ButtonH2 editor={this.editor} />, this.container);

            Simulate.click(ReactDOM.findDOMNode(buttonH2));

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: false,
                compatHtml: true
            });

            assert.strictEqual(data, '<h2>There should be a selection made h2.</h2>');
        });

        it('should add class which represents pressed button', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, '<h2>A {selection} made h2.</h2>');

            var buttonH2 = ReactDOM.render(<AlloyEditor.ButtonH2 editor={this.editor} />, this.container);

            var buttonDOMNode = ReactDOM.findDOMNode(buttonH2);

            assert.strictEqual($(buttonDOMNode).hasClass('ae-button-pressed'), true);
        });
    });
}());
