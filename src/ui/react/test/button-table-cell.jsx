(function() {
    'use strict';

    var assert = chai.assert;
    var TestUtils = React.addons.TestUtils;
    var Simulate = TestUtils.Simulate;

    var FIXTURE_FILE = 'button-table-cell.html';

    describe('ButtonTableCell', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should render just the menu button when not expanded', function() {
            var buttonTableCell = React.render(<AlloyEditor.ButtonTableCell editor={this.editor} expanded={false} />, this.container);

            var menuButton = TestUtils.findRenderedDOMComponentWithTag(buttonTableCell, 'button');

            var dropdown = TestUtils.scryRenderedDOMComponentsWithClass(buttonTableCell, 'alloy-editor-dropdown');

            assert.ok(menuButton);
            assert.equal(0, dropdown.length);
        });

        it('should show a dropdown with the action buttons when expanded', function() {
            var buttonTableCell = React.render(<AlloyEditor.ButtonTableCell editor={this.editor} expanded={true} />, this.container);

            var dropdown = TestUtils.findRenderedDOMComponentWithClass(buttonTableCell, 'alloy-editor-dropdown');
            var actionButtons = TestUtils.scryRenderedDOMComponentsWithTag(dropdown, 'button');

            assert.ok(dropdown);
            assert.ok(actionButtons.length);
        });

        it('should insert a cell before the current one when clicking on the cellInsertBefore button', function() {
            testCommandButton.call(this, 'cellInsertBefore', 'insert_before');
        });

        it('should insert a cell after the current one when clicking on the cellInsertAfter button', function() {
            testCommandButton.call(this, 'cellInsertAfter', 'insert_after');
        });

        it('should delete a cell after the current one when clicking on the cellDelete button', function() {
            testCommandButton.call(this, 'cellDelete', 'delete');
        });

        it('should merge the selected cells when clicking on the cellMerge button', function() {
            testCommandButton.call(this, 'cellMerge', 'merge');
        });

        it('should merge the cell below the current one when clicking on the cellMergeDown button', function() {
            testCommandButton.call(this, 'cellMergeDown', 'merge_down');
        });

        it('should merge the cell right to the current one when clicking on the cellMergeRight button', function() {
            testCommandButton.call(this, 'cellMergeRight', 'merge_right');
        });

        it('should split the cell horizontally when clicking on the cellHorizontalSplit button', function() {
            testCommandButton.call(this, 'cellHorizontalSplit', 'split_horizontal');
        });

        it('should split the cell vertically when clicking on the cellVerticalSplit button', function() {
            testCommandButton.call(this, 'cellVerticalSplit', 'split_vertical');
        });

        var testCommandButton = function(command, fixtureName) {
            var buttonTableCell = React.render(<AlloyEditor.ButtonTableCell editor={this.editor} expanded={true} />, this.container);

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