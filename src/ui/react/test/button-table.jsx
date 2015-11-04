(function() {
    'use strict';

    var assert = chai.assert;
    var TestUtils = React.addons.TestUtils;
    var Simulate = TestUtils.Simulate;

    describe('ButtonTableEdit', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should render just the table button when not in exclusive mode', function() {
            var buttonTable = ReactDOM.render(<AlloyEditor.ButtonTable cancelExclusive={sinon.stub()} editor={this.editor} renderExclusive={false} />, this.container);

            var button = TestUtils.findRenderedDOMComponentWithTag(buttonTable, 'button');

            var editTable = TestUtils.scryRenderedDOMComponentsWithClass(buttonTable, 'ae-container-edit-table');

            assert.ok(button);
            assert.notOk(editTable.length);
        });

        it('should show the table edit button when in exclusive mode', function() {
            var buttonTable = ReactDOM.render(<AlloyEditor.ButtonTable cancelExclusive={sinon.stub()} editor={this.editor} renderExclusive={true} />, this.container);

            var editTable = TestUtils.findRenderedDOMComponentWithClass(buttonTable, 'ae-container-edit-table');

            assert.ok(editTable);
        });
    });
}());