(function() {
    'use strict';

    var assert = chai.assert;
    var TestUtils = React.addons.TestUtils;
    var Simulate = TestUtils.Simulate;

    var FIXTURE_FILE = 'button-table-column.html';

    describe('ButtonTableColumn', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should render just the menu button when not expanded', function() {
            var buttonTableCol = React.render(<AlloyEditor.ButtonTableColumn editor={this.editor} expanded={false} />, this.container);

            var menuButton = TestUtils.findRenderedDOMComponentWithTag(buttonTableCol, 'button');

            var dropdown = TestUtils.scryRenderedDOMComponentsWithClass(buttonTableCol, 'alloy-editor-dropdown');

            assert.ok(menuButton);
            assert.equal(0, dropdown.length);
        });

        it('should show a dropdown with the action buttons when expanded', function() {
            var buttonTableCol = React.render(<AlloyEditor.ButtonTableColumn editor={this.editor} expanded={true} />, this.container);

            var dropdown = TestUtils.findRenderedDOMComponentWithClass(buttonTableCol, 'alloy-editor-dropdown');
            var actionButtons = TestUtils.scryRenderedDOMComponentsWithTag(dropdown, 'button');

            assert.ok(dropdown);
            assert.ok(actionButtons.length);
        });

        it('should insert a col before the current one when clicking on the columnInsertBefore button', function() {
            testCommandButton.call(this, 'columnInsertBefore', 'insert_before');
        });

        it('should insert a col after the current one when clicking on the columnInsertAfter button', function() {
            testCommandButton.call(this, 'columnInsertAfter', 'insert_after');
        });

        it('should delete the current col when clicking on the columnDelete button', function() {
            testCommandButton.call(this, 'columnDelete', 'delete');
        });

        var testCommandButton = function(command, fixtureName) {
            var buttonTableCell = React.render(<AlloyEditor.ButtonTableColumn editor={this.editor} expanded={true} />, this.container);

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