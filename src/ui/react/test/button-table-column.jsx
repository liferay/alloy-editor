(function() {
    'use strict';

    var assert = chai.assert;
    var TestUtils = React.addons.TestUtils;

    describe('ButtonTableColumn', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should render just the menu button when not expanded', function() {
            var buttonTableCol = ReactDOM.render(<AlloyEditor.ButtonTableColumn editor={this.editor} expanded={false} />, this.container);

            var menuButton = TestUtils.findRenderedDOMComponentWithTag(buttonTableCol, 'button');

            var dropdown = TestUtils.scryRenderedDOMComponentsWithClass(buttonTableCol, 'ae-dropdown');

            assert.ok(menuButton);
            assert.equal(0, dropdown.length);
        });

        it('should show a dropdown with the action buttons when expanded', function() {
            var buttonTableCol = ReactDOM.render(<AlloyEditor.ButtonTableColumn editor={this.editor} expanded={true} />, this.container);

            var dropdown = TestUtils.findAllInRenderedTree(buttonTableCol, function(component) {
                return TestUtils.isCompositeComponentWithType(component, AlloyEditor.ButtonCommandsList);
            });

            assert.ok(dropdown);
            assert.equal(1, dropdown.length);

            var actionButtons = TestUtils.scryRenderedDOMComponentsWithTag(dropdown[0], 'button');

            assert.ok(actionButtons.length);
        });

        it('should insert a col before the current one when clicking on the columnInsertBefore button', function() {
            var initialFixture = '3_by_3_table.html';
            var expectedFixture = '3_by_4_table_second_col_empty.html';
            var buttonDropdown = ReactDOM.render(<AlloyEditor.ButtonTableColumn editor={this.editor} expanded={true} />, this.container);
            var buttonCommand = 'columnInsertBefore';

            Utils.assertDropdownCommandButtonResult.call(this, {
                buttonCommand: buttonCommand,
                buttonDropdown: buttonDropdown,
                expectedFixture: expectedFixture,
                initialFixture: initialFixture
            });
        });

        it('should insert a col after the current one when clicking on the columnInsertAfter button', function() {
            var initialFixture = '3_by_3_table.html';
            var expectedFixture = '3_by_4_table_third_col_empty.html';
            var buttonDropdown = ReactDOM.render(<AlloyEditor.ButtonTableColumn editor={this.editor} expanded={true} />, this.container);
            var buttonCommand = 'columnInsertAfter';

            Utils.assertDropdownCommandButtonResult.call(this, {
                buttonCommand: buttonCommand,
                buttonDropdown: buttonDropdown,
                expectedFixture: expectedFixture,
                initialFixture: initialFixture
            });
        });

        it('should delete the current col when clicking on the columnDelete button', function() {
            var initialFixture = '3_by_3_table.html';
            var expectedFixture = '3_by_2_table.html';
            var buttonDropdown = ReactDOM.render(<AlloyEditor.ButtonTableColumn editor={this.editor} expanded={true} />, this.container);
            var buttonCommand = 'columnDelete';

            Utils.assertDropdownCommandButtonResult.call(this, {
                buttonCommand: buttonCommand,
                buttonDropdown: buttonDropdown,
                expectedFixture: expectedFixture,
                initialFixture: initialFixture
            });
        });
    });
}());