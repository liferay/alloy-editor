(function() {
    'use strict';

    var assert = chai.assert;
    var TestUtils = React.addons.TestUtils;

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
            var initialFixture = '3_by_3_table.html';
            var expectedFixture = '4_by_3_table_second_row_empty.html';
            var buttonDropdown = React.render(<AlloyEditor.ButtonTableRow editor={this.editor} expanded={true} />, this.container);
            var buttonCommand = 'rowInsertBefore';

            Utils.assertDropdownCommandButtonResult.call(this,
                initialFixture, buttonDropdown, buttonCommand, expectedFixture
            );
        });

        it('should insert a row after the current one when clicking on the rowInsertAfter button', function() {
            var initialFixture = '3_by_3_table.html';
            var expectedFixture = '4_by_3_table_third_row_empty.html';
            var buttonDropdown = React.render(<AlloyEditor.ButtonTableRow editor={this.editor} expanded={true} />, this.container);
            var buttonCommand = 'rowInsertAfter';

            Utils.assertDropdownCommandButtonResult.call(this,
                initialFixture, buttonDropdown, buttonCommand, expectedFixture
            );
        });

        it('should delete the current row when clicking on the rowDelete button', function() {
            var initialFixture = '3_by_3_table.html';
            var expectedFixture = '2_by_3_table.html';
            var buttonDropdown = React.render(<AlloyEditor.ButtonTableRow editor={this.editor} expanded={true} />, this.container);
            var buttonCommand = 'rowDelete';

            Utils.assertDropdownCommandButtonResult.call(this,
                initialFixture, buttonDropdown, buttonCommand, expectedFixture
            );
        });
    });
}());