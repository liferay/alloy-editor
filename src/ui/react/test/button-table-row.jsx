(function() {
    'use strict';

    var assert = chai.assert;
    var TestUtils = React.addons.TestUtils;
    var Simulate = TestUtils.Simulate;

    var FIXTURE_FILE = 'button-table-row.html';

    describe('ButtonTableRow', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should render just the menu button when not expanded', function() {
            var buttonTableRow = React.render(<AlloyEditor.ButtonTableRow editor={this.editor} expanded={false} />, this.container);

            var menuButton = TestUtils.findRenderedDOMComponentWithTag(buttonTableRow, 'button');

            var dropdown = TestUtils.scryRenderedDOMComponentsWithClass(buttonTableRow, 'alloy-editor-dropdown');

            assert.ok(menuButton);
            assert.equal(0, dropdown.length);
        });

        it('should show a dropdown with the action buttons when expanded', function() {
            var buttonTableRow = React.render(<AlloyEditor.ButtonTableRow editor={this.editor} expanded={true} />, this.container);

            var dropdown = TestUtils.findRenderedDOMComponentWithClass(buttonTableRow, 'alloy-editor-dropdown');
            var actionButtons = TestUtils.scryRenderedDOMComponentsWithTag(dropdown, 'button');

            assert.ok(dropdown);
            assert.ok(actionButtons.length);
        });

        it('should insert a row before the current one when clicking on the rowInsertBefore button', function() {
            testCommandButton.call(this, 'rowInsertBefore', 'insert_before');
        });

        it('should insert a row after the current one when clicking on the rowInsertAfter button', function() {
            testCommandButton.call(this, 'rowInsertAfter', 'insert_after');
        });

        it('should delete the current row when clicking on the rowDelete button', function() {
            testCommandButton.call(this, 'rowDelete', 'delete');
        });

        var testCommandButton = function(command, fixtureName) {
            var buttonTableCell = React.render(<AlloyEditor.ButtonTableRow editor={this.editor} expanded={true} />, this.container);

            var fixtures = Utils.getFixtures.call(this, FIXTURE_FILE, fixtureName);

            bender.tools.selection.setWithHtml(this.nativeEditor, fixtures.initial);

            var dropdown = TestUtils.findRenderedDOMComponentWithClass(buttonTableCell, 'alloy-editor-dropdown');

            var commandButtons = TestUtils.findAllInRenderedTree(dropdown, function(component) {
                return component.props.command === command;
            });

            assert.ok(commandButtons.length);

            Simulate.click(React.findDOMNode(commandButtons[0]));

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual(data, fixtures.expected);
        };
    });
}());