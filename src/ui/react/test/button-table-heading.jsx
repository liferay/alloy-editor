(function() {
    'use strict';

    var assert = chai.assert;
    var TestUtils = React.addons.TestUtils;

    var selectTable = function() {
        var tableElement = this.nativeEditor.element.find('table').getItem(0);

        this.nativeEditor.getSelection().selectElement(tableElement);
    };

    describe('ButtonTableHeading', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should render just the menu button when not expanded', function() {
            var buttonTableHeading = ReactDOM.render(<AlloyEditor.ButtonTableHeading editor={this.editor} expanded={false} />, this.container);

            var menuButton = TestUtils.findRenderedDOMComponentWithTag(buttonTableHeading, 'button');

            var dropdown = TestUtils.scryRenderedDOMComponentsWithClass(buttonTableHeading, 'ae-dropdown');

            assert.ok(menuButton);
            assert.equal(0, dropdown.length);
        });

        it('should show a dropdown with the action buttons when expanded', function() {
            var buttonTableHeading = ReactDOM.render(<AlloyEditor.ButtonTableHeading editor={this.editor} expanded={true} />, this.container);

            var dropdown = TestUtils.findAllInRenderedTree(buttonTableHeading, function(component) {
                return TestUtils.isCompositeComponentWithType(component, AlloyEditor.ButtonCommandsList);
            });

            assert.ok(dropdown);
            assert.equal(1, dropdown.length);

            var actionButtons = TestUtils.scryRenderedDOMComponentsWithTag(dropdown[0], 'button');

            assert.ok(actionButtons.length);
        });

        it('should switch from any given heading setting to any possible setting properly', function() {
            var HEADING_NONE = CKEDITOR.Table.HEADING_NONE,
                HEADING_COL = CKEDITOR.Table.HEADING_COL,
                HEADING_ROW = CKEDITOR.Table.HEADING_ROW,
                HEADING_BOTH = CKEDITOR.Table.HEADING_BOTH;

            var headingFixtures = {};

            headingFixtures[HEADING_NONE] = '3_by_3_table_no_heading.html';
            headingFixtures[HEADING_ROW] = '3_by_3_table_row_heading.html';
            headingFixtures[HEADING_COL] = '3_by_3_table_col_heading.html';
            headingFixtures[HEADING_BOTH] = '3_by_3_table_both_heading.html';

            var testMatrix = [
                {initial: HEADING_NONE, expected: HEADING_ROW},
                {initial: HEADING_NONE, expected: HEADING_COL},
                {initial: HEADING_NONE, expected: HEADING_BOTH},
                {initial: HEADING_ROW, expected: HEADING_NONE},
                {initial: HEADING_ROW, expected: HEADING_COL},
                {initial: HEADING_ROW, expected: HEADING_BOTH},
                {initial: HEADING_COL, expected: HEADING_NONE},
                {initial: HEADING_COL, expected: HEADING_ROW},
                {initial: HEADING_COL, expected: HEADING_BOTH},
                {initial: HEADING_BOTH, expected: HEADING_NONE},
                {initial: HEADING_BOTH, expected: HEADING_ROW},
                {initial: HEADING_BOTH, expected: HEADING_COL}
            ];

            testMatrix.forEach(function(testData) {
                var errorMessage = 'Changing table heading from ' + testData.initial + ' to ' + testData.expected + ' did not produce the expected result';
                var initialFixture = headingFixtures[testData.initial];
                var expectedFixture = headingFixtures[testData.expected];
                var buttonDropdown = ReactDOM.render(<AlloyEditor.ButtonTableHeading editor={this.editor} expanded={true} />, this.container);
                var buttonCommand = 'tableHeading' + testData.expected;

                Utils.assertDropdownCommandButtonResult.call(this,
                    {
                        buttonCommand: buttonCommand,
                        buttonDropdown: buttonDropdown,
                        errorMessage: errorMessage,
                        expectedFixture: expectedFixture,
                        initialFixture: initialFixture,
                        selectionFn: selectTable
                    }
                );
            }.bind(this));
        });
    });
}());