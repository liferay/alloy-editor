(function() {
    'use strict';

    var assert = chai.assert;
    var TestUtils = React.addons.TestUtils;

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
            var initialFixture = '3_by_3_table.html';
            var expectedFixture = '3_by_3_table_extra_cell_second_col.html';
            var buttonDropdown = React.render(<AlloyEditor.ButtonTableCell editor={this.editor} expanded={true} />, this.container);
            var buttonCommand = 'cellInsertBefore';

            Utils.assertDropdownCommandButtonResult.call(this,
                initialFixture, buttonDropdown, buttonCommand, expectedFixture
            );
        });

        it('should insert a cell after the current one when clicking on the cellInsertAfter button', function() {
            var initialFixture = '3_by_3_table.html';
            var expectedFixture = '3_by_3_table_extra_cell_third_col.html';
            var buttonDropdown = React.render(<AlloyEditor.ButtonTableCell editor={this.editor} expanded={true} />, this.container);
            var buttonCommand = 'cellInsertAfter';

            Utils.assertDropdownCommandButtonResult.call(this,
                initialFixture, buttonDropdown, buttonCommand, expectedFixture
            );
        });

        it('should delete a cell after the current one when clicking on the cellDelete button', function() {
            var initialFixture = '3_by_3_table.html';
            var expectedFixture = '3_by_3_table_missing_cell_second_col.html';
            var buttonDropdown = React.render(<AlloyEditor.ButtonTableCell editor={this.editor} expanded={true} />, this.container);
            var buttonCommand = 'cellDelete';

            Utils.assertDropdownCommandButtonResult.call(this,
                initialFixture, buttonDropdown, buttonCommand, expectedFixture
            );
        });

        it('should merge the selected cells when clicking on the cellMerge button', function() {
            var initialFixture = '3_by_3_table_selected_second_row.html';
            var expectedFixture = '3_by_3_table_merged_second_row.html';
            var buttonDropdown = React.render(<AlloyEditor.ButtonTableCell editor={this.editor} expanded={true} />, this.container);
            var buttonCommand = 'cellMerge';

            Utils.assertDropdownCommandButtonResult.call(this,
                initialFixture, buttonDropdown, buttonCommand, expectedFixture
            );
        });

        it('should merge the cell below the current one when clicking on the cellMergeDown button', function() {
            var initialFixture = '3_by_3_table.html';
            var expectedFixture = '3_by_3_table_merged_second_cell_down.html';
            var buttonDropdown = React.render(<AlloyEditor.ButtonTableCell editor={this.editor} expanded={true} />, this.container);
            var buttonCommand = 'cellMergeDown';

            Utils.assertDropdownCommandButtonResult.call(this,
                initialFixture, buttonDropdown, buttonCommand, expectedFixture
            );
        });

        it('should merge the cell right to the current one when clicking on the cellMergeRight button', function() {
            var initialFixture = '3_by_3_table.html';
            var expectedFixture = '3_by_3_table_merged_second_cell_right.html';
            var buttonDropdown = React.render(<AlloyEditor.ButtonTableCell editor={this.editor} expanded={true} />, this.container);
            var buttonCommand = 'cellMergeRight';

            Utils.assertDropdownCommandButtonResult.call(this,
                initialFixture, buttonDropdown, buttonCommand, expectedFixture
            );
        });

        it('should split the cell horizontally when clicking on the cellHorizontalSplit button', function() {
            var initialFixture = '3_by_3_table.html';
            var expectedFixture = '3_by_3_table_split_second_col.html';
            var buttonDropdown = React.render(<AlloyEditor.ButtonTableCell editor={this.editor} expanded={true} />, this.container);
            var buttonCommand = 'cellHorizontalSplit';

            Utils.assertDropdownCommandButtonResult.call(this,
                initialFixture, buttonDropdown, buttonCommand, expectedFixture
            );
        });

        it('should split the cell vertically when clicking on the cellVerticalSplit button', function() {
            var initialFixture = '3_by_3_table.html';
            var expectedFixture = '3_by_3_table_split_second_row.html';
            var buttonDropdown = React.render(<AlloyEditor.ButtonTableCell editor={this.editor} expanded={true} />, this.container);
            var buttonCommand = 'cellVerticalSplit';

            Utils.assertDropdownCommandButtonResult.call(this,
                initialFixture, buttonDropdown, buttonCommand, expectedFixture
            );
        });
    });
}());